import {
    addPost,
    changePostText,
    ProfileDataType,
    profileReducer,
    setStatus,
    setUserProfile
} from "redux/profileReducer";
import {ProfileUserResponseType} from "api/api.types";

let startState: ProfileDataType

beforeEach(() => {
    startState = {
        postData: [
            {id: 1, message: "Hello!", likeCounter: 91},
            {id: 2, message: "I'm glad to see you!", likeCounter: 59},
        ],
        textPost: "How are you?",
        profile: {},
        status: ""
    }
})

test('Post should be to added', () => {
    const endState = profileReducer(startState, addPost())

    expect(endState.postData[0].message).toBe("How are you?")
    expect(endState.postData[0].id).toBe(3)
})

test('Post text should be to changed', () => {
    const endState = profileReducer(startState, changePostText('Good night!'))

    expect(endState.textPost).toBe("Good night!")
})

test('User data should be to set', () => {
    const userData: Partial<ProfileUserResponseType> = {
        userId: 515,
        fullName: "Ivan",
        lookingForAJob: true
    }
    const endState = profileReducer(startState, setUserProfile(userData))

    expect(endState.profile.userId).toBe(515)
    expect(endState.profile.fullName).toBe("Ivan")
    expect(endState.profile.lookingForAJob).toBe(true)
    expect(endState.profile.aboutMe).toBe(undefined)
})

test('Status should be to set', () => {
    const endState = profileReducer(startState, setStatus('Knowledge is power!'))

    expect(endState.status).toBe("Knowledge is power!")
})