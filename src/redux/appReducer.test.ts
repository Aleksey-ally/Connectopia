import {App, appReducer, setApp} from "redux/appReducer";

let startState: App

beforeEach(() => {
    startState = {
        initializing: false,
        isFetching: false
    }
})

test('initializing should be set correct', () => {
    let endState = appReducer(startState, setApp(true))
    expect(endState.initializing).toBe(true)

    endState = appReducer(startState, setApp(false))
    expect(endState.initializing).toBe(false)
})