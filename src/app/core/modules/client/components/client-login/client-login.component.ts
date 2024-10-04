import {
  Component,
  inject,
  OnChanges,
  SimpleChanges,
  type OnInit,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NxValidators } from '@helpers';
import { AppStore, meetingDataAll, MeetingWelcome } from '@models';
import { Store } from '@ngrx/store';
import {
  colorsDynamic,
  ColorServiceService,
  loginMeeting,
  MeetingDataService,
} from '@services';
import { NxLoadingService, NxToastService } from '@shared';
import { SetIdCustomer } from '@store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrl: './client-login.component.css',
})
export class ClientLoginComponent implements OnInit, OnChanges {
  public meeting?: meetingDataAll;
  public welcome?: MeetingWelcome;
  public requerid: boolean = true;
  values = { OneValue: true, TwoValue: false };
  public colors!: colorsDynamic;
  private _subscription = new Subscription();
  private _serviceColors = inject(ColorServiceService);
  private _router = inject(Router);
  private _store: Store<AppStore> = inject(Store<AppStore>);
  private _serviceMessage = inject(NxToastService);
  private _loading = inject(NxLoadingService);
  private _serviceMeeting = inject(MeetingDataService);

  public form = new FormGroup({
    accept_polity: new FormControl(false),
    password: new FormControl('', [NxValidators.maxLength(50)]),
    document_number: new FormControl('', [
      NxValidators.minLength(5),
      NxValidators.maxLength(15),
    ]),
  });

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    this.initSubscription();
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
          if (this.meeting) {
            this.initValues(this.meeting);
          } else {
            this.redirectReset();
          }
        },
      })
    );
  }

  private initValues({ login_with_credentials }: meetingDataAll) {
    this.requerid = login_with_credentials!!;
    if (this.requerid) this.setValidationsForm();
    else
      this.form.controls['document_number'].addValidators(
        NxValidators.required()
      );
  }

  private setValidationsForm() {
    this.form.controls['document_number'].addValidators(
      NxValidators.required()
    );
    this.form.controls['password'].addValidators(NxValidators.required());
  }

  private async redirectReset() {
    await this._router.navigate(['client']);
  }

  saveLogin() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this._serviceMessage.addMessage({
        type: 'warning',
        message: 'Por favor completar los campos obligatorios',
      });
      return;
    }

    const { password, document_number, accept_polity } =
      this.form.getRawValue();

    if (!accept_polity) {
      this._serviceMessage.addMessage({
        type: 'warning',
        message: 'Debe aceptar los términos y condiciones, para continuar',
      });
      return;
    }

    this._loading.view(true);
    const value: loginMeeting = {};
    value.document_number = document_number!;
    if (this.requerid) {
      value.password = password!;
    }
    this._serviceMeeting.loginMeeting(value).subscribe({
      next: (result) => {
        if (result.success && result.id_customer) {
          this._store.dispatch(
            SetIdCustomer({ id_customer: result.id_customer.toString() })
          );
          this._loading.view(false);
          this.redirectForm();
        } else {
          this._serviceMessage.addMessage({
            type: 'warning',
            message: 'Usuario o contraseña incorrectos...',
          });
        }
        this._loading.view(false);
      },
      error: () => {
        this._serviceMessage.addMessage({
          type: 'error',
          message: 'Error al iniciar sesión en el evento...',
          life: 5000,
        });
        this._loading.view(false);
      },
    });
  }

  private async redirectForm() {
    await this._router.navigate(['client/form']);
  }
}
