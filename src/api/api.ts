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
    me() {
        return instance.get<ResponseAuth>('auth/me')
            .then(res => res.data)
    },
    login(payload : PropertiesLogin){
        return instance.post<DefaultResponseType<ResponseLogin>>('auth/login',{...payload})
            .then(res=>res.data)
    }
}

export const usersAPI = {
    getUsers(pageSize: number, currentPage: number) {
        return instance.get<ResponseUsersType>(`users?count=${pageSize}&page=${currentPage}`)
            .then(res => res.data)
    },
    follow(uID: number) {
        return instance.post<DefaultResponseType>(`follow/${uID}`)
            .then(res => res.data)
    },
    unFollow(uID: number) {
        return instance.delete<DefaultResponseType>(`follow/${uID}`)
            .then(res => res.data)
    }
}


export const profileAPI = {
    getProfile(uID: number) {
        return instance.get<ProfileUserResponseType>(`profile/${uID}`)
            .then(res => res.data)
    },
    updateProfile(newName: string) {
        return instance.put<DefaultResponseType>('profile', {
            fullName: newName,
            lookingForAJob: true,
            LookingForAJobDescription: 'Yes',
            aboutMe: 'Hey0'
        })
            .then(res => res.data)
    },
    getStatus(uID: number) {
        return instance.get<string>(`profile/status/${uID}`)
            .then(res => res.data)
    },
    updateStatus(newStatus: string) {
        return instance.put<DefaultResponseType>('profile/status', {status: newStatus})
            .then(res => res.data)
    }


}



