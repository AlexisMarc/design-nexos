import { createAction, props } from '@ngrx/store';

export const DataConfig = createAction('[Register] data config', props<{data: any}>() );
export const DataCustomize = createAction('[Register] data customize', props<{data: any}>());
export const DataDesign = createAction('[Register] data design', props<{data: any}>());
export const DataDynamicForm = createAction('[Register] data dynamic Form', props<{data: any}>());