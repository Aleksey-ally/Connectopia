import React, {ChangeEvent, forwardRef, memo, useImperativeHandle, useRef} from "react";
import s from "./Chat.module.scss";
import {Avatar} from "components/Avatar";
import {TextField} from "components/TextField";
import {Button} from "components/Button";
import {Send} from "assets/icons";
import {DialogDataType, GroupChatDataType} from "redux/messagesReducer";
import {Close} from "assets/icons/Close";

type PropsType = {
    dialogData?: DialogDataType[]
    chatData?: GroupChatDataType[]
    currentUserId: number | null
    messageText: string
    sendMessage: () => void
    dispatchNewTextInput?: (e: ChangeEvent<HTMLInputElement>) => void
    handleOnScroll: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void
    chatPhoto?: string | null
    chatName?: string
    setDisplayChat: (toggle: boolean) => void
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
                          }: PropsType, ref) => {

    const scrollableRef  = useRef<HTMLDivElement>(null)

    useImperativeHandle(ref, () => ({
        scrollIntoView: () => {
            if (scrollableRef .current) {
                scrollableRef .current.scrollIntoView({ behavior: 'smooth'});
            }
        }
    }));

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            sendMessage()
        }
    };

    return (
        <div className={s.chat}>
            <div className={s.chatHeader}>
                <Avatar className={`${s.chatAvatar} ${chatData && s.chatGroupAvatar}`} size={"small"}
                        photo={chatPhoto}/>
                <span className={s.chatName}>{chatName}</span>
                <Button variant={'secondary'} className={s.close} onClick={() => setDisplayChat(false)}>
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
                               placeholder={'Write your message'}
                               value={messageText}
                               onChange={dispatchNewTextInput}
                               onKeyDown={handleKeyDown}>
                    </TextField>
                    <Button className={s.button} onClick={sendMessage}><Send/></Button>
                </div>

            </div>

        </div>
    )
}))