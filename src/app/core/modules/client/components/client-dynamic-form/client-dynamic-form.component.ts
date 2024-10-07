import { Component, inject, OnDestroy, type OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NxValidators } from '@helpers';
import {
  AppStore,
  meetingDataAll,
  MeetingWelcome,
  RegisterForm,
} from '@models';
import { Store } from '@ngrx/store';
import {
  colorsDynamic,
  ColorServiceService,
  FormDynamicService,
  MeetingDataService,
} from '@services';
import { NxToastService, NxLoadingService } from '@shared';
import { SetIdCustomer } from '@store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-client-dynamic-form',
  templateUrl: './client-dynamic-form.component.html',
  styleUrl: './client-dynamic-form.component.css',
})
export class ClientDynamicFormComponent implements OnInit, OnDestroy {
  public meeting?: meetingDataAll;
  public welcome?: MeetingWelcome;
  public form?: RegisterForm;
  private customer_id?: string;
  private login_with_credentials = false;
  public formGroup?: FormGroup<{ [key: string]: FormControl<string> }>;

  public colors!: colorsDynamic;
  private _subscription = new Subscription();
  private _serviceColors = inject(ColorServiceService);
  private _router = inject(Router);
  private _store: Store<AppStore> = inject(Store<AppStore>);
  private _serviceMessage = inject(NxToastService);
  private _loading = inject(NxLoadingService);
  private _serviceForm = inject(FormDynamicService);
  private _serviceMeeting = inject(MeetingDataService);

  ngOnInit(): void {
    this.initSubscription();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private initSubscription() {
    this._subscription.add(
      this._serviceColors.messages$.subscribe({
        next: (colors) => {
          this.colors = { ...colors };
        },
      })
    );

    this._subscription.add(
      this._store.select('clientRegister').subscribe({
        next: (value) => {
          this.meeting = value.meeting;
          this.welcome = value.welcome;
          this.customer_id = value.id_customer;
          if (this.meeting) {
            this.initDynamicForm(
              this.meeting.meeting_id,
              this.meeting.login_with_credentials
            );
          } else {
            this.redirectReset();
          }
        },
      })
    );
  }

  private async redirectReset() {
    await this._router.navigate(['client']);
  }

  private async redirectUnit() {
    await this._router.navigate(['client/unit']);
  }

  private initDynamicForm(meeting_id: number, login_with_credentials: boolean) {
    this.login_with_credentials = login_with_credentials!!;
    this._loading.view(true);
    if (this.form) {
      this._loading.view(false);
      return;
    }
    this._serviceForm.getDynamicForm(meeting_id).subscribe({
      next: (value) => {
        //if (!value) this.redirectUnit();
        if (value.success) {
          this._loading.view(false);
          if (value.form) {
            this.form = value.form;
            this.initFormDynamic(this.form);
            return;
          }
        } else {
          this.redirectUnit();
        }
        this._loading.view(false);
        this.redirectUnit();
      },
      error: () => {
        this._serviceMessage.addMessage({
          type: 'error',
          message: 'Error al consultar el formulario...',
          life: 5000,
        });
      },
    });
  }

  private initFormDynamic(form: RegisterForm) {
    const formGroup = new FormGroup({});
    form.fields.forEach((field) => {
      formGroup.addControl(
        field.field_name,
        new FormControl('', field.required ? [NxValidators.required()] : [])
      );
    });
    this.formGroup = formGroup;
  }

  saveForm() {
    if (this.formGroup?.invalid) {
      this._serviceMessage.addMessage({
        type: 'warning',
        message: 'Por favor, completar todos los campos requeridos',
      });
      return;
    }

    this._loading.view(true);

    const formResponse = {
      form_id: this.form?.id!,
      user_id: this.customer_id!,
      customer_id: this.customer_id!,
      field_responses: this.form!.fields.map((field) => {
        return {
          field_id: field.id!,
          response_value:
            this.formGroup?.controls[field.field_name].getRawValue() || ' . ',
        };
      }),
    };
    debugger
    if (!this.login_with_credentials) {
      const document_number =
        this.formGroup?.controls['numero_documento'].getRawValue() || '';
      this.loginMeeting(document_number, formResponse);

      return;
    }
    this.registerForm(formResponse);
  }

  private loginMeeting(document_number: string, formResponse: any) {
    this._serviceMeeting.loginMeeting({ document_number }).subscribe({
      next: (result) => {
        if (result.success && result.id_customer) {
          this._store.dispatch(
            SetIdCustomer({ id_customer: result.id_customer.toString() })
          );
          this.registerForm({
            ...formResponse,
            user_id: result.id_customer.toString(),
            customer_id: result.id_customer.toString(),
          });
          return;
        } else {
          this._serviceMessage.addMessage({
            type: 'warning',
            message:
              'Usuario no encontrado en el sistema por favor comunicarse con el administrador...',
          });
        }
        this._loading.view(false);
      },
      error: () => {
        this._serviceMessage.addMessage({
          type: 'error',
          message: 'Error al consultar el usuario...',
          life: 5000,
        });
        this._loading.view(false);
      },
    });
  }

  private registerForm(formResponse: any) {
    this._serviceForm.createFormResponse(formResponse).subscribe({
      next: (value) => {
        if (value.success) {
          this._serviceMessage.addMessage({
            type: 'success',
            message: 'Formulario guardado exitosamente',
          });
        } else {
          this._serviceMessage.addMessage({
            type: 'error',
            message: 'Error al guardar el formulario',
          });
        }
        this._loading.view(false);
        this.redirectUnit();
      },
      error: () => {
        this.redirectUnit();
      },
    });
  }
}
