import {UserType} from "redux/usersReducer";

export type DefaultResponseType<T = {}> = {
    resultCode: 1 | 0
    messages: string[],
    data: T
}

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

export type ResponseLogin = {
    userId: number
}

export type PropertiesLogin = {
    email: string
    password: number
    rememberMe: boolean
}

export type PhotosResponse = {
    large: string
    small: string
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
    photos: PhotosResponse
}

