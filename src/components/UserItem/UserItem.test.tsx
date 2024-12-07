import {render, screen} from '@testing-library/react';
import {UserItem} from 'components/UserItem/UserItem';
import {BrowserRouter} from "react-router-dom";

describe('UserItem component', () => {
    let userData = {
        id: 1,
        name: 'Buddy',
        photos: {
            small: 'avatarSmall.jpg',
            large: 'avatarLarge.jpg'
        },
        status: 'Hey',
        followed: false,
        toggleFollowing: false,
        follow: (id: number) => {
        },
        unFollow: (id: number) => {
        }
    };

    test('Renders with correct data', () => {
        render(
            <BrowserRouter>
                <UserItem {...userData} />
            </BrowserRouter>
        );

        const linkElement = screen.getByRole('link', {name: /Buddy/});
        const imgElement = screen.getByAltText('User avatar');
        const statusElement = screen.getByText(/Hey/)

        expect(linkElement).toBeTruthy();
        expect(imgElement).toBeTruthy();
        expect(statusElement).toBeTruthy();
    });

})
