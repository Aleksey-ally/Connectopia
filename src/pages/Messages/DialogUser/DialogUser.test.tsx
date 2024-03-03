import {fireEvent, render, screen} from '@testing-library/react';
import {DialogUser} from './DialogUser';
import {BrowserRouter} from "react-router-dom";

describe('DialogUser component', () => {
    let userData = {
        id: 1,
        animalName: 'Buddy',
        photoAvatar: 'avatar.jpg'
    };
    beforeEach(()=>{

    })
    test('Renders with correct data', () => {
        render(
            <BrowserRouter>
                <DialogUser {...userData} />
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
                <DialogUser {...userData} />
            </BrowserRouter>
        );

        const linkElement = screen.getByRole('link', { name: /Buddy/i });

        fireEvent.click(linkElement)

        expect(linkElement.className).toBe('activeDialogItem');
    });
})
