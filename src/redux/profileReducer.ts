import {profileAPI} from "api/api";
import {AppThunkDispatch} from "redux/reduxStore";
import {ProfileUserResponseType} from "api/api.types";

const ADD_POST = "ADD-POST";
const CHANGE_POST_TEXT = "CHANGE-POST-TEXT";
const SET_USER_PROFILE = "SET-USER-PROFILE";
const SET_STATUS = "SET-STATUS";

export type ProfileDataType = {
    postData: PostDataType[]
    textPost: string
    profile: UtilityProfileUserType
    status: string
}

export type PostDataType = {
    id: number
    message: string
    likeCounter: number
}

export type UtilityProfileUserType = Partial<ProfileUserResponseType>

const initialState: ProfileDataType = {
    postData: [
        {id: 1, message: "Beautiful!", likeCounter: 9},
        {id: 2, message: "Have a nice day!", likeCounter: 5},
    ],
    textPost: "",
    profile: {},
    status: ""
}

type ActionType =
    | AddPostType
    | ChangePostTextType
    | SetUserProfileType
    | SetStatusType


export const profileReducer = (state = initialState, action: ActionType): ProfileDataType => {

    switch (action.type) {
        case ADD_POST:
            if (state.textPost.trim() !== "") {

                return {
                    ...state, postData: [{
                        id: state.postData.length + 1,
                        message: state.textPost,
                        likeCounter: 0,
                    }, ...state.postData], textPost: ""
                }

            }

            return state

        case CHANGE_POST_TEXT:

            return {...state, textPost: action.payload.newText};

        case SET_USER_PROFILE:

            return {...state, profile: action.payload.profile}

        case SET_STATUS :
            return {...state, status: action.status}

        default:
            return state;
    }
};


type AddPostType = ReturnType<typeof addPost>
type ChangePostTextType = ReturnType<typeof changePostText>
type SetUserProfileType = ReturnType<typeof setUserProfile>
type SetStatusType = ReturnType<typeof setStatus>


export const addPost = () => ({type: ADD_POST} as const);

export const changePostText = (newText: string) => ({
    type: CHANGE_POST_TEXT,
    payload: {
        newText,
    },
} as const);

export const setUserProfile = (profile: Partial<ProfileUserResponseType>) => ({
    type: SET_USER_PROFILE,
    payload: {
        profile,
    },
} as const);

export const setStatus = (status: string) => ({
    type: SET_STATUS,
    status
} as const)

export const getUserProfile = (id: number) => {
    return (dispatch: AppThunkDispatch) => {
        profileAPI.getProfile(id)
            .then(res => {
                dispatch(setUserProfile(res))
            })
    }
}

export const getUserStatus = (id: number) => {
    return (dispatch: AppThunkDispatch) => {
        profileAPI.getStatus(id)
            .then(res => {
                dispatch(setStatus(res))
            })
    }
}

export const changeUserStatus = (status: string) => {
    return (dispatch: AppThunkDispatch) => {
        profileAPI.updateStatus(status)
            .then(res => {
                if (res.resultCode === 0) {
                    dispatch(setStatus(status))
                }
            })
    }
}

export const changeUserName = (fullName: string) => {
    return (dispatch: AppThunkDispatch) => {
        profileAPI.updateProfile(fullName)
            .then(res => {
                if (res.resultCode === 0) {
                    dispatch(setUserProfile({fullName}))
                }
            })
    }
}