const ADD_MESSAGE = "ADD-MESSAGE";
const CHANGE_MESSAGE_TEXT = "CHANGE-MESSAGE-TEXT";

export type MessagesDataType = {
    messagesUsersData: UsersDataType[];
    messagesTextData: TextDataType[];
    messageText: string;
};

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
    messagesUsersData: [

    ],

    messagesTextData: [
        {id: 1, messageText: "Frrr fr fr"},
    ],

    messageText: "",
};

export type ActionType =
    | ChangeMessageTextType
    | AddMessageType;

export const messagesReducer = (state = initialState, action: ActionType): MessagesDataType => {

    switch (action.type) {
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

type AddMessageType = ReturnType<typeof addMessage>;
type ChangeMessageTextType = ReturnType<typeof changeMessageText>;

export const addMessage = () => ({type: ADD_MESSAGE} as const);

export const changeMessageText = (newText: string) =>
    ({
        type: CHANGE_MESSAGE_TEXT,
        payload: {
            newText,
        },
    } as const);
