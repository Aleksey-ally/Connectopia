import {AppThunkDispatch} from "redux/reduxStore";
import {authAPI} from "api/api";
import {PropertiesLogin} from "api/api.types";


export type Auth = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
}

const SET_USER_DATA = "SET-USER-DATA"

const initialState: Auth = {
    id: null,
    login: null,
    email: null,
    isAuth: false
}


type Action = setAuthUserData

export const authReducer = (state = initialState, action: Action): Auth => {
    switch (action.type) {
        case SET_USER_DATA:

            return {
                ...state,
                ...action.payload.data
            }

        default:
            return state
    }
}

type setAuthUserData = ReturnType<typeof setAuthUserData>

export const setAuthUserData = (data: Auth) => ({
    type: SET_USER_DATA,
    payload: {
        data
    }
} as const)

export const getAuthUserData = (dispatch: AppThunkDispatch) => {
    authAPI.me()
        .then((data) => {
            if (data.resultCode === 0) {
                dispatch(setAuthUserData({...data.data, isAuth: true}))
            }
        })
}

export const login = (payload: PropertiesLogin) =>
    (dispatch: AppThunkDispatch) => {
        authAPI.login(payload)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(getAuthUserData)
                }
            })
    }

export const logout = (dispatch: AppThunkDispatch) => {
    authAPI.logout()
        .then(() => {
            dispatch(setAuthUserData({
                id: null,
                login: null,
                email: null,
                isAuth: false
            }))
        })
}