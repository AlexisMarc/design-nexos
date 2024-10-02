import { DataCustomize } from './../../../../store/actions/register.actions';
import { Component, inject, output, type OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { NxValidators } from '@helpers';
import { AppStore, RegisterDataCustomize, RegisterForm } from '@models';
import { Store } from '@ngrx/store';
import { NxToastService } from '@shared';
import { Subscription } from 'rxjs';

@Component({
  selector: 'register-form-customize',
  templateUrl: './register-form-customize.component.html',
  styleUrl: './register-form-customize.component.css',
})
export class CustomizeRegisterComponent implements OnInit {
  onNext = output<void>();
  onAfter = output<void>();
  values = { OneValue: true, TwoValue: false };
  valuesNumber = { OneValue: 1, TwoValue: 0 };
  viewModeler = false;
  viewFields = {
    emailArray: false,
    rolesFun: false,
    countUnit: false,
    form: false,
  };
  public formName: string = 'Formulario de registro';
  editFormModeler = false;

  private _subscription = new Subscription();
  private _serviceMessage = inject(NxToastService);
  private _store: Store<AppStore> = inject(Store<AppStore>);

  public formEmails = new FormArray([
    new FormControl('', NxValidators.email('Correo electrónico invalido')),
    new FormControl('', NxValidators.email('Correo electrónico invalido')),
  ]);

  public form = new FormGroup({
    shall_ask_representation_document: new FormControl(0),
    label_name_owner: new FormControl('Propietario', NxValidators.required()),
    label_name_agent: new FormControl('Apoderado', NxValidators.required()),
    limit_raising_by_customer: new FormControl(0),
    quality_care_selection: new FormControl(0),
    mails_to_send_documents: new FormControl(''),
    authority_granted: new FormControl(0),
    signature_module: new FormControl(0),
  });

  ngOnInit(): void {
    this.initSubscription();
  }

  private initSubscription() {
    this._subscription.add(
      this._store.select('register').subscribe({
        next: (value) => {
          this.viewFields = {
            emailArray: false,
            rolesFun: false,
            countUnit: false,
            form: false,
          };
          if (value.dynamicForm) {
            this.formName = value.dynamicForm.name;
            this.viewFields.form = true;
          }
          if (value.customize) {
            this.setValues(value.customize);
            return;
          }
          this.form.patchValue({
            shall_ask_representation_document: 0,
            label_name_owner: 'Propietario',
            label_name_agent: 'Apoderado',
            limit_raising_by_customer: 0,
            quality_care_selection: 0,
            mails_to_send_documents: '',
          });
        },
      })
    );
  }

  private setValues({
    shall_ask_representation_document,
    label_name_owner,
    label_name_agent,
    limit_raising_by_customer,
    mails_to_send_documents,
    quality_care_selection,
    signature_module,
    authority_granted
  }: RegisterDataCustomize) {
    this.form.patchValue({
      shall_ask_representation_document,
      label_name_owner,
      label_name_agent,
      limit_raising_by_customer,
      mails_to_send_documents,
      quality_care_selection,
      signature_module,
      authority_granted
    });

    if (mails_to_send_documents && mails_to_send_documents !== '') {
      debugger;
      this.setEmailArrayFormDefault(true);
      mails_to_send_documents.split(',').forEach((email) => {
        this.addEmailInput(email);
      });
      this.viewFields.emailArray = true;
    }
    if (limit_raising_by_customer) this.viewFields.countUnit = true;
    if (label_name_owner !== 'Propietario' || label_name_agent !== 'Apoderado')
      this.viewFields.rolesFun = true;
  }

  addEmailInput(value: string = '') {
    this.formEmails.push(
      new FormControl(value, NxValidators.email('Correo electrónico invalido'))
    );
  }

  removeEmailInput() {
    const index = this.formEmails.controls.length;
    if (index === 1) {
      this._serviceMessage.addMessage({
        type: 'warning',
        message: 'Debe registrar al menos un email',
        life: 5000,
      });
      return;
    }
    this.formEmails.removeAt(index - 1);
    this._serviceMessage.addMessage({
      type: 'success',
      message: '¡Campo removido exitosamente!',
    });
  }

  modelerFormDynamic(edit: boolean = false) {
    this.editFormModeler = edit;
    this.viewModeler = true;
  }

  changeSwish(type: 'email-array' | 'roles-fun' | 'count-init') {
    switch (type) {
      case 'email-array':
        if (!this.viewFields.emailArray) {
          this.setEmailArrayFormDefault();
        } else {
          this.formEmails;
        }
        break;
      case 'roles-fun':
        if (!this.viewFields.rolesFun) {
          this.form.get('label_name_agent')?.setValue('Apoderado');
          this.form.get('label_name_owner')?.setValue('Propietario');
        }
        break;
      case 'count-init':
        if (!this.viewFields.countUnit) {
          this.form.get('limit_raising_by_customer')?.clearValidators();
        } else {
          this.form
            .get('limit_raising_by_customer')
            ?.setValidators([
              NxValidators.required(),
              NxValidators.min(1),
              NxValidators.max(1000),
            ]);
        }
        this.form.get('limit_raising_by_customer')?.updateValueAndValidity();
        break;
    }
  }

  private setEmailArrayFormDefault(isVoid: boolean = false) {
    if (isVoid) {
      this.formEmails = new FormArray<FormControl<string | null>>([]);
      return;
    }
    this.formEmails = new FormArray([
      new FormControl('', NxValidators.email('Correo electrónico invalido')),
      new FormControl('', NxValidators.email('Correo electrónico invalido')),
    ]);
  }

  saveForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this._serviceMessage.addMessage({
        type: 'warning',
        message: 'Por favor completar los campos requeridos',
      });
      return;
    }
    if (this.viewFields.emailArray && this.formEmails.invalid) {
      this.formEmails.markAllAsTouched();
      this._serviceMessage.addMessage({
        type: 'warning',
        message:
          'Por favor completar los todos campos de envió de registros de poderes',
        life: 5000,
      });
      return;
    }
    this.form.controls['mails_to_send_documents'].setValue(
      this.getEmailArray() ?? ''
    );

    const data = this.form.getRawValue() as RegisterDataCustomize;
    this._store.dispatch(DataCustomize({ data }));
    this.onNext.emit();
  }

  private getEmailArray() {
    const emails = this.formEmails.controls
      .map((control) => {
        return control.getRawValue();
      })
      .filter((email) => email !== null)
      .join(',');
    if (emails == ',') return '';
    return emails;
  }
}
