import { AppStore } from "@models";
import { ActionReducerMap } from "@ngrx/store";
import { clientReducer, registerReducer } from "@store";

export const RootStore:ActionReducerMap<AppStore> = {
    register: registerReducer,
    clientRegister: clientReducer,
}
