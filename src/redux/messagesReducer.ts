import {chatGroupAPI} from "api/api";
import {Dispatch} from "redux";

const RECEIVED_DATA_GROUP_CHAT = "RECEIVED-DATA-GROUP-CHAT";
const ADD_MESSAGE = "ADD-MESSAGE";
const CHANGE_MESSAGE_TEXT = "CHANGE-MESSAGE-TEXT";

export type MessagesDataType = {
    messagesUsersData: UsersDataType[];
    messagesTextData: TextDataType[];
    messageText: string;
    groupChatData: GroupChatDataType[]
};

export type GroupChatDataType = {
    userId: number;
    userName: string;
    message: string;
    photo: string;
}

export type UsersDataType = {
    id: number;
    animalName: string;
    photoAvatar: string;
};

export type TextDataType = {
    id: number;
    messageText: string;
};

const initialState: MessagesDataType = {
    messagesUsersData: [],

    messagesTextData: [
        {id: 1, messageText: "Frrr fr fr"},
    ],

    groupChatData: [],

    messageText: "",
};

export type ActionType =
    | ChangeMessageTextType
    | AddMessageType
    | ReceivedGroupChatData;

export const messagesReducer = (state = initialState, action: ActionType): MessagesDataType => {

    switch (action.type) {

        case RECEIVED_DATA_GROUP_CHAT :
            return {...state, groupChatData: [...action.data]};

        case CHANGE_MESSAGE_TEXT:
            return {...state, messageText: action.payload.newText};

        case ADD_MESSAGE:
            if (state.messageText.trim() !== "") {
                return {
                    ...state,
                    messagesTextData: [
                        ...state.messagesTextData,
                        {
                            id: state.messagesTextData.length + 1,
                            messageText: state.messageText,
                        },
                    ],
                    messageText: "",
                };
            }

            return state;

        default:
            return state;
    }
};

type ReceivedGroupChatData = ReturnType<typeof receivedGroupChatData>;
type AddMessageType = ReturnType<typeof addMessage>;
type ChangeMessageTextType = ReturnType<typeof changeMessageText>;

export const receivedGroupChatData = (data: GroupChatDataType[]) => ({type: RECEIVED_DATA_GROUP_CHAT, data} as const)

export const createConnectionGroupChat = () => (dispatch: Dispatch) => {
    chatGroupAPI.createConnection()

    chatGroupAPI.subscribe((data) => {
        dispatch(receivedGroupChatData(data))
    })
}

export const destroyConnectionGroupChat = () => {
    chatGroupAPI.destroyConnection()
}

export const addMessage = () => ({type: ADD_MESSAGE} as const);

export const changeMessageText = (newText: string) =>
    ({
        type: CHANGE_MESSAGE_TEXT,
        payload: {
            newText,
        },
    } as const);
