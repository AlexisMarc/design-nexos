import { Component, inject, type OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NxValidators } from '@helpers';
import { AppStore, basicValue } from '@models';
import { Store } from '@ngrx/store';
import { NxToastService } from '@shared';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-form-basic-values-register',
  templateUrl: './form-basic-values-register.component.html',
  styleUrl: './form-basic-values-register.component.css',
})
export class FormBasicValuesRegisterComponent implements OnInit {
  values = { OneValue: true, TwoValue: false };
  templateEmail: basicValue[] = [];
  templateWhatsApp: basicValue[] = [];

  form = new FormGroup({
    file: new FormControl('', [NxValidators.required()]),
    name: new FormControl('', [NxValidators.required()]),
    status: new FormControl(true, [NxValidators.required()]),
    meeting_time: new FormControl('', [NxValidators.required()]),
    login_with_credentials: new FormControl(false),
    email_template_id: new FormControl('', [NxValidators.required()]),
    whatsapp_id: new FormControl('', [NxValidators.required()]),
    upload_database: new FormControl(false),
  });
  private _subscription = new Subscription();
  private _store: Store<AppStore> = inject(Store<AppStore>);
  private _serviceMessage = inject(NxToastService);

  ngOnInit(): void {
    this._subscription.add(
      this._store.select('register').subscribe({
        next: (value) => {
          if (value) {
            this.templateEmail = value.emailTemplate ?? [];
            this.templateWhatsApp = value.whatsAppTemplate ?? [];
          }
        },
      })
    );
  }

  initSubscription() {
    this._subscription.add(
      this._store.select('register').subscribe({
        next: (value) => {},
        error: () => {},
      })
    );
  }

  saveForm() {
    if (this.form.invalid) {
      this._serviceMessage.addMessage({
        type: 'warning',
        message: 'Por favor, completar todos los campos requeridos',
        life: 4000,
      });
      this.form.markAllAsTouched();
      return;
    }
    console.log(this.form.value)
  }
}
