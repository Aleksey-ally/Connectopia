import {render, screen} from "@testing-library/react";
import {Navbar} from "pages/Navbar/Navbar";
import {reduxStore} from "redux/reduxStore";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {UserType} from "api/users/users.types";

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
}));

const useSelectorMock = jest.spyOn(require('react-redux'), 'useSelector');

describe('Navbar component', () => {

    it('Navbar renders friends section with correct data', async () => {


        // Создание тестовых данных для друзей
        const friendsData: UserType[] = [
            {id: 1, name: 'Friend 1', photos: {large: "avatar1.jpg", small: "'avatar2.jpg'"}, followed: true, toggleFollowing: true},
            {id: 2, name: 'Friend 2', photos: {large: "avatar3.jpg", small: "'avatar4.jpg'"}, followed: true, toggleFollowing: true},
            {id: 3, name: 'Friend 3', photos: {large: "avatar5.jpg", small: "'avatar6.jpg'"}, followed: false, toggleFollowing: false},
        ];

        // Устанавливаем возвращаемое значение для useSelector
        useSelectorMock.mockReturnValueOnce(friendsData);

        const {getAllByRole} = render(
            <BrowserRouter>
                <Provider store={reduxStore}>
                    <Navbar friendsData={friendsData} id={123}/>
                </Provider>
            </BrowserRouter>
        );

        // Проверка отображения секции с друзьями
        const friendsSection = getAllByRole('heading', {level: 3});
        expect(friendsSection[0]).toBeTruthy();

        // Проверка отображения каждого друга
        friendsData.forEach((friend, index)=>{
            const friendNameElement = screen.findByText(friend.name);
            expect(friendNameElement).toBeTruthy();

            const friendAvatarElement = getAllByRole('img');
            expect(friendAvatarElement).toBeTruthy();
            expect(friendAvatarElement[index].getAttribute('src')).toBe(friend.photos.small);
        })
    });
})