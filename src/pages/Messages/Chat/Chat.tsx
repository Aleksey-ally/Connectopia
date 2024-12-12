import React, {ChangeEvent, memo} from "react";
import s from "./Chat.module.scss";
import {Avatar} from "components/Avatar";
import {TextField} from "components/TextField";
import {Button} from "components/Button";
import {Send} from "assets/icons";
import {GroupChatDataType} from "redux/messagesReducer";

type PropsType = {
    chatData: GroupChatDataType[]
    currentUserId: number | null
    messagesAnchorRef: React.RefObject<HTMLDivElement>
    messageText: string
    sendMessage: () => void
    dispatchNewTextInput: (e: ChangeEvent<HTMLInputElement>) => void
    handleOnScroll: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void
}


export const Chat = memo(({
                              chatData, currentUserId, messagesAnchorRef, messageText, sendMessage, dispatchNewTextInput, handleOnScroll
                          }: PropsType) => {

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            sendMessage()
        }
    };

    return (
        <div className={s.chat}>
            <div className={s.chatHeader}>
                chatHeader
            </div>
            <div className={s.chatContent}>
                <div className={s.chatData}
                     onScroll={handleOnScroll}>
                    {chatData.map((d, index) => {
                        return <div
                            className={`${s.messageItem} ${d.userId === currentUserId ? s.currentUser : ''}`}
                            key={index}>
                            <Avatar size={'small'} photos={d.photo}/>
                            <div className={s.messageWrapper}>
                                <span className={s.userName}>{d.userName}</span>
                                <span className={s.text}>{d.message}</span>
                            </div>
                        </div>
                    })}
                    <div ref={messagesAnchorRef}></div>
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
})