import React, {ChangeEvent} from "react";
import {DialogUser} from './DialogUser/DialogUser';
import s from './Messages.module.css';
import {UserMessage} from './UserMessage/UserMessage';
import {MessagesDataType} from "redux/messagesReducer";
import {Navigate} from "react-router-dom";

type MessagesPropsType = {
    messagesData: MessagesDataType
    dispatchNewTextInput: (newText: string) => void
    addMessage: () => void
    isAuth:boolean
}
export const Messages = ({messagesData, dispatchNewTextInput, addMessage, isAuth}: MessagesPropsType) => {
    const onChangeMessageTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatchNewTextInput(e.currentTarget.value)
    }
   debugger
    if (!isAuth) return <Navigate to={'/login'}/>

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