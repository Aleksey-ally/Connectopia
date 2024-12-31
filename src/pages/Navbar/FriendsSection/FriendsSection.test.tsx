import {render} from '@testing-library/react';
import {FriendsSection} from './FriendsSection';
import {UserType} from "api/users/users.types";


const mockFriendsData: UserType[] = [
    {id: 1, photos: {small: 'avatar1.jpg', large: 'avatar2.jpg'}, name: 'Andrew', followed: true, toggleFollowing: true},
    {id: 2, photos: {small: 'avatar3.jpg', large: 'avatar4.jpg'}, name: 'Nadya', followed: true, toggleFollowing: true},
    {id: 3, photos: {small: 'avatar5.jpg', large: 'avatar6.jpg'}, name: 'Egor', followed: false, toggleFollowing: false},
];

describe('FriendsSection', () => {
    test('Renders with correct data', () => {
        const {getByText, getAllByRole} = render(<FriendsSection friendsData={mockFriendsData}/>);


        const labelElement = getByText('Nadya');
        expect(labelElement).toBeTruthy();


        mockFriendsData.slice(0, 3).forEach(friend => {
            const nameElement = getByText(friend.name);
            expect(nameElement).toBeTruthy();

            const avatarElements = getAllByRole('img')
            const avatarElement = avatarElements.find((img) =>
                img.getAttribute('src') === friend.photos.small);

            expect(avatarElement).toBeTruthy();
        });
    });

    test('Renders only first three friends', () => {
        const {} = render(<FriendsSection friendsData={mockFriendsData}/>);

        expect(mockFriendsData[3]).toBeUndefined();
    });

});