import {DefaultResponseType} from "api/base-api.types";
import {instance} from "api/base-api";
import {ResponseUsersType} from "./users.types";

export const usersAPI = {
    async getUsers(pageSize: number, currentPage: number, friend?: boolean, term?: string) {
        const res = await instance.get<ResponseUsersType>(`users?count=${pageSize}&page=${currentPage}&friend=${friend}`)
        return res.data
    },
    async follow(uID: number) {
        const res = await instance.post<DefaultResponseType>(`follow/${uID}`)
        return res.data
    },
    async unFollow(uID: number) {
        const res = await instance.delete<DefaultResponseType>(`follow/${uID}`)
        return res.data
    },
    async checkFollowed(uID: number) {
        const res = await instance.get<boolean>(`follow/${uID}`)
        return res.data
    }
}
