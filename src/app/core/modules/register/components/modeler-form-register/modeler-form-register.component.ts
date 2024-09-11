import { Component, OnInit } from '@angular/core';
import { RegisterForm } from '@models';

@Component({
  selector: 'app-modeler-form-register',
  templateUrl: './modeler-form-register.component.html',
  styleUrl: './modeler-form-register.component.css',
})
export class ModelerFormRegisterComponent implements OnInit {
  values = { OneValue: true, TwoValue: false };
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

  formModeler: RegisterForm = {
    meeting_id: 1,
    name: 'Formulario de Ejemplo',
    description: 'Descripción del formulario',
    view: 'register',
    fields: [
      {
        label_name: 'Campo 1',
        field_name: 'Input campo',
        placeholder: 'Campo1',
        type: 'select',
        type_input: 'text',
        required: true,
        readonly: false,
        disabled: false,
        maxlength: 255,
        minlength: 0,
        min: 0,
        max: 100,
        step: 1,
        pattern: '',
        autofocus: false,
        autocomplete: 'on',
        multiple: false,
        size: 20,
        alt: '',
        rows: 1,
        cols: 20,
        wrap: 'soft',
        options: [
          {
            value: 'opcion1',
            label: 'Opción 1',
            selected: 1,
            disabled: 0,
          },
          {
            value: 'opcion2',
            label: 'Opción 2',
            selected: 0,
            disabled: 1,
          },
        ],
        validations: [
          {
            validation_type: 'numeric',
          },
        ],
      },
      {
        label_name: 'Campo 2',
        field_name: 'Input campo2',
        placeholder: 'Campo2',
        type: 'radio',
        type_input: 'email',
        required: true,
        readonly: false,
        disabled: false,
        maxlength: 255,
        minlength: 5,
        min: 0,
        max: 100,
        step: 1,
        pattern: '',
        autofocus: false,
        autocomplete: 'on',
        multiple: false,
        size: 20,
        alt: '',
        rows: 1,
        cols: 20,
        wrap: 'soft',
        options: [
          {
            value: 'opcion3',
            label: 'Opción 3',
            selected: 0,
            disabled: 1,
          },
          {
            value: 'opcion4',
            label: 'Opción 4',
            selected: 0,
            disabled: 1,
          },
        ],
        validations: [
          {
            validation_type: 'email',
          },
        ],
      },
    ],
  };
  ngOnInit(): void {}
}
