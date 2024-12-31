import {
    follow,
    setCurrentPage,
    setPageSize,
    setToggleFollowing,
    setTotalUsersCount,
    setUsers,
    unFollow,
    usersReducer
} from "redux/usersReducer";
import {appReducer, setFetching} from "redux/appReducer";
import {AppRootStateType} from "redux/reduxStore";

let startState: Pick<AppRootStateType, 'app'> & Pick<AppRootStateType, 'usersData'>

beforeEach(() => {
    startState = {
        app: {
            isFetching: false,
            initializing: true
        },
        usersData: {
            users: [
                {
                    id: 5,
                    name: 'Valera',
                    photos: {small: '#', large: null},
                    followed: false,
                    toggleFollowing: false,
                },
                {
                    id: 11,
                    name: 'Nasty',
                    photos: {small: '#', large: null},
                    followed: true,
                    toggleFollowing: false,
                },
                {
                    id: 59,
                    name: 'Sasha',
                    photos: {small: '#', large: null},
                    followed: false,
                    toggleFollowing: false,
                },
            ],
            navbarFriends: [],
            friends: [],
            pageSize: 25,
            totalUsersCount: 100,
            currentPage: 1,
        }
    }
})


test('user should be a follow', () => {
    const endState = usersReducer(startState.usersData, follow(5))
    expect(endState.users[0].followed).toBe(true)
})

test('user should be a unfollow', () => {
    const endState = usersReducer(startState.usersData, unFollow(11))
    expect(endState.users[1].followed).toBe(false)
})

test('users should be a set', () => {
    const users = [{
        id: 5098,
        name: 'Artem',
        photos: {small: '#', large: null},
        followed: true,
        toggleFollowing: false,
    },
        {
            id: 1154,
            name: 'Svetlana',
            photos: {small: '#', large: null},
            followed: false,
            toggleFollowing: false,
        }
    ]

    const endState = usersReducer(startState.usersData, setUsers(users))
    expect(endState.users.length).toBe(2)
    expect(endState.users[0].name).toBe('Artem')
    expect(endState.users[1].id).toBe(1154)
})

test('current page should be a set', () => {
    const endState = usersReducer(startState.usersData, setCurrentPage(4))
    expect(endState.currentPage).toBe(4)
})

test('total users count should be a set', () => {
    const endState = usersReducer(startState.usersData, setTotalUsersCount(10000))
    expect(endState.totalUsersCount).toBe(10000)
})

test('fetching should be a set', () => {
    const endState = appReducer(startState.app, setFetching(true))
    expect(endState.isFetching).toBe(true)
})

test(`'user's toggle following should be a changed'`, () => {
    const endState = usersReducer(startState.usersData, setToggleFollowing(59, true))
    expect(endState.users[2].toggleFollowing).toBe(true)
})

test('page size should be a set', () => {
    const endState = usersReducer(startState.usersData, setPageSize(50))
    expect(endState.pageSize).toBe(50)
})