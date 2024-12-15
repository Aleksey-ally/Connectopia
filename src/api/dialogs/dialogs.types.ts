export type AllDialogsResponseType = {
    id: number;
    userName: string;
    hasNewMessages: boolean;
    lastDialogActivityDate: string;
    lastUserActivityDate: string;
    newMessagesCount: number;
    photos: AllDialogsResponsePhotosType;
}[]

export type AllDialogsResponsePhotosType = {
    small: string | null;
    large: string | null;
}

export type SendMessageResponseType = {
    message: MessageItemResponseType[]
}

export type MessageItemResponseType = {
    id: string;
    body: string;
    translatedBody?: any;
    addedAt: string;
    senderId: number;
    senderName: string;
    recipientId: number;
    recipientName: string;
    viewed: boolean;
    deletedBySender: boolean;
    deletedByRecipient: boolean;
    isSpam: boolean;
    distributionId?: any;
}

export type UserDialogResponseType = {
    items: [{
        id: string;
        body: string;
        addedAt: string;
        senderId: number;
        senderName: string;
        recipientId: number;
        viewed: boolean;
    }]
}