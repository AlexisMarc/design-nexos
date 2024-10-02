import { state } from '@angular/animations';
import { StatusClientRegister } from '@models';
import { createReducer, on } from '@ngrx/store';
import {
  DataMeetingAll,
  DataSelectUnit,
  DataUnits,
  DataWelcome,
  FormResponseId,
  SetIdCustomer,
} from '@store';

const initialState: StatusClientRegister = {
  welcome: undefined,
  meeting: undefined,
  id_customer: undefined,
  units: undefined,
  selectUnit: undefined,
  form_response_id: undefined,
};

export const clientReducer = createReducer(
  initialState,
  on(DataWelcome, (state, { data }) => ({ ...state, welcome: data })),
  on(DataMeetingAll, (state, { data }) => ({ ...state, meeting: data })),
  on(SetIdCustomer, (state, { id_customer }) => ({ ...state, id_customer })),
  on(DataUnits, (state, { units }) => ({ ...state, units })),
  on(DataSelectUnit, (state, { selectUnit }) => ({ ...state, selectUnit })),
  on(FormResponseId, (state, { form_response_id }) => ({
    ...state,
    form_response_id,
  }))
);
