import {render, screen} from '@testing-library/react';
import {UserMessage} from './UserMessage';


describe('UserMessage component', () => {
    let message = {
        id: 1,
        messageText: 'Hello, world!'
    };

    test('Renders message with correct text', () => {

        render(<UserMessage {...message} />);

        const messageElement = screen.getByText('Hello, world!');

        expect(messageElement).toBeTruthy();

        const circleElement = document.getElementsByClassName('circle')[0]

        expect(circleElement).toBeTruthy()
    });

    test('Renders message with normal circle style when id does not match uID', () => {

        render(<UserMessage {...message} />);

        const circleElement = document.getElementsByClassName('circle')[0];
        expect(circleElement.className).toBe('circle');
    });
})
