
// export type Auth = {
//     data: {
//         id: number
//         login: string
//         email: string
//     }
//     messages: string[]
//     fieldsErrors: string[]
//     resultCode: number
// }

export type Auth = {
    id: number | null
    login: string | null
    email: string | null
}


const SET_USER_DATA = "SET-USER-DATA"

const initialState: Auth = {
    id: null,
    login: null,
    email: null,
}


type Action = setUserData

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

type setUserData = ReturnType<typeof setUserData>

export const setUserData = (data : Auth) => ({
    type: SET_USER_DATA,
    payload: {
        data
    }
} as const)