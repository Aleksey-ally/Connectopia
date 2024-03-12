import React, {ChangeEvent, lazy, memo} from "react";
import s from './Messages.module.css';
import {MessagesDataType} from "redux/messagesReducer";
import {withSuspense} from "utils/WithSuspense";

type MessagesPropsType = {
    messagesData: MessagesDataType
    dispatchNewTextInput: (newText: string) => void
    addMessage: () => void
}

export const Messages = memo(({messagesData, dispatchNewTextInput, addMessage}: MessagesPropsType) => {
    const onChangeMessageTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatchNewTextInput(e.currentTarget.value)
    }

    const DialogUser = withSuspense(
        lazy(() =>
            import('./DialogUser')
                .then(module => ({default: module.DialogUser}))
        ));

    const UserMessage = withSuspense(
        lazy(() =>
            import('./UserMessage')
                .then(module => ({default: module.UserMessage}))
        ));

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
})