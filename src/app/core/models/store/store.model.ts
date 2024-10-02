import {
  basicValue,
  meetingDataAll,
  MeetingWelcome,
  RegisterDataConfig,
  RegisterDataCustomize,
  RegisterDataDesign,
  RegisterForm,
  resident,
  unit,
} from '@models';
import { ArrayUnits } from '@services';

export interface AppStore {
  register: StatusRegister;
  clientRegister: StatusClientRegister;
}
export interface StatusRegister {
  meeting_id: undefined | number;
  residential: undefined | resident;
  config: undefined | RegisterDataConfig;
  customize: undefined | RegisterDataCustomize;
  design: undefined | RegisterDataDesign;
  dynamicForm: undefined | RegisterForm;
  emailTemplate: basicValue[] | undefined;
  whatsAppTemplate: basicValue[] | undefined;
  typesEvent: basicValue[] | undefined;
}

export interface StatusClientRegister {
  welcome: MeetingWelcome | undefined;
  meeting: meetingDataAll | undefined;
  id_customer: string | undefined;
  units: unit[] | undefined;
  selectUnit: ArrayUnits[] | undefined,
  form_response_id: number | undefined
}
