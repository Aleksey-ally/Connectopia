const initialState = {
    initializing: false
}

export type App = typeof initialState

const SET_APP = "SET-APP"

type Action = SetApp

export const appReducer = (state = initialState, action: Action): App => {
    switch (action.type) {
        case SET_APP:

            return {
                ...state, initializing: action.initializing
            }

        default:
            return state
    }
}

type SetApp = ReturnType<typeof setApp>

export const setApp = (initializing: boolean) => ({
    type: SET_APP,
    initializing
} as const)