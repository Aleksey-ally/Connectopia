import {Auth, authReducer, setAuthUserData} from "redux/authReducer";

let startState: Auth

beforeEach(() => {
    startState = {
        id: null,
        login: null,
        email: null,
        isAuth: false
    }
})

test('User data should be to set', () => {
    const user: Auth = {
        id: 14975,
        login: 'Happy',
        email: 'happy.@gmail.com',
        isAuth: true
    }
    const endState = authReducer(startState, setAuthUserData(user))
    expect(endState.id).toBe(14975)
    expect(endState.login).toBe('Happy')
    expect(endState.email).toBe('happy.@gmail.com')
    expect(endState.isAuth).toBe(true)
})