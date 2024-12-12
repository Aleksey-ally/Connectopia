import {DefaultResponseType,} from "api/base-api.types";
import {instance} from "api/base-api";
import {
    AllDialogsResponseType,
    MessageItemResponseType,
    SendMessageResponseType,
    UserDialogResponseType
} from "./dialogs.types";

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
        console.log(res.data.data.message)
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

