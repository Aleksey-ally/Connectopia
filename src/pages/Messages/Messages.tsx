import React, {ChangeEvent, lazy, memo} from "react";
import s from 'pages/Messages/Messages.module.scss';
import {MessagesDataType} from "redux/messagesReducer";
import {withSuspense} from "utils/WithSuspense";
import {TextField} from "components/TextField";
import {TabSwitcher} from "components/TabSwitcher";
import {NavLink} from "react-router-dom";
import {UserAvatar} from "components/UserAvatar";
import {Typography} from "components/Typography";
import {Button} from "components/Button";
import {UsersType} from "redux/usersReducer";

type MessagesPropsType = {
    usersData: UsersType
    messagesData: MessagesDataType
    dispatchNewTextInput: (newText: string) => void
    addMessage: () => void
}

export const Messages = memo(({usersData, messagesData, dispatchNewTextInput, addMessage}: MessagesPropsType) => {
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

    const tabs = [{title: 'Messages', value: 'Messages'},
        {title: 'Friends', value: 'Friends'},
        {title: 'Groups', value: 'Groups'}]

    return (
        <div className={s.dialogs}>
            <div className={s.sidebar}>
                <div className={s.search}>
                    <TextField placeholder={'Search conversation '} type={'text'} isSearch/>
                </div>

                <div className={s.tabs}>
                    <TabSwitcher tabs={tabs}/>
                </div>

                <div className={s.sidebarContent}>
                    {usersData.users.map(u => (
                        <div className={s.user} key={u.id}>
                            <div className={s.userInfo}>
                                <NavLink className={s.linkAvatar} to={`/profile/${u.id}`}>
                                    <UserAvatar size={'medium'} key={u.id} photos={u.photos.small}/>
                                </NavLink>
                                <div className={s.description}>
                                    <NavLink to={`/profile/${u.id}`}>
                                        <Typography className={`${s.item} ${s.name}`} as={'h5'}
                                                    variant={'h5'}>{u.name}</Typography>
                                    </NavLink>
                                    <Typography className={`${s.item} ${s.status}`} as={'span'}
                                                variant={'subtitle2'}>{u.status}</Typography>
                                </div>
                            </div>
                    </div>
                    ))}

                    Friend 1
                    Friend 2
                    Friend 3
                    Conversation
                    Groups
                </div>

                <div className={s.sidebarFooter}>
                    Current user avatar, settings
                </div>

            </div>
            <div className={s.chat}>
                <div className={s.chatHeader}>
                    chatHeader
                </div>
                <div className={s.chatContent}>
                    chatContent
                </div>
            </div>
            {/*<div className={s.dialogsItems}>*/}
            {/*    {messagesData.messagesUsersData.map(u => <DialogUser key={u.id} id={u.id} animalName={u.animalName}*/}
            {/*                                                         photoAvatar={u.photoAvatar}/>)}*/}
            {/*</div>*/}
            {/*<div className={s.messages}>*/}
            {/*    {messagesData.messagesTextData.map(m => <UserMessage key={m.id} id={m.id}*/}
            {/*                                                         messageText={m.messageText}/>)}*/}
            {/*    <textarea onChange={onChangeMessageTextHandler} value={messagesData.messageText}*/}
            {/*              placeholder="Enter your message"/>*/}
            {/*    <button onClick={addMessage}>Sent message</button>*/}
            {/*</div>*/}

        </div>
    )
})