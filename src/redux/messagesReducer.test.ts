import {addMessageDialog, changeMessageTextDialog, MessagesDataType, messagesReducer} from "redux/messagesReducer";

let startState: MessagesDataType

export const mockMessagesData: MessagesDataType = {
    allDialogs: [
        {id: 1, userName: "User 1", photos: {large: "avatar1.jpg", small: "avatar2.jpg"}, newMessagesCount: 0, hasNewMessages: false, lastUserActivityDate: '11.02.2024', lastDialogActivityDate: "11.02.2024"},
        {id: 2, userName: "User 2", photos: {large: "avatar3.jpg", small: "avatar4.jpg"}, newMessagesCount: 0, hasNewMessages: false, lastUserActivityDate: '11.02.2024', lastDialogActivityDate: "11.02.2024"}
    ],
    messageTextDialog: "Hi, everyone!",
    dialogsData: [{id: "id1", body: "Message 1", senderName: "Aleksey", senderId: 123, addedAt: "24.12.2024", recipientId: 123, viewed: false}, {id: "id2", body: "Message 2", senderName: "Aleksey", senderId: 123, addedAt: "24.12.2024", recipientId: 123, viewed: false}],
    friendsDialogs: [{id: 1, toggleFollowing: true, followed: true, name: "Andrew", photos: {large: "avatar1.jpg", small: "avatar2.jpg"}}],
    pageSize: 5,
    searchText: '',
    groupChatData: [{userId: 123, userName: "Aleksey", message: "", photo: ''}],
    messageTextGroup: '',
    currentPage: 1
}

beforeEach(() => {
    startState = mockMessagesData
})

test('Messages should be to added', () => {

    expect(startState.messageTextDialog).toBe("Hi, everyone!")

    const endState = messagesReducer(startState, addMessageDialog())

    expect(endState.messageTextDialog).toBe("")
    expect(endState.dialogsData[1].id).toBe('id2')

})

test('Message should be to changed', () => {
    const endState = messagesReducer(startState, changeMessageTextDialog('Bye, everyone!'))

    expect(endState.messageTextDialog).toBe('Bye, everyone!')
})