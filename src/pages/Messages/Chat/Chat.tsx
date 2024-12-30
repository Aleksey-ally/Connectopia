import React, {forwardRef, memo, useImperativeHandle, useRef} from "react";
import s from "./Chat.module.scss";
import {Avatar} from "components/Avatar";
import {TextField} from "components/TextField";
import {Button} from "components/Button";
import {Send} from "assets/icons";
import {DialogDataType, GroupChatDataType} from "redux/messagesReducer";
import {Close} from "assets/icons/Close";
import {useTranslation} from "react-i18next";

type PropsType = {
    dialogData?: DialogDataType[]
    chatData?: GroupChatDataType[]
    currentUserId: number | null
    messageText: string
    sendMessage: SendMessageType
    dispatchNewTextInput?: (e: string) => void
    handleOnScroll: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void
    chatPhoto?: string | null
    chatName?: string
    setDisplayChat: () => void
    chatUserId?: number
}

export type SendMessageType = {
    (): void;
    (uID: number, message: string): void;
}


export const Chat = memo(forwardRef(({
                                         dialogData,
                                         chatData,
                                         currentUserId,
                                         messageText,
                                         sendMessage,
                                         dispatchNewTextInput,
                                         handleOnScroll,
                                         chatPhoto,
                                         chatName,
                                         setDisplayChat,
                                         chatUserId
                                     }: PropsType, ref) => {

    const scrollableRef = useRef<HTMLDivElement>(null)

    useImperativeHandle(ref, () => ({
        scrollIntoView: () => {
            if (scrollableRef.current) {
                scrollableRef.current.scrollIntoView({behavior: 'smooth'});
            }
        }
    }));

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            sendMessage()
        }
    };

    const {t} = useTranslation();

    return (
        <div className={s.chat}>
            <div className={s.chatHeader}>
                <Avatar className={`${s.chatAvatar} ${chatData && s.chatGroupAvatar}`} size={"small"}
                        photo={chatPhoto}/>
                <span className={s.chatName}>{chatName}</span>
                <Button variant={'secondary'} className={s.close} onClick={setDisplayChat}>
                    <Close/>
                </Button>
            </div>
            <div className={s.chatContent}>
                <div className={s.chatData}
                     onScroll={handleOnScroll}>

                    {chatData && chatData?.map((d, index) => {
                        return <div
                            className={`${s.messageItem} ${d.userId === currentUserId ? s.currentUser : ''}`}
                            key={index}>
                            <Avatar size={'small'} photo={d.photo}/>
                            <div className={s.messageWrapper}>
                                <span className={s.userName}>{d.userName}</span>
                                <span className={s.text}>{d.message}</span>
                            </div>
                        </div>
                    })}

                    {dialogData && dialogData?.map((d) => {
                        return <div
                            className={`${s.messageItem} ${d.senderId === currentUserId ? s.currentUser : ''}`}
                            key={d.id}>
                            <div className={s.messageWrapper}>
                                <span className={s.userName}>{d.senderName}</span>
                                <span className={s.text}>{d.body}</span>
                            </div>
                        </div>
                    })}

                    <div ref={scrollableRef}></div>
                </div>
                <div className={s.sendMessageBar}>
                    <TextField type="text"
                               placeholder={t('messagesPage.labelTyping')}
                               value={messageText}
                               onValueChange={dispatchNewTextInput}
                               onKeyDown={handleKeyDown}>
                    </TextField>
                    <Button className={s.button} onClick={() => sendMessage(chatUserId as number, messageText)}><Send/></Button>
                </div>

            </div>

        </div>
    )
}))