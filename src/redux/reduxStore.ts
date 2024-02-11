import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {profileReducer} from "./profileReducer";
import {messagesReducer} from "./messagesReducer";
import {usersReducer} from "./usersReducer";
import {authReducer} from "./authReducer";
import {thunk, ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {appReducer} from "redux/appReducer";

export type ReducersType = ReturnType<typeof reducers>

const reducers = combineReducers({
    profileData: profileReducer,
    messagesData: messagesReducer,
    usersData: usersReducer,
    auth: authReducer,
    app:appReducer
})
export const reduxStore = createStore(reducers, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof reducers>

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();



// @ts-expect-error:old
window.reduxStore = reduxStore;