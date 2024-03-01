import {fireEvent, render} from "@testing-library/react";
import {Users} from "pages/Users/Users";
import {BrowserRouter} from "react-router-dom";
import {UsersType} from "redux/usersReducer";
import fn = jest.fn;


let startState: UsersType
const mockFn = fn()

beforeEach(() => {

    startState = {
        users: [
            {
                id: 989,
                name: 'Tatiana',
                photos: {small: null, large: null},
                followed: false,
                toggleFollowing: false,
                status: 'Ho Ho'
            },
            {
                id: 9891,
                name: 'Carl',
                photos: {small: null, large: null},
                followed: false,
                toggleFollowing: false,
                status: 'Meat'
            },
            {
                id: 19891,
                name: 'Vika',
                photos: {small: null, large: null},
                followed: true,
                toggleFollowing: false,
                status: 'Cheese'
            }
        ],
        pageSize: 5,
        totalUsersCount: 100,
        currentPage: 1,
        isFetching: false
    }
})

describe('UsersComponent', () => {

    test('Renders users with correct data', () => {

        const {getByText} = render(
            <BrowserRouter>
                <Users usersData={startState} follow={mockFn} setCurrentPage={mockFn} setPageSize={mockFn}
                       unFollow={mockFn}/>);
            </BrowserRouter>)

        startState.users.forEach(user => {
            getByText((user.name));
            getByText((user.status as string));
        });

    });

    test('Follow buttons render and function correctly', () => {

        const follow = (userID: number) => {
            startState = {...startState, users: [...startState.users.map(u => u.id === userID ? {...u, followed: true} : u)]}
        }

        const {getAllByText} = render(
            <BrowserRouter>
                <Users usersData={startState} follow={follow} setCurrentPage={mockFn} setPageSize={mockFn}
                       unFollow={mockFn}/>);
            </BrowserRouter>)

        const button = getAllByText(('Follow'))[0];
        fireEvent.click(button)

        expect(startState.users[0].followed).toBe(true)
        expect(startState.users[1].followed).toBe(false)

    });

    test('UnFollow buttons render and function correctly', () => {

        const unFollow = (userID: number) => {
            startState = {...startState, users: [...startState.users.map(u => u.id === userID ? {...u, followed: false} : u)]}
        }

        const {getAllByText} = render(
            <BrowserRouter>
                <Users usersData={startState} follow={mockFn} setCurrentPage={mockFn} setPageSize={mockFn}
                       unFollow={unFollow}/>);
            </BrowserRouter>)


        const button = getAllByText(('Unfollow'))[0];
        fireEvent.click(button)

        expect(startState.users[0].followed).toBe(false)
        expect(startState.users[2].followed).toBe(false)

    });


})