import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {profileReducer} from "./profileReducer";
import {messagesReducer} from "./messagesReducer";
import {usersReducer} from "./usersReducer";
import {authReducer} from "./authReducer";
import {thunk} from "redux-thunk";

export type ReducersType = ReturnType<typeof reducers>

const reducers = combineReducers({
    profileData: profileReducer,
    messagesData: messagesReducer,
    usersData: usersReducer,
    auth: authReducer
})
export const reduxStore = createStore(reducers, applyMiddleware(thunk))

// @ts-expect-error:old
window.reduxStore = reduxStore;