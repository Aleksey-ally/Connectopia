import {render, screen} from "@testing-library/react";
import {Navbar} from "pages/Navbar/Navbar";
import {reduxStore} from "redux/reduxStore";
import {Provider, useSelector} from "react-redux";
import {BrowserRouter} from "react-router-dom";

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
}));

const useSelectorMock = jest.spyOn(require('react-redux'), 'useSelector');

describe('Navbar component', () => {

    it('Navbar renders friends section with correct data', async () => {


        // Создание тестовых данных для друзей
        const friendsData = [
            {id: 1, animalName: 'Friend 1', photoAvatar: 'avatar1.jpg'},
            {id: 2, animalName: 'Friend 2', photoAvatar: 'avatar2.jpg'},
            {id: 3, animalName: 'Friend 3', photoAvatar: 'avatar3.jpg'}
        ];

        // Устанавливаем возвращаемое значение для useSelector
        useSelectorMock.mockReturnValueOnce(friendsData);

        render(
            <BrowserRouter>
                <Provider store={reduxStore}>
                    <Navbar/>
                </Provider>
            </BrowserRouter>
        );

        // Проверка отображения секции с друзьями
        const friendsSection = await screen.findByText('Friends');
        expect(friendsSection).toBeTruthy();

        // Проверка отображения каждого друга
        for (const friend of friendsData) {
            const friendNameElement = await screen.findByText(friend.animalName);
            expect(friendNameElement).toBeTruthy();

            const friendAvatarElement = screen.getByAltText(`${friend.animalName} avatar`) as HTMLImageElement;
            expect(friendAvatarElement).toBeTruthy();
            expect(friendAvatarElement.getAttribute('src')).toBe(friend.photoAvatar);
        }
    });
})