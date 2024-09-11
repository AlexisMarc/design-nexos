import { Component, inject, type OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NxValidators } from '@helpers';
import { AppStore, basicValue, itemsProgressBar } from '@models';
import { Store } from '@ngrx/store';
import { EmailService } from '@services';
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

  ngOnInit(): void {
    this._subscription.add(
      this._store.select('register').subscribe({
        next: (value) => {
          console.log(value);
        },
      })
    );
  }

  saveForm() {
    this.form.markAllAsTouched();
    console.log('submit');
  }
}
