import { StatusRegister } from '@models';
import { createReducer, on } from '@ngrx/store';
import {
  DataConfig,
  DataTemplate,
  DataResident,
  DataDynamicForm,
  DataCustomize,
} from '@store';

export const initialState: StatusRegister = {
  residential: undefined,
  config: undefined,
  customize: undefined,
  design: undefined,
  dynamicForm: undefined,
  emailTemplate: undefined,
  whatsAppTemplate: undefined,
};

export const registerReducer = createReducer(
  initialState,
  on(DataConfig, (state, { data }) => ({ ...state, config: data })),
  on(DataTemplate, (state, { data }) => {
    console.log(data);
    switch (data.type) {
      case 'email':
        return { ...state, emailTemplate: data.list };

      case 'whatsApp':
        return { ...state, whatsAppTemplate: data.list };
    }
  }),
  on(DataResident, (state, { resident }) => ({
    ...state,
    residential: resident,
  })),
  on(DataDynamicForm, (state, { data }) => ({ ...state, dynamicForm: data })),
  on(DataCustomize, (state, { data }) => ({ ...state, customize: data }))
);
