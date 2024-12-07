import React, {ChangeEvent, lazy, memo} from "react";
import s from 'pages/Messages/Messages.module.scss';
import {MessagesDataType} from "redux/messagesReducer";
import {withSuspense} from "utils/WithSuspense";
import {TextField} from "components/TextField";
import {TabSwitcher, TabSwitcherContent} from "components/TabSwitcher";
import {NavLink} from "react-router-dom";
import {UserAvatar} from "components/UserAvatar";
import {Typography} from "components/Typography";
import {UsersType} from "redux/usersReducer";
import {Button} from "components/Button";

type MessagesPropsType = {
    usersData: UsersType
    messagesData: MessagesDataType
    dispatchNewTextInput: (newText: string) => void
    sendMessage: () => void
}

export const Messages = memo(({
                                  usersData,
                                  messagesData,
                                  dispatchNewTextInput,
                                  sendMessage,
                              }: MessagesPropsType) => {


    const onChangeMessageTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
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

    const tabs = [
        {title: 'Messages', value: 'Messages'},
        {title: 'Friends', value: 'Friends'},
        {title: 'Groups', value: 'Groups'}
    ]

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            sendMessage()
        }
    };

    return (
        <div className={s.dialogs}>
            <div className={s.sidebar}>
                <div className={s.search}>
                    <TextField placeholder={'Search conversation '} type={'text'} isSearch/>
                </div>

                <div className={s.tabs}>
                    <TabSwitcher className={s.tabs} tabs={tabs}>
                        <TabSwitcherContent value={'Messages'}>
                            Friend 1
                            Friend 2
                            Friend 3
                            Conversation
                            Groups
                        </TabSwitcherContent>
                        <TabSwitcherContent value={'Friends'}>
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
                            </div>
                        </TabSwitcherContent>
                        <TabSwitcherContent value={'Groups'}>
                            <div className={s.groups}>
                                Groups
                            </div>
                        </TabSwitcherContent>
                    </TabSwitcher>
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
                    <div style={{
                        width: '96rem',
                        height: '31.25rem',
                        border: '15px solid black',
                        overflowY: 'scroll'
                    }}>
                        {messagesData.groupChatData.map((d, index) => {
                            return <div key={index} style={{display: 'flex', alignItems: 'center'}}>
                                <UserAvatar size={'small'} photos={d.photo}/>
                                <b>{d.userName}:</b> {d.message}
                            </div>
                        })}

                    </div>
                    <TextField type="text" value={messagesData.messageText}
                               onChange={onChangeMessageTextHandler}
                    onKeyDown={handleKeyDown}>
                    </TextField>
                    <Button onClick={sendMessage}>Send</Button>
                </div>

            </div>
        </div>
    )
})