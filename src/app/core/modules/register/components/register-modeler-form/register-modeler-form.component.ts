import {
  Component,
  inject,
  input,
  OnChanges,
  OnInit,
  output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  DYNAMIC_FIELD_DATA_DEFAULT,
  DYNAMIC_FORM_DATA_DEFAULT,
} from '@constants';
import { NxValidators } from '@helpers';
import {
  AppStore,
  basicValue,
  registerField,
  RegisterForm,
  registerOption,
  registerValidation,
} from '@models';
import { Store } from '@ngrx/store';
import { FormDynamicService } from '@services';
import { NxToastService } from '@shared';
import { DataDynamicForm } from '@store';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'register-modeler-form',
  templateUrl: './register-modeler-form.component.html',
  styleUrl: './register-modeler-form.component.css',
})
export class ModelerFormRegisterComponent implements OnInit {
  private inputSubject: Subject<void> = new Subject<void>();
  edit = input<boolean>(false);
  valuesBoolean = { OneValue: true, TwoValue: false };
  valuesNumber = { OneValue: 2, TwoValue: 1 };
  valuesWrap = { OneValue: 'soft', TwoValue: 'hard' };

  onClose = output<boolean>();
  options = [
    {
      label: 'Opción 1',
      value: '1',
    },
    {
      label: 'Opción 2',
      value: '2',
    },
    {
      label: 'Opción 3',
      value: '3',
    },
    {
      label: 'Opción 4',
      value: '4',
    },
  ];

  typeInput: basicValue[] = [
    {
      label: 'Input',
      value: 'input',
    },
    {
      label: 'Lista desplegable',
      value: 'select',
    },
    {
      label: 'Área de texto',
      value: 'textarea',
    },
    {
      label: 'Interruptor',
      value: 'toggle-swish',
    },
    {
      label: 'Radio',
      value: 'radio',
    },
    {
      label: 'Casilla de selección',
      value: 'checkbox',
    },
  ];

  typeDataInput: basicValue[] = [
    {
      label: 'Texto',
      value: 'text',
    },
    {
      label: 'Contraseña',
      value: 'password',
    },
    {
      label: 'Email',
      value: 'email',
    },
    {
      label: 'Número',
      value: 'number',
    },
    {
      label: 'Fecha',
      value: 'date',
    },
    {
      label: 'Fecha y hora',
      value: 'datetime-local',
    },
    {
      label: 'Hora',
      value: 'time',
    },
    {
      label: 'Mes',
      value: 'month',
    },
    {
      label: 'Semana',
      value: 'week',
    },
    {
      label: 'Teléfono',
      value: 'tel',
    },
    {
      label: 'Color',
      value: 'color',
    },
    {
      label: 'Rango',
      value: 'range',
    },
  ];

  formModeler: RegisterForm = DYNAMIC_FORM_DATA_DEFAULT;

  inputTitle = new FormControl('', [
    NxValidators.required(),
    NxValidators.maxLength(50),
    NxValidators.minLength(3),
  ]);

  formField = new FormGroup({
    label_name: new FormControl('Campo', [
      NxValidators.required(),
      NxValidators.pattern(
        /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s]+$/,
        'Solo caracteres alfanuméricos'
      ),
      NxValidators.maxLength(50),
      NxValidators.minLength(3),
    ]),
    field_name: new FormControl('campo_id', [
      NxValidators.required(),
      NxValidators.pattern(
        '^[a-z0-9_]+$',
        'Solo números, letras minúsculas y el "_"'
      ),
      NxValidators.maxLength(50),
      NxValidators.minLength(3),
    ]),
    placeholder: new FormControl('Campo por defecto', [
      NxValidators.required(),
      NxValidators.pattern(
        /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s]+$/,
        'Solo caracteres alfanuméricos'
      ),
      NxValidators.maxLength(50),
      NxValidators.minLength(3),
    ]),
    type: new FormControl('input', [NxValidators.required()]),
    type_input: new FormControl('text', [NxValidators.required()]),
    required: new FormControl<boolean>(true, [NxValidators.required()]),
    readonly: new FormControl(false, [NxValidators.required()]),
    disabled: new FormControl(false, [NxValidators.required()]),
    maxlength: new FormControl(150, [
      NxValidators.required(),
      NxValidators.pattern(/^\d+(\.\d+)?$/, 'Solo números positivos'),
      NxValidators.pattern(
        /^(?:[1-9]\d{0,12}|0)$/,
        'En número máximo es 999.999.999.999'
      ),
    ]),
    minlength: new FormControl(1, [
      NxValidators.required(),
      NxValidators.pattern(/^\d+(\.\d+)?$/, 'Solo números positivos'),
      NxValidators.pattern(
        /^(?:[1-9]\d{0,8}|0)$/,
        'En número máximo es 999.999.999'
      ),
    ]),
    min: new FormControl(0, [
      NxValidators.required(),
      NxValidators.pattern(/^\d+(\.\d+)?$/, 'Solo números positivos'),
      NxValidators.pattern(
        /^(?:[1-9]\d{0,8}|0)$/,
        'En número máximo es 999.999.999'
      ),
    ]),
    max: new FormControl(0, [
      NxValidators.required(),
      NxValidators.pattern(/^\d+(\.\d+)?$/, 'Solo números positivos'),
      NxValidators.pattern(
        /^(?:[1-9]\d{0,8}|0)$/,
        'En número máximo es 999.999.999'
      ),
    ]),
    step: new FormControl(0, [NxValidators.required()]),
    pattern: new FormControl('0'),
    autofocus: new FormControl(false, [NxValidators.required()]),
    autocomplete: new FormControl('off', [NxValidators.required()]),
    multiple: new FormControl(false, [NxValidators.required()]),
    size: new FormControl(100, [NxValidators.required()]),
    alt: new FormControl('0'),
    rows: new FormControl(1, [NxValidators.required()]),
    cols: new FormControl(1, [NxValidators.required()]),
    wrap: new FormControl('soft', [NxValidators.required()]),
    options: new FormControl<registerOption[]>([], [NxValidators.required()]),
    validations: new FormControl<registerValidation[]>([]),
  });

  optionsFieldSelect: registerOption[] = [];
  validationsFieldSelect: registerValidation[] = [];
  indexOptionsFieldEdit: number = -1;

  formOptions = new FormGroup({
    value: new FormControl<string>('', [
      NxValidators.required(),
      NxValidators.maxLength(50),
    ]),
    label: new FormControl<string>('', [
      NxValidators.required(),
      NxValidators.maxLength(50),
    ]),
    selected: new FormControl<boolean>(false),
    disabled: new FormControl<boolean>(false),
  });

  fieldSelect?: registerField;
  indexFieldSelect: number = -1;
  viewOptions: boolean = false;
  viewConfig: boolean = false;
  viewListOptions: boolean = false;

  private _subscription = new Subscription();
  private _serviceMessage = inject(NxToastService);
  private _store: Store<AppStore> = inject(Store<AppStore>);

  constructor() {
    this.inputSubject.pipe(debounceTime(300)).subscribe(() => {
      this._changeInput();
    });
  }

  ngOnInit(): void {
    this.initSubscription();
  }

  private initSubscription() {
    this._subscription.add(
      this._store.select('register').subscribe({
        next: (value) => {
          if (value.dynamicForm)
            this.formModeler = structuredClone(value.dynamicForm);
          else this.formModeler = DYNAMIC_FORM_DATA_DEFAULT;
          this.inputTitle.setValue(this.formModeler.name);
        },
      })
    );
  }

  changeInput() {
    this.inputSubject.next();
  }

  changeTitle() {
    this.formModeler.name = this.inputTitle.getRawValue() ?? '';
  }

  private _changeInput() {
    if (this.indexFieldSelect !== -1) {
      const fields = this.formModeler.fields;
      fields[this.indexFieldSelect] = this.formField.value as registerField;
      this.formModeler.fields = [...fields];
      this.fieldSelect = this.formField.value as registerField;
    }
  }

  selectedField(field: registerField, index: number) {
    this.formField.patchValue({ ...field });
    this.fieldSelect = field;
    this.indexFieldSelect = index;
    this.validationsFieldSelect = [...field.validations];
    this.optionsFieldSelect = [...field.options];
  }

  moveUpField() {
    const fields = this.formModeler.fields;
    const field = fields[this.indexFieldSelect];

    fields.splice(this.indexFieldSelect, 1);
    fields.splice(this.indexFieldSelect - 1, 0, field);
    this.formModeler.fields = [...fields];
    this.indexFieldSelect = this.indexFieldSelect - 1;
  }

  moveDownField() {
    const fields = this.formModeler.fields;
    const field = fields[this.indexFieldSelect];

    fields.splice(this.indexFieldSelect, 1);
    fields.splice(this.indexFieldSelect + 1, 0, field);
    this.formModeler.fields = [...fields];
    this.indexFieldSelect = this.indexFieldSelect + 1;
  }

  editOptionField(index: number) {
    this.indexOptionsFieldEdit = index;
    this.formOptions.patchValue(this.optionsFieldSelect[index]);
  }

  saveOptionField() {
    if (this.formOptions.invalid) {
      this.formOptions.markAllAsTouched();
      this._serviceMessage.addMessage({
        type: 'warning',
        message: 'Por favor, completar todos los campos requeridos',
      });
      return;
    }
    const result = this.formOptions.getRawValue() as registerOption;
    this.formOptions.reset();

    const options = this.optionsFieldSelect;
    if (this.indexOptionsFieldEdit === -1) {
      options.push(result);
    } else {
      options[this.indexOptionsFieldEdit] = result;
    }

    this.indexOptionsFieldEdit = -1;
    this.optionsFieldSelect = [...options];
    this._serviceMessage.addMessage({
      type: 'success',
      message: 'Valor guardado exitosamente',
    });

    this.formField.get('options')?.setValue([...this.optionsFieldSelect]);
    this._changeInput();
  }

  deleteOptionField(index: number) {
    const fields = this.optionsFieldSelect.filter((_, i) => i !== index);
    this.indexOptionsFieldEdit = -1;
    this.formOptions.reset();
    this.optionsFieldSelect = [...fields];
    this.viewListOptions = false;
    this._serviceMessage.addMessage({
      type: 'success',
      message: 'Valor eliminado exitosamente',
    });
  }

  cloneField() {
    const fieldClone = this.formModeler.fields[this.indexFieldSelect];
    this.formModeler.fields = [...this.formModeler.fields, fieldClone];
    this.indexFieldSelect = this.formModeler.fields.length - 1;
    this.viewListOptions = false;
    this._serviceMessage.addMessage({
      type: 'success',
      message: '!Campo clonado correctamente!',
      life: 5000,
    });
  }

  deleteField() {
    if (this.formModeler.fields.length === 1) {
      this._serviceMessage.addMessage({
        type: 'warning',
        message: 'El formulario debe tener como mínimo un campo',
        life: 5000,
      });
      return;
    }
    const fields = this.formModeler.fields.filter(
      (_, index) => index !== this.indexFieldSelect
    );
    this.indexFieldSelect = -1;
    this.fieldSelect = undefined;
    this.formModeler.fields = [...fields];
    this.viewListOptions = false;
    this._serviceMessage.addMessage({
      type: 'success',
      message: '¡El campo fue eliminado exitosamente!',
      life: 5000,
    });
  }

  createField() {
    this.formModeler.fields = [
      ...this.formModeler.fields,
      DYNAMIC_FIELD_DATA_DEFAULT,
    ];
    this._serviceMessage.addMessage({
      type: 'success',
      message: '!Campo agregado correctamente!',
      life: 5000,
    });
  }

  saveForm() {
    if (!!this.fieldSelect && this.formField.invalid) {
      this._serviceMessage.addMessage({
        type: 'warning',
        message: 'Por favor completar la configuración del campo seleccionado',
      });
      console.log(this.formField.controls);
      this.formField.markAllAsTouched();
      return;
    }
    if (this.inputTitle.invalid) {
      this._serviceMessage.addMessage({
        type: 'warning',
        message: 'Por favor completar el campo titulo',
      });
      this.inputTitle.markAsTouched();
      return;
    }
    this._store.dispatch(
      DataDynamicForm({
        data: { ...this.formModeler, name: this.inputTitle.getRawValue()! },
      })
    );
    this._serviceMessage.addMessage({
      type: 'success',
      message: '¡Formulario guardado correctamente!',
      life: 5000,
    });
    this.onClose.emit(false);
  }
}
