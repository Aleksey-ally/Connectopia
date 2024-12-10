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
import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {toast} from "react-toastify";
import {errorOptions} from "utils/ToastifyOptions/ToastifyOptions";


export const MessagesContainer = () => {
    const dispatch = useAppDispatch()

    const messagesData = useSelector<ReducersType, MessagesDataType>(state => state.messagesData)
    const usersData = useSelector<ReducersType, UsersType>(state => state.usersData)
    const currentUserId = useSelector<ReducersType, number | null>(state => state.auth.id)


    const [displayFriends, setDisplayFriends] = useState<boolean>(false)
    const [displayGroupChat, setDisplayGroupChat] = useState<boolean>(false)
    const [isAutoScrollActive, setIsAutoScrollActive] = useState<boolean>(true)
    const [lastScrollTop, setLastScrollTop] = useState<number>(0)

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

        return () => {
            destroyConnectionGroupChatHandler()
        }
    }, [displayGroupChat])

    useEffect(() => {
        if (isAutoScrollActive) {
            messagesAnchorRef.current?.scrollIntoView({behavior: "smooth"})
        }
    }, [messagesData.groupChatData]);


    return <Messages usersData={usersData} messagesData={messagesData} dispatchNewTextInput={dispatchNewTextInput}
                     sendMessage={sendMessageChatHandler} currentUserId={currentUserId}
                     displayGroupChat={displayGroupChat} setDisplayGroupChat={setDisplayGroupChat}
                     messagesAnchorRef={messagesAnchorRef} handleOnScroll={handleOnScroll}
                     handleDisplayFriends={handleDisplayFriends}/>
}