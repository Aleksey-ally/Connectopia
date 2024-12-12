import {DefaultResponseType} from "api/base-api.types";
import {instance} from "api/base-api";
import {ProfileUserResponseType} from "./profile.types";

export const profileAPI = {
    async getProfile(uID: number) {
        const res = await instance.get<ProfileUserResponseType>(`profile/${uID}`)
        return res.data
    },
    async updateProfileName(newName: string) {
        const res = await instance.put<DefaultResponseType>('profile', {
            fullName: newName,
            lookingForAJob: true,
            LookingForAJobDescription: 'Yes',
            aboutMe: 'Hey0'
        })
        return res.data
    },
    async updateProfile(userData: ProfileUserResponseType) {
        const res = await instance.put<DefaultResponseType>('profile', userData)
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
    async updateAvatar(photos: File) {
        if (photos) {
            const formData = new FormData()
            formData.append('photos', photos)
            const res = await instance.put('profile/photo', formData)
            return res.data
        }

    }
}
