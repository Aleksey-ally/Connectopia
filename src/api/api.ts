import axios from "axios";
import { UserType } from "redux/usersReducer";

type ResponseUsersType = {
    items: UserType[]
    totalCount: number
}

type ResponseAuth = {
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

const instance = axios.create(
    {
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        withCredentials: true,
        headers: {
            'API-KEY': 'bfc1e1b1-e625-4414-a10c-6bab615df806'
        }
    })


export const usersAPI = {
    getUsers(pageSize: number, currentPage: number) {
        return instance.get<ResponseUsersType>(`users?count=${pageSize}&page=${currentPage}`)
            .then(res => res.data)
    }
}

export const authAPI = {
    auth() {
        return instance.get<ResponseAuth>('auth/me')
            .then(res => res.data)
    }
}

export const profileAPI = {
    getProfile(uID: string) {
        return instance.get<ProfileUserResponseType>(`profile/${uID}`)
            .then(res => res.data)
    }
}

export const followAPI = {
    follow(uID: number) {
        return instance.post(`follow/${uID}`)
    },
    unFollow(uID: number) {
        return instance.delete(`follow/${uID}`)
    }
}

