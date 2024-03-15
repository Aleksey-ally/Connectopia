import axios from "axios";
import {
    DefaultResponseType,
    ProfileUserResponseType, PropertiesLogin,
    ResponseAuth,
    ResponseLogin,
    ResponseUsersType
} from "api/api.types";

const instance = axios.create(
    {
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        withCredentials: true,
        headers: {
            'API-KEY': 'bfc1e1b1-e625-4414-a10c-6bab615df806'
        }
    })

export const authAPI = {
    async me() {
        const res = await instance.get<ResponseAuth>('auth/me')
        return res.data
    },
    async login(payload: PropertiesLogin) {
        const res = await instance.post<DefaultResponseType<ResponseLogin>>('auth/login', {...payload})
        return res.data
    },
    async logout() {
        const res = await instance.delete<DefaultResponseType>('auth/login')
        return res.data
    }
}

export const usersAPI = {
    async getUsers(pageSize: number, currentPage: number) {
        const res = await instance.get<ResponseUsersType>(`users?count=${pageSize}&page=${currentPage}`)
        return res.data
    },
    async follow(uID: number) {
        const res = await instance.post<DefaultResponseType>(`follow/${uID}`)
        return res.data
    },
    async unFollow(uID: number) {
        const res = await instance.delete<DefaultResponseType>(`follow/${uID}`)
        return res.data
    }
}


export const profileAPI = {
    async getProfile(uID: number) {
        const res = await instance.get<ProfileUserResponseType>(`profile/${uID}`)
        return res.data
    },
    async updateProfile(newName: string) {
        const res = await instance.put<DefaultResponseType>('profile', {
            fullName: newName,
            lookingForAJob: true,
            LookingForAJobDescription: 'Yes',
            aboutMe: 'Hey0'
        })
        return res.data
    },
    async getStatus(uID: number) {
        const res = await instance.get<string>(`profile/status/${uID}`)
        return res.data
    },
    async updateStatus(newStatus: string) {
        const res = await instance.put<DefaultResponseType>('profile/status', {status: newStatus})
        return res.data
    },
    async setAvatar (avatar:string) {
        const formData = new FormData()
        formData.append('image',avatar )
        const res = await instance.put('profile/photo', formData)
    }
}


