import {render} from '@testing-library/react';
import {FriendsSection} from './FriendsSection';


const mockFriendsData = [
    {id: 1, photoAvatar: 'avatar1.jpg', animalName: 'Friend 1'},
    {id: 2, photoAvatar: 'avatar2.jpg', animalName: 'Friend 2'},
    {id: 3, photoAvatar: 'avatar3.jpg', animalName: 'Friend 3'}
];

describe('FriendsSection', () => {
    test('Renders with correct data', () => {
        const {getByText, getByAltText} = render(<FriendsSection friendsData={mockFriendsData}/>);


        const labelElement = getByText('Friends');
        expect(labelElement).toBeTruthy();


        mockFriendsData.slice(0, 3).forEach(friend => {
            const nameElement = getByText(friend.animalName);
            expect(nameElement).toBeTruthy();

            const avatarElement = getByAltText(`${friend.animalName} avatar`);
            expect(avatarElement.getAttribute('src')).toBe(friend.photoAvatar)
        });
    });

    test('Renders only first three friends', () => {
        const {} = render(<FriendsSection friendsData={mockFriendsData}/>);

        expect(mockFriendsData[3]).toBeUndefined();
    });

});