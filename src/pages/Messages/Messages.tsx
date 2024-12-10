import React, {ChangeEvent, memo, RefObject} from "react";
import s from 'pages/Messages/Messages.module.scss';
import {MessagesDataType} from "redux/messagesReducer";
import {TextField} from "components/TextField";
import {TabSwitcher, TabSwitcherContent} from "components/TabSwitcher";
import {Avatar} from "components/Avatar";
import {UsersType} from "redux/usersReducer";
import {Button} from "components/Button";
import {Send} from "assets/icons";
import {UserItem} from "components/UserItem";
import IN from 'assets/imgs/IN.png'
import {Typography} from "components/Typography";

type MessagesPropsType = {
    usersData: UsersType
    messagesData: MessagesDataType
    dispatchNewTextInput: (newText: string) => void
    sendMessage: () => void
    currentUserId: number | null
    displayGroupChat: boolean
    setDisplayGroupChat: (toggle: boolean) => void
    messagesAnchorRef: RefObject<HTMLDivElement>
    lastScrollTop: number
    setLastScrollTop: (value: number) => void
    setIsAutoScrollActive: (value: boolean) => void
}

export const Messages = memo(({
                                  usersData,
                                  messagesData,
                                  dispatchNewTextInput,
                                  sendMessage,
                                  currentUserId,
                                  displayGroupChat,
                                  setDisplayGroupChat,
                                  messagesAnchorRef,
                                  lastScrollTop,
                                  setLastScrollTop,
                                  setIsAutoScrollActive
                              }: MessagesPropsType) => {


    const onChangeMessageTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatchNewTextInput(e.currentTarget.value)
    }

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
                            {usersData.friends.map(u => (
                                <UserItem className={s.userItem} key={u.id} id={u.id} photos={u.photos} name={u.name}
                                          status={u.status} userAvatar={'small'}/>
                            ))}
                        </TabSwitcherContent>
                        <TabSwitcherContent className={s.sidebarContent} value={'Groups'}>
                            {<div className={s.groupItem} onClick={() => setDisplayGroupChat(true)}>
                                <div className={s.groupInfo}>
                                    <Avatar className={s.groupAvatar} size={'small'} photos={IN}/>
                                    <div className={s.description}>
                                        <Typography className={`${s.item} ${s.name}`} as={'h5'}
                                                    variant={'h5'}>IT-Incubator Chat</Typography>
                                    </div>
                                </div>
                            </div>}
                        </TabSwitcherContent>
                    </TabSwitcher>
                </div>

                <div className={s.sidebarFooter}>
                    Current user avatar, settings
                </div>
            </div>
            {displayGroupChat && <div className={s.chat}>
                <div className={s.chatHeader}>
                    chatHeader
                </div>
                <div className={s.chatContent}>
                    <div className={s.chatData}
                         onScroll={handleOnScroll}>
                        {messagesData.groupChatData.map((d, index) => {
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
                                   value={messagesData.messageText}
                                   onChange={onChangeMessageTextHandler}
                                   onKeyDown={handleKeyDown}>
                        </TextField>
                        <Button className={s.button} onClick={sendMessage}><Send/></Button>
                    </div>

                </div>

            </div>}
        </div>
    )
})