type App = {
    initializing : boolean
}

const SET_APP = "SET-APP"

const initialState: App = {
    initializing : false
}


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

export const setApp = (initializing : boolean) => ({
    type: SET_APP,
    initializing
} as const)