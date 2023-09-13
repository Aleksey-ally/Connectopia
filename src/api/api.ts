import axios from "axios";
import { UserType } from "redux/usersReducer";

type BaseResponseType<D = {}> = {
    data: D;
};

type ResponseUsersType = {
    items: UserType[]
    totalCount: number
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
            .then((res) => res.data)
    }
}

export const authAPI = {
    auth(){
        return instance.get<ResponseAuth>('auth/me')
        .then(res=>res.data)
    }
}
