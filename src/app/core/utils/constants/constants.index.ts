import { basicValue } from "@models";

export interface field {
  id: string; // <- generado por frontend
  label_name: string;
  type_html:
    | 'input'
    | 'select'
    | 'textarea'
    | 'toggle-swish'
    | 'radio'
    | 'checkbox';
  type:
    | 'option'
    | 'multi-option'
    | 'text'
    | 'number'
    | 'status'
    | 'date'
    | 'date-time'
    | 'time'
    | 'address';
  validation:
    | 'numeric'
    | 'negative-numeric'
    | 'email'
    | 'alphanumeric'
    | 'alphabetic'
    | 'special';
  requerid: boolean;
  mask?: 'currency' | 'phone-number' | 'percentage';
  values?: basicValue[];
}
