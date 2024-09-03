export interface registerOption {
  value: string;
  label: string;
  selected: number;
  disabled: number;
}

export interface registerValidation {
  validation_type:
    | 'numeric'
    | 'negative-numeric'
    | 'email'
    | 'alphanumeric'
    | 'alphabetic'
    | 'special';
}

export interface registerField {
  label_name: string;
  field_name: string;
  placeholder: string;
  type:
    | 'input'
    | 'select'
    | 'textarea'
    | 'toggle-swish'
    | 'radio'
    | 'checkbox'
    | 'file'
    | 'button'
    | 'submit'
    | 'reset'
    | 'image'
    | 'hidden';
  type_input:
    | 'text'
    | 'password'
    | 'email'
    | 'number'
    | 'date'
    | 'datetime-local'
    | 'month'
    | 'week'
    | 'time'
    | 'tel'
    | 'url'
    | 'color'
    | 'range';
  required: number;
  readonly: number;
  disabled: number;
  maxlength: number;
  minlength: number;
  min: number;
  max: number;
  step: number;
  pattern: string;
  autofocus: number;
  autocomplete: 'on' | 'off';
  multiple: number;
  size: number;
  alt: string;
  rows: number;
  cols: number;
  wrap: 'soft' | 'hard';
  options: registerOption[];
  validations: registerValidation[];
}

export interface registerForm {
  meeting_id: number;
  name: string;
  description: string;
  view: string;
  fields: registerField[];
}
