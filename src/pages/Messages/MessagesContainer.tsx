import {useSelector} from "react-redux";
import {
    changeMessageText,
    createConnectionGroupChat,
    destroyConnectionGroupChat,
    MessagesDataType,
    sendMessageChat
} from "redux/messagesReducer";
import {ReducersType, useAppDispatch} from "redux/reduxStore";
import {Messages} from "./Messages";
import {UsersType} from "redux/usersReducer";


export const MessagesContainer = () => {
    const messagesData = useSelector<ReducersType, MessagesDataType>(state => state.messagesData)
    const usersData = useSelector<ReducersType, UsersType>(state => state.usersData)

    const dispatch = useAppDispatch()

    const dispatchNewTextInput = (newText: string) => {
        dispatch(changeMessageText(newText))
    }
    const sendMessageChatHandler = () => {
        dispatch(sendMessageChat(messagesData.messageText))
    }

    const createConnectionGroupChatHandler = () => {
        dispatch(createConnectionGroupChat())
    }

    const destroyConnectionGroupChatHandler = () => {
        dispatch(destroyConnectionGroupChat)
    }


    return <Messages usersData={usersData} messagesData={messagesData} dispatchNewTextInput={dispatchNewTextInput}
                     sendMessage={sendMessageChatHandler} createConnectionGroupChat={createConnectionGroupChatHandler}
                     destroyConnectionGroupChat={destroyConnectionGroupChatHandler}/>
}