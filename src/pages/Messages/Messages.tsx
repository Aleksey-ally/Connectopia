import React, {ChangeEvent, forwardRef, memo} from "react";
import s from 'pages/Messages/Messages.module.scss';
import {MessagesDataType} from "redux/messagesReducer";
import {TextField} from "components/TextField";
import {TabSwitcher, TabSwitcherContent} from "components/TabSwitcher";
import {Avatar} from "components/Avatar";
import {UsersType} from "redux/usersReducer";
import {UserItem} from "components/UserItem";
import IN from 'assets/imgs/IN.png'
import {Typography} from "components/Typography";
import {Chat, SendMessageType} from "./Chat";
import {DataActiveUserDialogType} from "pages/Messages/MessagesContainer";

type MessagesPropsType = {
    usersData: UsersType
    messagesData: MessagesDataType
    dispatchNewTextGroup?: (e: ChangeEvent<HTMLInputElement>) => void
    dispatchNewTextDialog?: (e: ChangeEvent<HTMLInputElement>) => void
    sendMessageGroupChat: () => void
    sendMessageDialog: (uID: number, message: string) => void
    currentUserId: number | null
    displayGroupChat: boolean
    displayUserChat: boolean
    setDisplayGroupChat: (toggle: boolean) => void
    setDisplayUserChat: (toggle: boolean) => void
    handleOnScroll: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void
    handleDisplayFriends: (value: string) => void,
    handleGetDialogData: (uID: number, page: number, count: number, name: string, photo: string | null) => void
    dataActiveUserDialog?: DataActiveUserDialogType
}

export const Messages = memo(forwardRef(({
                                             usersData,
                                             messagesData,
                                             dispatchNewTextGroup,
                                             sendMessageGroupChat,
                                             sendMessageDialog,
                                             currentUserId,
                                             displayGroupChat,
                                             setDisplayGroupChat,
                                             handleOnScroll,
                                             handleDisplayFriends,
                                             handleGetDialogData,
                                             dataActiveUserDialog,
                                             displayUserChat,
                                             setDisplayUserChat,
                                             dispatchNewTextDialog
                                         }: MessagesPropsType, ref: React.ForwardedRef<HTMLDivElement>) => {


    const tabs = [
        {title: 'Messages', value: 'Messages'},
        {title: 'Friends', value: 'Friends'},
        {title: 'Groups', value: 'Groups'}
    ]

    return (
        <div className={s.messages}>
            <div className={s.sidebar}>
                <div className={s.search}>
                    <TextField placeholder={'Search conversation '} type={'text'} isSearch/>
                </div>

                <div className={s.tabs}>
                    <TabSwitcher tabs={tabs} defaultValue={'Messages'} onValueChange={handleDisplayFriends}>
                        <TabSwitcherContent className={s.sidebarContent} value={'Messages'}>
                            {messagesData.allDialogs.map(d=>(
                              <>  <UserItem key={d.id} className={s.userItem} id={d.id} name={d.userName} photos={d.photos} userAvatar={'small'} handleGetDialogData={handleGetDialogData}/>
                                  {!d.hasNewMessages && '*'}
                              </>
                            ))}
                            Groups
                        </TabSwitcherContent>
                        <TabSwitcherContent className={s.sidebarContent} value={'Friends'}>
                            {usersData.friends.map(u => (
                                <UserItem className={s.userItem} key={u.id} id={u.id}
                                          photos={u.photos} name={u.name}
                                          status={u.status} userAvatar={'small'}
                                          handleGetDialogData={handleGetDialogData}/>
                            ))}
                        </TabSwitcherContent>
                        <TabSwitcherContent className={s.sidebarContent} value={'Groups'}>
                            {<div className={s.groupItem} onClick={() => setDisplayGroupChat(true)}>
                                <div className={s.groupInfo}>
                                    <Avatar className={s.groupAvatar} size={'small'} photo={IN}/>
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
            {displayGroupChat &&
                <Chat ref={ref} chatData={messagesData.groupChatData} messageText={messagesData.messageTextGroup}
                      sendMessage={sendMessageGroupChat} dispatchNewTextInput={dispatchNewTextGroup}
                      currentUserId={currentUserId} handleOnScroll={handleOnScroll} chatName={'IT-Incubator Chat'}
                      chatPhoto={IN} setDisplayChat={setDisplayGroupChat}/>}

            {displayUserChat && <Chat ref={ref} dialogData={messagesData.dialogsData} currentUserId={currentUserId}
                                      messageText={messagesData.messageTextDialog} sendMessage={sendMessageDialog as SendMessageType}
                                      dispatchNewTextInput={dispatchNewTextDialog} handleOnScroll={handleOnScroll}
                                      chatName={dataActiveUserDialog?.name} setDisplayChat={setDisplayUserChat}
                                      chatPhoto={dataActiveUserDialog?.photo} chatUserId={dataActiveUserDialog?.uID}/>}
        </div>
    )
}))
