const initialState = {
    initializing: false,
    isFetching: false
}

export type App = typeof initialState

const SET_APP = "SET-APP"
const SET_FETCHING = "SET-FETCHING"

type Action = SetApp | SetFetching

export const appReducer = (state = initialState, action: Action): App => {
    switch (action.type) {
        case SET_APP:

            return {
                ...state, initializing: action.initializing
            }

        case SET_FETCHING:
            return {...state, isFetching: action.isFetching}

        default:
            return state
    }
}

type SetApp = ReturnType<typeof setApp>
type SetFetching = ReturnType<typeof setFetching>

export const setApp = (initializing: boolean) => ({
    type: SET_APP,
    initializing
} as const)

export const setFetching = (isFetching: boolean) => ({
    type: SET_FETCHING,
    isFetching
} as const)
