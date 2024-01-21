import {UserType} from "redux/usersReducer";

export type ResponseUsersType = {
    items: UserType[]
    totalCount: number
    error: null | number
}

export type ResponseAuth = {
    data: {
        id: number
        login: string
        email: string
    }
    messages: string[]
    fieldsErrors: string[]
    resultCode: number
}

export type ProfileUserResponseType = {
    userId: number
    aboutMe: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    photos: {
        large: string
        small: string
    }
}

export type DefaultResponseType = {
    resultCode: 1 | 0
    messages: string[],
    data: object
}