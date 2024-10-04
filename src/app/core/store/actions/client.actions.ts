import { meetingDataAll, MeetingWelcome, unit } from "@models";
import { createAction, props } from "@ngrx/store";
import { ArrayUnits } from "@services";

export const DataWelcome = createAction(
    '[Client] data Welcome',
    props<{ data: MeetingWelcome | undefined }>()
  );

  export const DataMeetingAll = createAction(
    '[Client] data Meeting',
    props<{ data: meetingDataAll | undefined }>()
  );

  export const SetIdCustomer = createAction(
    '[Client] id customer',
    props<{ id_customer: string | undefined }>()
  );

  export const DataUnits = createAction(
    '[Client] data units',
    props<{ units: unit[] | undefined }>()
  );

  export const DataSelectUnit = createAction(
    '[Client] data select units',
    props<{ selectUnit: ArrayUnits[] | undefined }>()
  );

  export const TaskQueuid = createAction(
    '[Client] data select units',
    props<{ task_queu_id: number | undefined }>()
  );