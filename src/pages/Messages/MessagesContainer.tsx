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
import {getUsers, UsersType} from "redux/usersReducer";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {errorOptions} from "utils/ToastifyOptions/ToastifyOptions";


export const MessagesContainer = () => {
    const messagesData = useSelector<ReducersType, MessagesDataType>(state => state.messagesData)
    const usersData = useSelector<ReducersType, UsersType>(state => state.usersData)
    const currentUserId = useSelector<ReducersType, number | null>(state => state.auth.id)

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
        dispatch(destroyConnectionGroupChat())
    }

    useEffect(() => {

        (async () => {
            try {
                createConnectionGroupChatHandler()
                await dispatch(getUsers(usersData.pageSize, usersData.currentPage, true))

            } catch {
                toast.error('Error when receiving messages data', errorOptions)
            }
        })()

        return () => {
            destroyConnectionGroupChatHandler()
        }
    }, [])


    return <Messages usersData={usersData} messagesData={messagesData} dispatchNewTextInput={dispatchNewTextInput}
                     sendMessage={sendMessageChatHandler} currentUserId={currentUserId}/>
}