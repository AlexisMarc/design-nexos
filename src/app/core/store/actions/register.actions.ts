import { basicValue, RegisterDataConfig, RegisterDataCustomize, RegisterDataDesign, RegisterForm, resident } from '@models';
import { createAction, props } from '@ngrx/store';

export const DataConfig = createAction(
  '[Register] data config',
  props<{ data: RegisterDataConfig }>()
);
export const DataCustomize = createAction(
  '[Register] data customize',
  props<{ data: RegisterDataCustomize }>()
);
export const DataDesign = createAction(
  '[Register] data design',
  props<{ data: RegisterDataDesign }>()
);
export const DataDynamicForm = createAction(
  '[Register] data dynamic Form',
  props<{ data: RegisterForm }>()
);

export const DataTemplate = createAction(
  '[Register] data Template',
  props<{ data: { list: basicValue[]; type: 'email' | 'whatsApp' } }>()
);

export const DataResident = createAction(
  '[Register] id resident',
  props<{ resident: resident | undefined }>()
);
