import {
  AppStore,
  basicValue,
  itemsProgressBar,
  RegisterDataConfig,
  resident,
} from '@models';
import { Component, inject, OnInit } from '@angular/core';
import { NxToastService } from '@shared';
import {
  EmailService,
  EventService,
  MeetingDataService,
  ReqMeetingData,
  WhatsAppServiceService,
} from '@services';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { DataConfig, DataResident, DataTemplate } from '@store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  viewButtons = false;
  values = { OneValue: true, TwoValue: false };
  selectedSection: number = 0;
  statusCustomize: boolean = false;
  disabled: boolean = true;
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
    {
      id: 3,
      status: 'pending',
      title: 'Unidades',
      disabled: false,
      show: true,
    },
  ];

  resident?: resident;
  private dataConfig?: RegisterDataConfig;

  private _subscription = new Subscription();
  private _store: Store<AppStore> = inject(Store<AppStore>);
  private _serviceEmail = inject(EmailService);
  private _serviceWhatsApp = inject(WhatsAppServiceService);
  private _serviceMessage = inject(NxToastService);
  private _serviceMeetingData = inject(MeetingDataService);
  private _serviceEvents = inject(EventService);

  ngOnInit(): void {
    this.initData();
  }

  selectSection(index: number) {
    const items = this.items;
    if (items[index].status === 'success') {
      items[index].status = 'select-success';
    } else {
      items[index].status = 'select';
    }
    this.items = [...items];
    this.selectedSection = index;
  }

  initData() {
    this._subscription.add(
      this._store.select('register').subscribe({
        next: (value) => {
          if (value) {
            this.resident = structuredClone(value.residential);
            this.dataConfig = structuredClone(value.config);
          }
        },
        error: () => {},
      })
    );

    this._subscription.add(
      this._serviceEmail.getTemplateEmail().subscribe({
        next: (value) => {
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
        },
        error: () => {
          this._serviceMessage.addMessage({
            type: 'error',
            message: 'Error al consultar plantillas de email',
          });
        },
      })
    );

    this._subscription.add(
      this._serviceWhatsApp.getTemplateWhatsApp().subscribe({
        next: (value) => {
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
              message:
                'Ocurrió un error al consultar las platillas de whatsApp',
              life: 5000,
            });
          }
        },
        error: () => {
          this._serviceMessage.addMessage({
            type: 'error',
            message: 'Error al consultar plantillas de WhatsApp',
          });
        },
      })
    );
  }

  private saveTemplate(list: basicValue[], type: 'whatsApp' | 'email') {
    this._store.dispatch(
      DataTemplate({
        data: { list, type },
      })
    );
  }

  setResident(resident: resident | undefined) {
    this._store.dispatch(DataResident({ resident }));
    if (this.resident) {
      this._serviceMeetingData
        .getMeetingDataByResident(this.resident.id)
        .subscribe({
          next: (value) => {
            debugger;
            if (value.success) {
              if (value.content && value.content.length) {
                const values = value.content[value.content.length - 1];
                const file = values.upload_database ? 'File upload' : '';
                this._store.dispatch(
                  DataConfig({
                    data: {
                      status: true,
                      name: '',
                      file,
                      meeting_time: '',
                      login_with_credentials: values.login_with_credentials,
                      email_template_id: values.email_template_id,
                      whatsapp_id: values.whatsapp_id,
                      upload_database: values.upload_database,
                    },
                  })
                );
                this.viewButtons = true;
                this.disabled = false;
              } else {
                this.viewButtons = false;
                this.disabled = false;
              }
            } else {
              this._serviceMessage.addMessage({
                type: 'error',
                message: 'Error al consultar los datos del cliente',
                life: 4000,
              });
              this.viewButtons = false;
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
    }
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

  NextOrAfter(isNext: boolean, index: 0 | 1 | 2 | 3) {
    if (index === 0) {
      if (!this.resident) {
        this._serviceMessage.addMessage({
          type: 'warning',
          message: '¡Por favor, seleccionar le cliente!',
          life: 5000,
        });
        return;
      }
    }
    if (isNext) {
      if (!this.statusCustomize) {
        this.saveDataAll();
        return;
      }
      this.setStatusSuccess(index);
      this.selectSection(index + 1);
      return;
    }
  }

  setStatusSuccess(index: number) {
    const items = this.items;
    const indexCustomize = items.findIndex((item) => item.id === 1);
    if (indexCustomize === -1) return;
    this.items[index].status = 'success';
    this.items = [...items];
  }

  saveDataAll() {
    if (!this.dataConfig) return;
    this._serviceEvents
      .createEvent({
        name: this.dataConfig.name,
        status: 'active',
      })
      .subscribe({
        next: (value) => {
          if (value.success && value.event_id) {
            this._serviceMeetingData
              .createMeetingData(
                this.getDataMeeting(this.dataConfig!, value.event_id)
              )
              .subscribe({
                next: (value) => {
                  console.log(value)
                },
              });
          }
        },
      });
  }

  private getDataMeeting(
    {
      meeting_time,
      file,
      login_with_credentials,
      whatsapp_id,
      email_template_id,
    }: RegisterDataConfig,
    event_type_id: number
  ): ReqMeetingData {
    return {
      file,
      meeting_time,
      email_template_id,
      residential_id: this.resident!.id,
      whatsapp_id,
      login_with_credentials: login_with_credentials? 1: 0,
      mails_to_send_documents: '',
      upload_database: 0,
      quality_care_selection: false,
      color: '#FF7300,',
      shall_ask_representation_document: false,
      label_name_owner: 'Propietario',
      label_name_agent: 'Apoderado',
      welcome_message: 'Hola, bienvenido a la asamblea de la agrupación NEXOS',
      event_type_id,
    };
  }
}
