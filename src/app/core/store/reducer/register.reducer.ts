import { StatusRegister } from '@models';
import { createReducer, on } from '@ngrx/store';
import { DataConfig } from '@store';

export const initialState: StatusRegister = {
  residential_id: undefined,
  config: undefined,
  customize: undefined,
  design: undefined,
  dynamicForm: undefined,
};

export const registerReducer = createReducer(
  initialState,
  on(DataConfig, (state, { data }) => (state.config = data))
);
