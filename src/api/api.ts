import axios from "axios";
import {
    AllDialogsResponseType,
    DefaultResponseType,
    MessageItemResponseType,
    ProfileUserResponseType,
    PropertiesLogin,
    ResponseAuth,
    ResponseLogin,
    ResponseUsersType,
    SendMessageResponseType,
    UserDialogResponseType
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

export const dialogsAPI = {
    async refreshDialog(uID: number) {
        const res = await instance.put<DefaultResponseType<{}>>(`dialogs/${uID}`);
        console.log(res.data)
        // return res
    },

    async getAllDialogs() {
        const res = await instance.get<AllDialogsResponseType>('dialogs');
        console.log(res.data[0].id)
        // return res
    },

    async getUserDialog(uID: number, page: number, count: number) {
        const res = await instance.get<Omit<DefaultResponseType, 'data'> & UserDialogResponseType>(`dialogs/${uID}/messages?page=${page}&count=${count}`);
        console.log(res.data.items)
        // return res
    },

    async sendMessage(uID: number, message: string) {
        const res = await instance.post<DefaultResponseType<SendMessageResponseType>>(`dialogs/${uID}/messages`, {body: message})
        console.log(res.data.data.message.senderName)
    },

    async checkIsViewedMessage(messageID: string) {
        const res = await instance.get<boolean>(`dialogs/messages/${messageID}/viewed`)
        console.log(res.data)
    },

    async spamMessage(messageID: string) {
        const res = await instance.post<DefaultResponseType<{}>>(`dialogs/messages/${messageID}/spam`)
        console.log(res)
    },

    async deleteMessage(messageID: string) {
        const res = await instance.delete<DefaultResponseType<{}>>(`dialogs/messages/${messageID}`)
        console.log(res.data)
    },

    async restoreMessage(messageID: string) {
        const res = await instance.put<DefaultResponseType<{}>>(`dialogs/messages/${messageID}/restore`)
        console.log(res)
    },

    async getNewestThanDateUserMessages(uID: number, data: string) {
        const res = await instance.get<MessageItemResponseType[]>(`dialogs/${uID}/messages/new?newerThen=${data}`)
        console.log(res.data)
    },

    async getCountNewMessages() {
        const res = await instance.get<number>('dialogs/messages/new/count')
        console.log(res.data)
    }

}

export const chatGroupAPI = {
    socket: null as null | WebSocket,

    createConnection() {
        this.socket = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    },

    destroyConnection() {
        this.socket?.close()
        this.socket = null
    },

    subscribe(onMessage: (data: GroupChatDataType[]) => void) {
        if (!this.socket) return

        this.socket.onmessage = (event) => {
            onMessage(JSON.parse(event.data));
        };
    },

    sendMessage(message: string) {
        this.socket?.send(message)
    }


}

