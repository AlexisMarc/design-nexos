import {
  basicValue,
  RegisterDataConfig,
  RegisterDataCustomize,
  RegisterDataDesign,
  RegisterForm,
  resident,
} from '@models';

export interface AppStore {
  register: StatusRegister;
}
export interface StatusRegister {
  residential: undefined | resident;
  config: undefined | RegisterDataConfig;
  customize: undefined | RegisterDataCustomize;
  design: undefined | RegisterDataDesign;
  dynamicForm: undefined | RegisterForm;
  emailTemplate: basicValue[] | undefined;
  whatsAppTemplate: basicValue[] | undefined;
}
