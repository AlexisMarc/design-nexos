import { basicValue, RegisterDataConfig, RegisterDataCustomize, RegisterDataDesign, RegisterForm, resident } from '@models';
import { createAction, props } from '@ngrx/store';

export const DataConfig = createAction(
  '[Register] data config',
  props<{ data: RegisterDataConfig | undefined }>()
);
export const DataCustomize = createAction(
  '[Register] data customize',
  props<{ data: RegisterDataCustomize | undefined }>()
);
export const DataDesign = createAction(
  '[Register] data design',
  props<{ data: RegisterDataDesign | undefined }>()
);
export const DataDynamicForm = createAction(
  '[Register] data dynamic Form',
  props<{ data: RegisterForm | undefined }>()
);

export const DataTemplate = createAction(
  '[Register] data Template',
  props<{ data: { list: basicValue[]; type: 'email' | 'whatsApp' | 'event' } }>()
);

export const DataResident = createAction(
  '[Register] id resident',
  props<{ resident: resident | undefined }>()
);

export const MeetingId = createAction(
  '[Register] id meeting',
  props<{ meeting_id: number | undefined }>()
);
