import {combineReducers, legacy_createStore as createStore} from "redux";
import {profileReducer} from "./profileReducer";
import {messagesReducer} from "./messagesReducer";
import { usersReducer } from "./usersReducer";

export type ReducersType = ReturnType<typeof reducers>

const reducers = combineReducers({
    profileData: profileReducer,
    messagesData: messagesReducer,
    usersData: usersReducer,
})
export const reduxStore = createStore(reducers)
