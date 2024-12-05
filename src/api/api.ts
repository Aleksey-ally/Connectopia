import axios from "axios";
import {
    DefaultResponseType,
    ProfileUserResponseType,
    PropertiesLogin,
    ResponseAuth,
    ResponseLogin,
    ResponseUsersType
} from "api/api.types";
import {GroupChatDataType} from "redux/messagesReducer";

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

export const chatGroupAPI = {
    socket: null as null | WebSocket,

    createConnection() {
        this.socket = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    },

    destroyConnection() {
        this.socket?.close()
        console.log('socket closed')
    },

    subscribe(onMessage: (data: GroupChatDataType[]) => void) {
        if (!this.socket) return

        this.socket.onmessage = (event) => {
            onMessage(JSON.parse(event.data));
        };
    },

    sendMessage(message:string){
        this.socket?.send(message)
    }


}

