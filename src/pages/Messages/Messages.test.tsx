import {Messages} from "pages/Messages/Messages";
import {fireEvent, render} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import {mockMessagesData} from "redux/messagesReducer.test";

const mockFriendsDialogs = [{id: 1, toggleFollowing: true, followed: true, name: "Andrew", photos: {large: "avatar1.jpg", small: "avatar2.jpg"}}]

const mockDispatchNewTextDialog = jest.fn();
const mockSendMessageGroupChat = jest.fn();
const mockSendMessageDialog = jest.fn();
const mockToggleDisplayChat = jest.fn();
const mockSetDisplayFriends = jest.fn();
const mockHandleOnScroll = jest.fn();
const mockHandleGetDialogData = jest.fn();
const mockSearchFriendByName = jest.fn();

describe('Messages component', () => {
    it('renders users and messages correctly', () => {
        const {getByText, getAllByRole} = render(
            <BrowserRouter>
                <Messages
                    messagesData={mockMessagesData}
                    dispatchNewTextDialog={mockDispatchNewTextDialog}
                    friendsDialogs={mockFriendsDialogs}
                    sendMessageGroupChat={mockSendMessageGroupChat}
                    sendMessageDialog={mockSendMessageDialog}
                    currentUserId={123}
                    displayChat={{displayGroupChat: false, displayUserChat: true, displayEmpty: false}}
                    toggleDisplayChat={mockToggleDisplayChat}
                    setDisplayFriends={mockSetDisplayFriends}
                    handleOnScroll={mockHandleOnScroll}
                    handleGetDialogData={mockHandleGetDialogData}
                    searchFriendByName={mockSearchFriendByName}
                />
            </BrowserRouter>
        );

        // Check if users are rendered
        expect(getByText('User 1')).toBeTruthy();
        expect(getByText('User 2')).toBeTruthy();

        // Check if messages are rendered
        expect(getByText('Message 1')).toBeTruthy();
        expect(getByText('Message 2')).toBeTruthy();

        // Check if textarea is rendered
        const inputs = getAllByRole('textbox');
        expect(inputs[0]).toBeTruthy();
    });

    it('dispatches new text input correctly', () => {
        const {getAllByRole} = render(
            <BrowserRouter>
                <Messages
                    messagesData={mockMessagesData}
                    dispatchNewTextDialog={mockDispatchNewTextDialog}
                    friendsDialogs={mockFriendsDialogs}
                    sendMessageGroupChat={mockSendMessageGroupChat}
                    sendMessageDialog={mockSendMessageDialog}
                    currentUserId={123}
                    displayChat={{displayGroupChat: false, displayUserChat: true, displayEmpty: false}}
                    toggleDisplayChat={mockToggleDisplayChat}
                    setDisplayFriends={mockSetDisplayFriends}
                    handleOnScroll={mockHandleOnScroll}
                    handleGetDialogData={mockHandleGetDialogData}
                    searchFriendByName={mockSearchFriendByName}
                />
            </BrowserRouter>
        );

        const inputs = getAllByRole('textbox');

        // Simulate changing text in textarea
        fireEvent.change(inputs[0], {target: {value: 'New input text'}});

        // Check if dispatchNewTextInput was called with correct value
        expect(mockDispatchNewTextDialog).toHaveBeenCalledWith('New input text');
    });

    it('dispatches add message correctly', () => {
        const {getAllByRole} = render(
            <BrowserRouter>
                <Messages
                    messagesData={mockMessagesData}
                    dispatchNewTextDialog={mockDispatchNewTextDialog}
                    friendsDialogs={mockFriendsDialogs}
                    sendMessageGroupChat={mockSendMessageGroupChat}
                    sendMessageDialog={mockSendMessageDialog}
                    currentUserId={123}
                    displayChat={{displayGroupChat: false, displayUserChat: true, displayEmpty: false}}
                    toggleDisplayChat={mockToggleDisplayChat}
                    setDisplayFriends={mockSetDisplayFriends}
                    handleOnScroll={mockHandleOnScroll}
                    handleGetDialogData={mockHandleGetDialogData}
                    searchFriendByName={mockSearchFriendByName}
                />
            </BrowserRouter>
        );

        const sendButton = getAllByRole('button');

        // Simulate clicking on the send message button
        fireEvent.click(sendButton[1]);

        // Check if addMessage was called
        expect(mockSendMessageDialog).toHaveBeenCalled();
    });
});