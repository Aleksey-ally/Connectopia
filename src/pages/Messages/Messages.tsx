import React, {ChangeEvent, lazy, memo} from "react";
import s from 'pages/Messages/Messages.module.scss';
import {MessagesDataType} from "redux/messagesReducer";
import {withSuspense} from "utils/WithSuspense";
import {TextField} from "components/TextField";
import {TabSwitcher, TabSwitcherContent} from "components/TabSwitcher";
import {UserAvatar} from "components/UserAvatar";
import {UsersType} from "redux/usersReducer";
import {Button} from "components/Button";
import {Send} from "assets/icons";

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

    const UserItem = withSuspense(
        lazy(() =>
            import('../../components/UserItem')
                .then(module => ({default: module.UserItem}))
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
        <div className={s.messages}>
            <div className={s.sidebar}>
                <div className={s.search}>
                    <TextField placeholder={'Search conversation '} type={'text'} isSearch/>
                </div>

                <div className={s.tabs}>
                    <TabSwitcher tabs={tabs}>
                        <TabSwitcherContent value={'Messages'}>
                            Friend 1
                            Friend 2
                            Friend 3
                            Conversation
                            Groups
                        </TabSwitcherContent>
                        <TabSwitcherContent className={s.sidebarContent} value={'Friends'}>
                                {usersData.users.map(u => (
                                    <UserItem className={s.userItem} key={u.id} id={u.id} photos={u.photos} name={u.name} status={u.status} userAvatar={'small'} />
                                ))}
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
                    <div className={s.chatData} >
                        {messagesData.groupChatData.map((d, index) => {
                            return <div key={index} style={{display: 'flex', alignItems: 'center'}}>
                                <UserAvatar size={'small'} photos={d.photo}/>
                                <b>{d.userName}:</b> {d.message}
                            </div>
                        })}

                    </div>
                    <div className={s.sendMessageBar}>
                        <TextField type="text" value={messagesData.messageText}
                                   onChange={onChangeMessageTextHandler}
                                   onKeyDown={handleKeyDown}>
                        </TextField>
                        <Button className={s.button} onClick={sendMessage}><Send/></Button>
                    </div>

                </div>

            </div>
        </div>
    )
})