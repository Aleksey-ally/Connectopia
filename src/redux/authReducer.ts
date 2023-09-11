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
    isAuth:false
}


type Action = setAuthUserData

export const authReducer = (state = initialState, action: Action): Auth => {
    switch (action.type) {
        case SET_USER_DATA:

            return {
                ...state,
                ...action.payload.data,
                isAuth:true
            }

        default:
            return state
    }
}

type setAuthUserData = ReturnType<typeof setAuthUserData>

export const setAuthUserData = (data : Auth ) => ({
    type: SET_USER_DATA,
    payload: {
        data
    }
} as const)