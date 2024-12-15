import {useSelector} from "react-redux";
import {
    changeMessageTextDialog,
    changeMessageTextGroup,
    createConnectionGroupChat,
    destroyConnectionGroupChat,
    getAllDialogs,
    getDialogData,
    MessagesDataType,
    sendMessageDialog,
    sendMessageGroupChat
} from "redux/messagesReducer";
import {ReducersType, useAppDispatch} from "redux/reduxStore";
import {Messages} from "./Messages";
import {getUsers, UsersType} from "redux/usersReducer";
import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {toast} from "react-toastify";
import {errorOptions} from "utils/ToastifyOptions/ToastifyOptions";

export type DataActiveUserDialogType = {
    uID: number, name: string, photo?: string | null
}

export const MessagesContainer = () => {
    const dispatch = useAppDispatch()

    const messagesData = useSelector<ReducersType, MessagesDataType>(state => state.messagesData)
    const usersData = useSelector<ReducersType, UsersType>(state => state.usersData)
    const currentUserId = useSelector<ReducersType, number | null>(state => state.auth.id)

    const [displayFriends, setDisplayFriends] = useState<boolean>(false)
    const [displayGroupChat, setDisplayGroupChat] = useState<boolean>(false)
    const [displayUserChat, setDisplayUserChat] = useState<boolean>(false)
    const [isAutoScrollActive, setIsAutoScrollActive] = useState<boolean>(true)
    const [dataActiveUserDialog, setDataActiveUserDialog] = useState<DataActiveUserDialogType>()

    const messagesAnchorRef = useRef<HTMLDivElement>(null)

    const dispatchNewTextDialog = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeMessageTextDialog(e.currentTarget.value))
    }

    const sendMessageDialogHandler = (uID: number, message: string) => {
        dispatch(sendMessageDialog(uID, message))
            .catch(() => {
                toast.error('Error when sending message', errorOptions)
            })
    }

    const dispatchNewTextGroup = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeMessageTextGroup(e.currentTarget.value))
    }
    const sendMessageGroupChatHandler = () => {
        dispatch(sendMessageGroupChat(messagesData.messageTextGroup))
    }

    const createConnectionGroupChatHandler = () => {
        dispatch(createConnectionGroupChat())
    }

    const handleOnScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget;
        const maxScrollPosition = element.scrollHeight - element.clientHeight;

        // Проверяем, находится ли пользователь у нижней границы скролла
        const isNearBottom = Math.abs(maxScrollPosition - element.scrollTop) < 10;

        if (isNearBottom) {
            setIsAutoScrollActive(true); // Включаем автоскролл, если пользователь у конца
        } else {
            setIsAutoScrollActive(false); // Отключаем, если пользователь прокручивает вверх
        }
    }

    const handleGetDialogData = (uID: number, page: number, count: number, name: string, photo: string | null) => {
        setIsAutoScrollActive(false)
        setDisplayGroupChat(false)

        dispatch(getDialogData(uID, page, count))
            .then(() => {
                setDataActiveUserDialog({uID, name, photo})
                setDisplayUserChat(true)
                setIsAutoScrollActive(true)
            })

    }

    useEffect(() => {
        if (!displayFriends) return
        (async () => {
            try {
                await dispatch(getUsers(usersData.pageSize, usersData.currentPage, true))
            } catch {
                toast.error('Error when receiving messages data', errorOptions)
            }
        })()
    }, [displayFriends]);

    useEffect(() => {
        if (!displayGroupChat) return

        (async () => {
            try {
                createConnectionGroupChatHandler()

            } catch {
                toast.error('Error when receiving messages data', errorOptions)
            }
        })()
        setDisplayUserChat(false)

        return () => {
            dispatch(destroyConnectionGroupChat())
        }
    }, [displayGroupChat])

    useEffect(() => {
        (async ()=>{
            try{
                await dispatch(getAllDialogs())
            } catch {
                toast.error('Error when receiving all dialogs data', errorOptions)
            }
        })()
    }, []);

    useEffect(() => {
        if (isAutoScrollActive) {
            messagesAnchorRef.current?.scrollIntoView()
        }
    }, [isAutoScrollActive, messagesData.groupChatData, messagesData.dialogsData]);

    useEffect(() => {
        // dialogsAPI.refreshDialog(2)
        // dialogsAPI.getAllDialogs()
        // dialogsAPI.getUserDialog(2,1, 10)
        // dialogsAPI.sendMessage(2, 'Hello')
        // dialogsAPI.checkIsViewedMessage('3a625288-c91c-420b-b907-f1a0f55cef40')
        // dialogsAPI.spamMessage("3a625288-c91c-420b-b907-f1a0f55cef40")
        // dialogsAPI.deleteMessage('4d2328cb-d28a-4b38-82ba-a6d2a211f4c4')
        // dialogsAPI.restoreMessage('4d2328cb-d28a-4b38-82ba-a6d2a211f4c4')
        // const dialogsAPI = new Date().toLocaleString('ru-Ru')
        //  dialogsAPI.getNewestThanDateUserMessages(2, "2024-12-10T08:55:02.873")
        //  dialogsAPI.getCountNewMessages()

    }, []);

    return <Messages ref={messagesAnchorRef} usersData={usersData} messagesData={messagesData}
                     dispatchNewTextGroup={dispatchNewTextGroup}
                     sendMessageGroupChat={sendMessageGroupChatHandler} currentUserId={currentUserId}
                     displayGroupChat={displayGroupChat} setDisplayGroupChat={setDisplayGroupChat}
                     handleOnScroll={handleOnScroll}
                     setDisplayFriends={setDisplayFriends} handleGetDialogData={handleGetDialogData}
                     dataActiveUserDialog={dataActiveUserDialog} displayUserChat={displayUserChat}
                     setDisplayUserChat={setDisplayUserChat} dispatchNewTextDialog={dispatchNewTextDialog}
                     sendMessageDialog={sendMessageDialogHandler}
    />
}