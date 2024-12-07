import {fireEvent, render, screen} from '@testing-library/react';
import {UserItem} from 'components/UserItem/UserItem';
import {BrowserRouter} from "react-router-dom";

describe('UserItem component', () => {
    let userData = {
        id: 1,
        animalName: 'Buddy',
        photoAvatar: 'avatar.jpg'
    };

    test('Renders with correct data', () => {
        render(
            <BrowserRouter>
                <UserItem {...userData} />
            </BrowserRouter>
        );

        const linkElement = screen.getByRole('link', {name: /Buddy/i});
        const imgElement = screen.getByAltText('avatar.jpg avatar');

        expect(linkElement).toBeTruthy();
        expect(imgElement).toBeTruthy();
    });

    test('Renders active NavLink', () => {
        render(
            <BrowserRouter>
                <UserItem {...userData} />
            </BrowserRouter>
        );

        const linkElement = screen.getByRole('link', { name: /Buddy/i });

        fireEvent.click(linkElement)

        expect(linkElement.className).toBe('activeDialogItem');
    });
})
