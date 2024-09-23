import {
  Component,
  inject,
  input,
  OnChanges,
  output,
  SimpleChanges,
  type OnInit,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NxValidators } from '@helpers';
import { AppStore, basicValue, RegisterDataConfig } from '@models';
import { Store } from '@ngrx/store';
import { NxToastService } from '@shared';
import { DataConfig } from '@store';
import { Subscription } from 'rxjs';
@Component({
  selector: 'register-form-config',
  templateUrl: './register-form-config.component.html',
  styleUrl: './register-form-config.component.css',
})
export class FormBasicValuesRegisterComponent implements OnInit, OnChanges {
  onNext = output<void>();
  onAfter = output<void>();
  onCustomize = output<boolean>();
  statusCustomize = input.required<boolean>();
  controlCustomize = new FormControl(false);
  values = { OneValue: true, TwoValue: false };
  templateEmail: basicValue[] = [];
  templateWhatsApp: basicValue[] = [];
  disabled = input.required<boolean>();

  dataConfig: RegisterDataConfig = {
    file: '',
    name: '',
    status: true,
    meeting_time: '',
    login_with_credentials: false,
    email_template_id: '',
    whatsapp_id: '',
    upload_database: false,
  };

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
    this.form.disable();
    this.controlCustomize.disable();
    this.initSubscription();
  }

  ngOnChanges(_: SimpleChanges): void {
    this.controlCustomize.setValue(this.statusCustomize());
    if (!this.disabled()) {
      this.form.enable();
      this.controlCustomize.enable();
    } else {
      this.form.disable();
      this.controlCustomize.disable();
    }
  }

  private initSubscription() {
    this._subscription.add(
      this._store.select('register').subscribe({
        next: (value) => {
          if (value) {
            this.templateEmail = value.emailTemplate ?? [];
            this.templateWhatsApp = value.whatsAppTemplate ?? [];
            if (value.config) {
              this.dataConfig = structuredClone(value.config);
              this.setValues();
            }
          }
        },
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
    const data = this.form.getRawValue() as RegisterDataConfig;
    this._store.dispatch(DataConfig({ data }));
    this.onNext.emit();
  }

  private setValues() {
    this.form.setValue(this.dataConfig);
    if (this.dataConfig.upload_database) {
      this.form.get('file')?.setValue('file');
    }
  }

  public setCustomize(status: boolean) {
    this.onCustomize.emit(status);
  }
}
