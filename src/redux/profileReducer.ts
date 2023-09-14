import { ProfileUserResponseType } from "api/api";

const ADD_POST = "ADD-POST";
const CHANGE_POST_TEXT = "CHANGE-POST-TEXT";
const SET_USER_PROFILE = "SET-USER-PROFILE";

export type ProfileDataType = {
    postData: PostDataType[]
    textPost: string
    profile: UtilityProfileUserType
}

export type PostDataType = {
    id: number
    message: string
    likeCounter: number
}

export type UtilityProfileUserType = Partial<ProfileUserResponseType>

const initialState: ProfileDataType = {
    postData: [
        { id: 1, message: "Beautiful!", likeCounter: 9 },
        { id: 2, message: "Have a nice day!", likeCounter: 5 },
    ],
    textPost: "",
    profile: {}
}

type ActionType =
    | AddPostType
    | ChangePostTextType
    | setUserProfileType


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

            return { ...state, textPost: action.payload.newText };

        case SET_USER_PROFILE:

            return { ...state, profile: action.payload.profile }

        default:
            return state;
    }
};


type AddPostType = ReturnType<typeof addPost>
type ChangePostTextType = ReturnType<typeof changePostText>
type setUserProfileType = ReturnType<typeof setUserProfile>


export const addPost = () => ({ type: ADD_POST } as const);

export const changePostText = (newText: string) => ({
    type: CHANGE_POST_TEXT,
    payload: {
        newText,
    },
} as const);

export const setUserProfile = (profile: ProfileUserResponseType) => ({
    type: SET_USER_PROFILE,
    payload: {
        profile,
    },
} as const);
