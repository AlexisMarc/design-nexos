import {
  AppStore,
  basicValue,
  itemsProgressBar,
  RegisterDataConfig,
  RegisterDataCustomize,
  RegisterDataDesign,
  RegisterForm,
  resident,
} from '@models';
import {
  Component,
  inject,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  NxConfirmDialogService,
  NxLoadingService,
  NxToastService,
} from '@shared';
import {
  EmailService,
  EventService,
  FormDynamicService,
  MeetingDataService,
  ReqMeetingData,
  WhatsAppServiceService,
} from '@services';
import { firstValueFrom, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  DataConfig,
  DataCustomize,
  DataDesign,
  DataDynamicForm,
  DataResident,
  DataTemplate,
  MeetingId,
} from '@store';
import { DYNAMIC_FORM_DATA_DEFAULT } from '@constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit, OnChanges, OnDestroy {
  viewButtons = false;
  values = { OneValue: true, TwoValue: false };
  selectedSection: number = 0;
  statusCustomize: boolean = false;
  disabled: boolean = true;
  statusProcess: 'pending' | 'create' | 'edit' | 'clone' = 'pending';
  items: itemsProgressBar[] = [
    {
      id: 0,
      status: 'select',
      title: 'Configuración',
      disabled: false,
      show: true,
    },
    {
      id: 1,
      status: 'pending',
      title: 'Personalización',
      disabled: false,
      show: false,
    },
    {
      id: 2,
      status: 'pending',
      title: 'Diseño',
      disabled: false,
      show: false,
    },
    // {
    //   id: 3,
    //   status: 'pending',
    //   title: 'Unidades',
    //   disabled: false,
    //   show: true,
    // },
  ];

  resident?: resident;
  private dataConfig?: RegisterDataConfig;
  private customize?: RegisterDataCustomize;
  private design?: RegisterDataDesign;
  private form?: RegisterForm;
  private meeting_id?: number;

  private _subscription = new Subscription();
  private _store: Store<AppStore> = inject(Store<AppStore>);
  private _serviceEmail = inject(EmailService);
  private _serviceWhatsApp = inject(WhatsAppServiceService);
  private _serviceMessage = inject(NxToastService);
  private _serviceMeetingData = inject(MeetingDataService);
  private _serviceEvents = inject(EventService);
  private _serviceConfirm = inject(NxConfirmDialogService);
  private _serviceForm = inject(FormDynamicService);
  private _loading = inject(NxLoadingService);

  ngOnChanges(_: SimpleChanges): void {}

  ngOnInit(): void {
    this.initData();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  selectSection(index: number) {
    if (this.selectedSection === index) return;
    const items = this.items.map((item) => {
      if (item.id === index) {
        if (item.status === 'success') {
          item.status = 'select-success';
        } else {
          item.status = 'select';
        }
        return item;
      }
      if (item.status === 'select-success') {
        item.status = 'success';
        return item;
      }
      if (item.status === 'select') {
        item.status = 'pending';
        return item;
      }
      return item;
    });
    this.items = [...items];
    this.selectedSection = index;
  }
  async initData() {
    this._loading.view(true);
    this._subscription.add(
      this._store.select('register').subscribe({
        next: (value) => {
          if (value) {
            this.resident = structuredClone(value.residential);
            this.dataConfig = structuredClone(value.config);
            this.customize = structuredClone(value.customize);
            this.design = structuredClone(value.design);
            this.form = structuredClone(value.dynamicForm);
            this.meeting_id = value.meeting_id;
          }
        },
      })
    );
    await firstValueFrom(this._serviceEmail.getTemplateEmail())
      .then((value) => {
        if (value.success) {
          if (value.content && value.content.length) {
            const list = value.content.map((value) => {
              return { label: value.name_email, value: value.id.toString() };
            });
            this.saveTemplate(list, 'email');
          }
        } else {
          this._serviceMessage.addMessage({
            type: 'error',
            message: 'Ocurrió un error al consultar las platillas de email',
            life: 5000,
          });
        }
      })
      .catch(() => {
        this._serviceMessage.addMessage({
          type: 'error',
          message: 'Error al consultar plantillas de email',
        });
      });
    await firstValueFrom(this._serviceWhatsApp.getTemplateWhatsApp())
      .then((value) => {
        if (value.success) {
          if (value.content && value.content.length) {
            const list = value.content.map((value) => {
              return {
                label: value.name_content,
                value: value.id.toString(),
              };
            });
            this.saveTemplate(list, 'whatsApp');
          }
        } else {
          this._serviceMessage.addMessage({
            type: 'error',
            message: 'Ocurrió un error al consultar las platillas de whatsApp',
            life: 5000,
          });
        }
      })
      .catch(() => {
        this._serviceMessage.addMessage({
          type: 'error',
          message: 'Error al consultar plantillas de WhatsApp',
        });
      });
    await firstValueFrom(this._serviceEvents.getEventTypesActive())
      .then((value) => {
        if (value.success) {
          if (value.content && value.content.length) {
            const list = value.content.map((value) => {
              return {
                label: value.name,
                value: value.id.toString(),
              };
            });
            this.saveTemplate(list, 'event');
          }
        } else {
          this._serviceMessage.addMessage({
            type: 'error',
            message: 'Ocurrió un error al consultar los tipos de evento',
            life: 5000,
          });
        }
      })
      .catch(() => {
        this._serviceMessage.addMessage({
          type: 'error',
          message: 'Error al consultar plantillas de WhatsApp',
        });
      });
    this._loading.view(false);
  }

  private saveTemplate(
    list: basicValue[],
    type: 'whatsApp' | 'email' | 'event'
  ) {
    this._store.dispatch(
      DataTemplate({
        data: { list, type },
      })
    );
  }

  setResident(resident: resident | undefined) {
    this._store.dispatch(DataResident({ resident }));
    if (this.resident) {
      this._loading.view(true);
      this.statusProcess = 'pending';
      this._serviceMeetingData
        .getMeetingDataByResident(this.resident.id)
        .subscribe({
          next: async (value) => {
            if (value.success) {
              if (value.content && value.content.length) {
                const {
                  name,
                  meeting_id,
                  event_type_id,
                  upload_database,
                  meeting_time,
                  login_with_credentials,
                  email_template_id,
                  whatsapp_id,
                  shall_ask_representation_document,
                  label_name_owner,
                  label_name_agent,
                  limit_raising_by_customer,
                  mails_to_send_documents,
                  quality_care_selection,
                  color,
                  signature_module,
                  welcome_message,
                  authority_granted,
                } = value.content[value.content.length - 1];

                const file = upload_database ? 'File upload' : '';
                this._store.dispatch(MeetingId({ meeting_id }));
                this._store.dispatch(
                  DataConfig({
                    data: {
                      name,
                      file,
                      meeting_time,
                      login_with_credentials,
                      email_template_id,
                      whatsapp_id,
                      upload_database,
                      event_type_id,
                    },
                  })
                );
                this._store.dispatch(
                  DataCustomize({
                    data: {
                      signature_module,
                      quality_care_selection,
                      shall_ask_representation_document,
                      label_name_owner,
                      label_name_agent,
                      limit_raising_by_customer,
                      mails_to_send_documents,
                      authority_granted,
                    },
                  })
                );
                this._store.dispatch(
                  DataDesign({
                    data: {
                      logo: '',
                      color,
                      welcome_message,
                    },
                  })
                );
                this.viewButtons = true;
                this.disabled = true;
              } else {
                this.viewButtons = false;
                this.disabled = false;
                this.statusProcess = 'create';
              }
              this._loading.view(false);
            } else {
              this._store.dispatch(DataConfig({ data: undefined }));
              this._store.dispatch(DataCustomize({ data: undefined }));
              this._store.dispatch(DataDesign({ data: undefined }));
              this._loading.view(false);
              this.viewButtons = false;
              this.disabled = false;
              this.statusProcess = 'create';
            }
          },
          error: () => {
            this._serviceMessage.addMessage({
              type: 'error',
              message: 'Error al consultar los datos del cliente',
              life: 4000,
            });
            this.viewButtons = false;
          },
        });
      return;
    }
    this.resetAll();
  }

  private resetAll() {
    this.resident = undefined;
    this._store.dispatch(DataResident({ resident: undefined }));
    this._store.dispatch(DataConfig({ data: undefined }));
    this._store.dispatch(DataCustomize({ data: undefined }));
    this._store.dispatch(DataDesign({ data: undefined }));
    this.viewButtons = false;
    this.disabled = true;
    this.statusCustomize = false;
    this.setCustomize(false);
    this.items = [
      ...this.items.map((item) => {
        return { ...item, status: 'pending' } as itemsProgressBar;
      }),
    ];
    this.NextOrAfter(false, 0, false, true);
  }

  public setCustomize(status: boolean) {
    this.statusCustomize = status;
    const items = this.items;
    const indexCustomize = items.findIndex((item) => item.id === 1);
    const indexDesign = items.findIndex((item) => item.id === 2);

    items[indexCustomize].show = status;
    items[indexDesign].show = status;

    this.items = [...items];
  }

  NextOrAfter(
    isNext: boolean,
    index: 0 | 1 | 2 | 3,
    isSave: boolean = false,
    reset: boolean = false
  ) {
    if (reset) {
      this.setStatusSuccess(0, true);
      this.selectedSection = 0;
      return;
    }
    if (index === 0) {
      if (!this.resident) {
        this._serviceMessage.addMessage({
          type: 'warning',
          message: '¡Por favor, seleccionar le cliente!',
          life: 5000,
        });
        return;
      }
      if (!this.statusCustomize) {
        this.saveDataAll();
        return;
      }
    }
    if (isSave) {
      this.saveDataAll();
      return;
    }
    if (isNext) {
      this.setStatusSuccess(index);
      this.selectSection(index + 1);
      return;
    }
    this.selectSection(index - 1);
  }

  setStatusSuccess(index: number, reset: boolean = false) {
    const items = this.items;
    if (reset) {
      this.items = [
        ...items.map<itemsProgressBar>((item) => {
          return { ...item, status: 'pending' };
        }),
      ];
      this.items[0].status = 'select';
      return;
    }
    const indexCustomize = items.findIndex((item) => item.id === index);
    if (indexCustomize === -1) return;
    this.items[index].status = 'success';
    this.items = [...items];
  }

  private saveDataAll() {
    if (!this.dataConfig) return;
    this._loading.view(true);
    let data = this.getDataMeeting();
    if (this.statusProcess === 'edit') {
      this.editMeeting(data);
      return;
    }
    this.saveMeeting(data);
  }

  private saveMeeting(data: ReqMeetingData) {
    this._subscription.add(
      this._serviceMeetingData.createMeetingData(data).subscribe({
        next: (value) => {
          if (value.success) {
            if (value.meeting_id) {
              this.saveDynamicForm(
                value.meeting_id,
                this.form ?? DYNAMIC_FORM_DATA_DEFAULT
              );
              return;
            }
            this._serviceMessage.addMessage({
              type: 'success',
              message: '¡Información guardada exitosamente!',
              life: 5000,
            });
            this.resetAll();
          } else {
            this._serviceMessage.addMessage({
              type: 'error',
              message: 'Error al guardar la información...',
              life: 5000,
            });
          }
          this._loading.view(false);
        },
        error: () => {
          this._serviceMessage.addMessage({
            type: 'error',
            message: 'Error al guardar la información...',
            life: 5000,
          });
          this._loading.view(false);
        },
      })
    );
  }

  private editMeeting(data: ReqMeetingData) {
    this._subscription.add(
      this._serviceMeetingData
        .editMeetingData(data, this.meeting_id!)
        .subscribe({
          next: (value) => {
            if (value.success) {
              if (this.meeting_id) {
                this.saveDynamicForm(
                  this.meeting_id,
                  this.form ?? DYNAMIC_FORM_DATA_DEFAULT
                );
                return;
              }
              this._serviceMessage.addMessage({
                type: 'success',
                message: '¡Información editada exitosamente!',
                life: 5000,
              });
              this.resetAll();
            } else {
              this._serviceMessage.addMessage({
                type: 'error',
                message: 'Error al editar la información...',
                life: 5000,
              });
            }
            this._loading.view(false);
          },
          error: () => {
            this._serviceMessage.addMessage({
              type: 'error',
              message: 'Error al editar la información...',
              life: 5000,
            });
            this._loading.view(false);
          },
        })
    );
  }

  private saveDynamicForm(meeting_id: number, form: RegisterForm) {
    const form_id = form.id;
    if (form_id) {
      this._subscription.add(
        this._serviceForm
          .updateDynamicForm(form_id, { ...form, meeting_id })
          .subscribe({
            next: (value) => {
              if (value.success) {
                this._serviceMessage.addMessage({
                  type: 'success',
                  message: '¡Información editada exitosamente!',
                  life: 5000,
                });
                this.resetAll();
              } else {
                this._serviceMessage.addMessage({
                  type: 'error',
                  message: 'Error al editar el formulario...',
                  life: 5000,
                });
              }
              this._loading.view(false);
            },
            error: () => {
              this._serviceMessage.addMessage({
                type: 'error',
                message: 'Error al editar la información...',
                life: 5000,
              });
              this._loading.view(false);
            },
          })
      );
      return;
    }

    this._subscription.add(
      this._serviceForm.createDynamicForm({ ...form, meeting_id }).subscribe({
        next: (value) => {
          if (value.success) {
            this._serviceMessage.addMessage({
              type: 'success',
              message: '¡Información guardada exitosamente!',
              life: 5000,
            });
            this.resetAll();
          } else {
            this._serviceMessage.addMessage({
              type: 'error',
              message: 'Error al guardar el formulario...',
              life: 5000,
            });
          }
          this._loading.view(false);
        },
        error: () => {
          this._serviceMessage.addMessage({
            type: 'error',
            message: 'Error al guardar la información...',
            life: 5000,
          });
          this._loading.view(false);
        },
      })
    );
  }

  private getDataMeeting(): ReqMeetingData {
    let data: ReqMeetingData = {
      file: '',
      meeting_time: '',
      email_template_id: '',
      name: 'Evento',
      signature_module: 0,
      residential_id: this.resident!.id,
      whatsapp_id: '',
      login_with_credentials: 0,
      mails_to_send_documents: '',
      upload_database: 0,
      quality_care_selection: 0,
      color: '#FF7300,',
      shall_ask_representation_document: 0,
      limit_raising_by_customer: 0,
      label_name_owner: 'Propietario',
      label_name_agent: 'Apoderado',
      welcome_message: 'Hola, bienvenido a la asamblea de la agrupación NEXOS',
      event_type_id: 0,
      authority_granted: 0,
    };
    if (this.dataConfig) {
      const {
        file,
        name,
        meeting_time,
        login_with_credentials,
        email_template_id,
        whatsapp_id,
        upload_database,
        event_type_id,
      } = this.dataConfig;
      data = {
        ...data,
        file,
        name,
        meeting_time,
        login_with_credentials: login_with_credentials ? 1 : 0,
        email_template_id,
        upload_database: upload_database ? 1 : 0,
        event_type_id,
        whatsapp_id,
      };
    }
    if (this.customize && this.statusCustomize) {
      const {
        shall_ask_representation_document,
        label_name_agent,
        label_name_owner,
        limit_raising_by_customer,
        mails_to_send_documents,
        quality_care_selection,
        signature_module,
      } = this.customize;
      data = {
        ...data,
        shall_ask_representation_document,
        label_name_agent,
        label_name_owner,
        limit_raising_by_customer,
        mails_to_send_documents: mails_to_send_documents ?? '',
        quality_care_selection,
        signature_module,
      };
    }
    if (this.design && this.statusCustomize) {
      const { logo, color, welcome_message } = this.design;
      data = { ...data, logo, color, welcome_message };
    }
    return data;
  }

  settingsRegister(type: 'pending' | 'create' | 'edit' | 'clone') {
    this.viewButtons = false;
    this.disabled = false;
    this.statusProcess = type;
    if (type === 'create') {
      this._store.dispatch(DataConfig({ data: undefined }));
      this._store.dispatch(DataCustomize({ data: undefined }));
      this._store.dispatch(DataDesign({ data: undefined }));
    }
    if (type === 'clone' || type === 'edit') {
      this._loading.view(true);
      this._serviceForm.getDynamicForm(this.meeting_id!).subscribe({
        next: (value) => {
          if (value.success) {
            this._store.dispatch(DataDynamicForm({ data: value.content }));
          } else {
            this._serviceMessage.addMessage({
              type: 'error',
              message: 'Error al consultar el formulario dinámico',
              life: 4000,
            });
          }
          this._loading.view(false);
        },
        error: () => {
          this._serviceMessage.addMessage({
            type: 'error',
            message: 'Error al consultar el formulario dinámico',
            life: 4000,
          });
        },
      });
    }
  }
}
