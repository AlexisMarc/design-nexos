import { Component, inject, OnDestroy, type OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
import { FormResponseId } from '@store';
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
  public formGroup = new FormGroup({});

  public colors!: colorsDynamic;
  private _subscription = new Subscription();
  private _serviceColors = inject(ColorServiceService);
  private _router = inject(Router);
  private _store: Store<AppStore> = inject(Store<AppStore>);
  private _serviceMessage = inject(NxToastService);
  //private _serviceMeeting = inject(MeetingDataService);
  private _loading = inject(NxLoadingService);
  private _serviceForm = inject(FormDynamicService);

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
            this.initDynamicForm(this.meeting.meeting_id);
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

  private initDynamicForm(meeting_id: number) {
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

  saveForm() {
    this._loading.view(true);
    this._serviceForm
      .createFormResponse({
        form_id: this.form?.id!,
        user_id: this.customer_id!,
        customer_id: this.customer_id!,
        field_responses: this.form!.fields.map((field) => {
          return { field_id: field.id!, response_value: 'Marcos' };
        }),
      })
      .subscribe({
        next: (value) => {
          if (value.success) {
            this._serviceMessage.addMessage({
              type: 'success',
              message: 'Formulario guardado exitosamente',
            });
            this._store.dispatch(
              FormResponseId({ form_response_id: value.form_response_id })
            );
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
