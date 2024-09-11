import {
  RegisterDataConfig,
  RegisterDataCustomize,
  RegisterDataDesign,
  RegisterForm,
} from '@models';

export interface AppStore {
  register: StatusRegister;
}
export interface StatusRegister {
  residential_id: undefined | string;
  config: undefined | RegisterDataConfig;
  customize: undefined | RegisterDataCustomize;
  design: undefined | RegisterDataDesign;
  dynamicForm: undefined | RegisterForm;
}
