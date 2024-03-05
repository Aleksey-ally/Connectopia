import {Messages} from "pages/Messages/Messages";
import {render, fireEvent} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";

const mockMessagesData = {
    messagesUsersData: [
        {id: 1, animalName: 'User 1', photoAvatar: 'avatar1.jpg'},
        {id: 2, animalName: 'User 2', photoAvatar: 'avatar2.jpg'}
    ],
    messagesTextData: [
        {id: 1, messageText: 'Message 1'},
        {id: 2, messageText: 'Message 2'}
    ],
    messageText: 'New message'
};

const mockDispatchNewTextInput = jest.fn();
const mockAddMessage = jest.fn();

describe('Messages component', () => {
    it('renders users and messages correctly', () => {
        const {getByText, getByPlaceholderText} = render(
            <BrowserRouter>
                <Messages
                    messagesData={mockMessagesData}
                    dispatchNewTextInput={mockDispatchNewTextInput}
                    addMessage={mockAddMessage}
                />
            </BrowserRouter>
        );

        // Check if users are rendered
        expect(getByText('User 1')).toBeTruthy();
        expect(getByText('User 2')).toBeTruthy();

        // Check if messages are rendered
        expect(getByText('Message 1')).toBeTruthy();
        expect(getByText('Message 2')).toBeTruthy();

        // Check if textarea is rendered with correct value
        const textarea = getByPlaceholderText('Enter your message');
        expect(textarea).toBeTruthy();
        expect(textarea.innerHTML).toBe('New message');
    });

    it('dispatches new text input correctly', () => {
        const {getByPlaceholderText} = render(
            <BrowserRouter>
                <Messages
                    messagesData={mockMessagesData}
                    dispatchNewTextInput={mockDispatchNewTextInput}
                    addMessage={mockAddMessage}
                />
            </BrowserRouter>
        );

        const textarea = getByPlaceholderText('Enter your message');

        // Simulate changing text in textarea
        fireEvent.change(textarea, {target: {value: 'New input text'}});

        // Check if dispatchNewTextInput was called with correct value
        expect(mockDispatchNewTextInput).toHaveBeenCalledWith('New input text');
    });

    it('dispatches add message correctly', () => {
        const {getByText} = render(
            <BrowserRouter>
                <Messages
                    messagesData={mockMessagesData}
                    dispatchNewTextInput={mockDispatchNewTextInput}
                    addMessage={mockAddMessage}
                />
            </BrowserRouter>
        );

        const sendButton = getByText('Sent message');

        // Simulate clicking on the send message button
        fireEvent.click(sendButton);

        // Check if addMessage was called
        expect(mockAddMessage).toHaveBeenCalled();
    });
});