import { state } from '@angular/animations';
import { StatusRegister } from '@models';
import { createReducer, on } from '@ngrx/store';
import {
  DataConfig,
  DataTemplate,
  DataResident,
  DataDynamicForm,
  DataCustomize,
  DataDesign,
  MeetingId,
} from '@store';

const initialState: StatusRegister = {
  meeting_id: undefined,
  residential: undefined,
  config: undefined,
  customize: undefined,
  design: undefined,
  dynamicForm: undefined,
  emailTemplate: undefined,
  whatsAppTemplate: undefined,
  typesEvent: undefined,
};

export const registerReducer = createReducer(
  initialState,
  on(DataConfig, (state, { data }) => ({ ...state, config: data })),
  on(DataTemplate, (state, { data }) => {
    switch (data.type) {
      case 'email':
        return { ...state, emailTemplate: data.list };

      case 'whatsApp':
        return { ...state, whatsAppTemplate: data.list };

      case 'event':
        return { ...state, typesEvent: data.list };
    }
  }),
  on(DataResident, (state, { resident }) => ({
    ...state,
    residential: resident,
  })),
  on(DataDynamicForm, (state, { data }) => ({ ...state, dynamicForm: data })),
  on(DataCustomize, (state, { data }) => ({ ...state, customize: data })),
  on(DataDesign, (state, { data }) => ({ ...state, design: data })),
  on(MeetingId, (state, { meeting_id }) => ({ ...state, meeting_id }))
);
