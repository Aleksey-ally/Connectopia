import {chatGroupAPI} from "api/chat-group/chat-group.api";
import {Dispatch} from "redux";
import {dialogsAPI} from "api/dialogs/dialogs.api";

const RECEIVED_DATA_GROUP_CHAT = "RECEIVED-DATA-GROUP-CHAT";
const DELETED_DATA_GROUP_CHAT = "DELETED-DATA-GROUP-CHAT";
const ADD_MESSAGE_DIALOG = "ADD-MESSAGE-DIALOG";
const ADD_MESSAGE_GROUP = "ADD-MESSAGE-GROUP";
const CHANGE_MESSAGE_TEXT_DIALOG = "CHANGE-MESSAGE-TEXT-DIALOG";
const CHANGE_MESSAGE_TEXT_GROUP = "CHANGE-MESSAGE-TEXT-GROUP";
const RECEIVED_DIALOGS_DATA = "RECEIVED-DIALOGS-DATA";

export type MessagesDataType = {
    dialogsData: DialogDataType[];
    groupChatData: GroupChatDataType[]
    messageTextDialog: string;
    messageTextGroup: string;
};

export type GroupChatDataType = {
    userId: number;
    userName: string;
    message: string;
    photo: string;
}

export type DialogDataType = {
    id: string;
    body: string;
    addedAt: string;
    senderId: number;
    senderName: string;
    recipientId: number;
    viewed: boolean;
};

const initialState: MessagesDataType = {
    dialogsData: [],
    groupChatData: [],
    messageTextDialog: "",
    messageTextGroup: ""
};

export type ActionType =
    | ChangeMessageTextDialogType
    | AddMessageDialogType
    | ReceivedGroupChatData
    | DeletedGroupChatData
    | ReceivedDialogsData
    | ChangeMessageTextGroupType
    | AddMessageGroupType

export const messagesReducer = (state = initialState, action: ActionType): MessagesDataType => {

    switch (action.type) {

        case RECEIVED_DIALOGS_DATA:
            return {...state, dialogsData: action.data}

        case RECEIVED_DATA_GROUP_CHAT :
            return {...state, groupChatData: [...state.groupChatData, ...action.data]};

        case DELETED_DATA_GROUP_CHAT :
            return {...state, groupChatData: []}

        case CHANGE_MESSAGE_TEXT_DIALOG:
            return {...state, messageTextDialog: action.newText}

        case CHANGE_MESSAGE_TEXT_GROUP:
            return {...state, messageTextGroup: action.newText}

        case ADD_MESSAGE_DIALOG:
            if (state.messageTextDialog.trim() !== "") {
                return {
                    ...state, messageTextDialog: "",
                }
            }
            return state

        case ADD_MESSAGE_GROUP:
            if (state.messageTextGroup.trim() !== "") {
                return {
                    ...state, messageTextGroup: "",
                }
            }
            return state
        default:
            return state;
    }
};

type ReceivedGroupChatData = ReturnType<typeof receivedGroupChatData>;
type DeletedGroupChatData = ReturnType<typeof deletedGroupChatData>;
type AddMessageDialogType = ReturnType<typeof addMessageDialog>;
type AddMessageGroupType = ReturnType<typeof addMessageGroup>;
type ChangeMessageTextDialogType = ReturnType<typeof changeMessageTextDialog>;
type ChangeMessageTextGroupType = ReturnType<typeof changeMessageTextGroup>;
type ReceivedDialogsData = ReturnType<typeof receivedDialogsData>;


//AC
export const receivedGroupChatData = (data: GroupChatDataType[]) =>
    ({
        type: RECEIVED_DATA_GROUP_CHAT,
        data
    } as const)

export const deletedGroupChatData = () =>
    ({
        type: DELETED_DATA_GROUP_CHAT
    } as const)

export const receivedDialogsData = (data: DialogDataType[]) =>
    ({
        type: RECEIVED_DIALOGS_DATA,
        data
    } as const)

export const addMessageDialog = () => ({type: ADD_MESSAGE_DIALOG} as const);
export const addMessageGroup = () => ({type: ADD_MESSAGE_GROUP} as const);

export const changeMessageTextDialog = (newText: string) =>
    ({
        type: CHANGE_MESSAGE_TEXT_DIALOG,
        newText,
    } as const);

export const changeMessageTextGroup = (newText: string) =>
    ({
        type: CHANGE_MESSAGE_TEXT_GROUP,
        newText,
    } as const);


//Thunks
export const getDialogData = (uID: number, page: number, count: number) => async (dispatch: Dispatch) => {
    const res = await dialogsAPI.getUserDialog(uID, page, count)
    dispatch(receivedDialogsData(res))
}

export const createConnectionGroupChat = () => (dispatch: Dispatch) => {
    chatGroupAPI.createConnection()

    chatGroupAPI.subscribe((data) => {
        dispatch(receivedGroupChatData(data))
    })
}

export const destroyConnectionGroupChat = () => (dispatch: Dispatch) => {
    chatGroupAPI.destroyConnection()
    dispatch(deletedGroupChatData())

}

export const sendMessageGroupChat = (message: string) => (dispatch: Dispatch) => {
    if (message.trim().length < 1) return
    chatGroupAPI.sendMessage(message)
    dispatch(addMessageGroup())
}