import {useSelector} from "react-redux";
import {
    changeMessageText,
    createConnectionGroupChat,
    destroyConnectionGroupChat, getDialogData,
    MessagesDataType,
    sendMessageChat
} from "redux/messagesReducer";
import {ReducersType, useAppDispatch} from "redux/reduxStore";
import {Messages} from "./Messages";
import {getUsers, UsersType} from "redux/usersReducer";
import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {toast} from "react-toastify";
import {errorOptions} from "utils/ToastifyOptions/ToastifyOptions";
import {dialogsAPI} from "api/dialogs/dialogs.api";

export type DataActiveUserDialogType = {
    name: string, photo?: string | null
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
    const [lastScrollTop, setLastScrollTop] = useState<number>(0)
    const [dataActiveUserDialog, setDataActiveUserDialog] = useState<DataActiveUserDialogType>()

    const messagesAnchorRef = useRef<HTMLDivElement>(null)

    const dispatchNewTextInput = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeMessageText(e.currentTarget.value))
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

    const handleOnScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        const maxScrollPosition = element.scrollHeight - element.clientHeight

        if (element.scrollTop > lastScrollTop && Math.abs(maxScrollPosition - element.scrollTop) < 10) {
            setIsAutoScrollActive(true)
        } else {
            setIsAutoScrollActive(false)
        }

        setLastScrollTop(element.scrollTop)
    }

    const handleDisplayFriends = (value: string) => {
        if (value === 'Friends') {
            setDisplayFriends(true)
        }
        return
    }

    const handleGetDialogData = (uID: number, page: number, count: number, name: string, photo: string | null) => {
        dispatch(getDialogData(uID, page, count))
            .then(()=>{
                setDisplayGroupChat(false)
                setDataActiveUserDialog({name, photo})
                setDisplayUserChat(true)
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
            destroyConnectionGroupChatHandler()
        }
    }, [displayGroupChat])

    useEffect(() => {
        if (isAutoScrollActive) {
            messagesAnchorRef.current?.scrollIntoView({behavior: "smooth"})
        }
    }, [messagesData.groupChatData]);

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

    return <Messages usersData={usersData} messagesData={messagesData} dispatchNewTextInput={dispatchNewTextInput}
                     sendMessage={sendMessageChatHandler} currentUserId={currentUserId}
                     displayGroupChat={displayGroupChat} setDisplayGroupChat={setDisplayGroupChat}
                     messagesAnchorRef={messagesAnchorRef} handleOnScroll={handleOnScroll}
                     handleDisplayFriends={handleDisplayFriends} handleGetDialogData={handleGetDialogData}
                     dataActiveUserDialog={dataActiveUserDialog} displayUserChat={displayUserChat}
                     setDisplayUserChat={setDisplayUserChat}
    />
}