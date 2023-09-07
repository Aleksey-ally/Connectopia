import React, {ChangeEvent} from "react";
import {DialogUser} from './DialogUser/DialogUser';
import s from './Messages.module.css';
import {UserMessage} from './UserMessage/UserMessage';
import {MessagesDataType} from "../../redux/messagesReducer";

type MessagesPropsType = {
    messagesData: MessagesDataType
    dispatchNewTextInput: (newText: string) => void
    addMessage: () => void
}
export const Messages = ({messagesData, dispatchNewTextInput, addMessage}: MessagesPropsType) => {
    const onChangeMessageTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatchNewTextInput(e.currentTarget.value)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {messagesData.messagesUsersData.map(u => <DialogUser key={u.id} id={u.id} animalName={u.animalName}
                                                                     photoAvatar={u.photoAvatar}/>)}
            </div>
            <div className={s.messages}>
                {messagesData.messagesTextData.map(m => <UserMessage key={m.id} id={m.id}
                                                                     messageText={m.messageText}/>)}
                <textarea onChange={onChangeMessageTextHandler} value={messagesData.messageText}
                          placeholder="Enter your message"/>
                <button onClick={addMessage}>Sent message</button>
            </div>

        </div>
    )
}