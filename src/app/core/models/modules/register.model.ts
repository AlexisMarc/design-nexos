export interface registerOption {
  value: string;
  label: string;
  selected: boolean;
  disabled: boolean;
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
  required: boolean;
  readonly: boolean;
  disabled: boolean;
  maxlength: number;
  minlength: number;
  min: number;
  max: number;
  step: number;
  pattern: string;
  autofocus: boolean;
  autocomplete: 'on' | 'off';
  multiple: boolean;
  size: number;
  alt: string;
  rows: number;
  cols: number;
  wrap: 'soft' | 'hard';
  options: registerOption[];
  validations: registerValidation[];
}

export interface RegisterForm {
  meeting_id: number;
  name: string;
  description: string;
  view: string;
  fields: registerField[];
}

export interface RegisterDataConfig {
  file: string;
  name: string;
  status: boolean;
  meeting_time: string;
  login_with_credentials: boolean;
  email_template_id: string;
  whatsapp_id: string;
  upload_database: boolean;
}

export interface RegisterDataCustomize {
  shall_ask_representation_document: boolean;
  label_name_owner: string;
  label_name_agent: string;
  limit_raising_by_customer: number;
  mails_to_send_documents: string;
  quality_care_selection: boolean;
}

export interface RegisterDataDesign {
  logo: string;
  color: string;
  welcome_message: string;
}
