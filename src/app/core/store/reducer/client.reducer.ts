import { StatusClientRegister } from '@models';
import { createReducer, on } from '@ngrx/store';
import {
  DataMeetingAll,
  DataSelectUnit,
  DataUnits,
  DataWelcome,
  SetIdCustomer,
  TaskQueuid,
} from '@store';

const initialState: StatusClientRegister = {
  welcome: undefined,
  meeting: undefined,
  id_customer: undefined,
  units: undefined,
  selectUnit: undefined,
  task_queu_id: undefined,
};

export const clientReducer = createReducer(
  initialState,
  on(DataWelcome, (state, { data }) => ({ ...state, welcome: data })),
  on(DataMeetingAll, (state, { data }) => ({ ...state, meeting: data })),
  on(SetIdCustomer, (state, { id_customer }) => ({ ...state, id_customer })),
  on(DataUnits, (state, { units }) => ({ ...state, units })),
  on(DataSelectUnit, (state, { selectUnit }) => ({ ...state, selectUnit })),
  on(TaskQueuid, (state, { task_queu_id }) => ({
    ...state,
    task_queu_id,
  }))
);
