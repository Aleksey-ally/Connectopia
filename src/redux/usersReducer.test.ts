import {
    follow,
    setCurrentPage, setFetching, setPageSize, setToggleFollowing,
    setTotalUsersCount,
    setUsers,
    unFollow,
    usersReducer,
    UsersType
} from "redux/usersReducer";

let startState: UsersType

beforeEach(() => {
    startState = {
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
        pageSize: 25,
        totalUsersCount: 100,
        currentPage: 1,
        isFetching: false,
    }
})

test('user should be a follow', () => {
    const endState = usersReducer(startState, follow(5))
    expect(endState.users[0].followed).toBe(true)
})

test('user should be a unfollow', () => {
    const endState = usersReducer(startState, unFollow(11))
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

    const endState = usersReducer(startState, setUsers(users))
    expect(endState.users.length).toBe(2)
    expect(endState.users[0].name).toBe('Artem')
    expect(endState.users[1].id).toBe(1154)
})

test('current page should be a set', () => {
    const endState = usersReducer(startState, setCurrentPage(4))
    expect(endState.currentPage).toBe(4)
})

test('total users count should be a set', () => {
    const endState = usersReducer(startState, setTotalUsersCount(10000))
    expect(endState.totalUsersCount).toBe(10000)
})

test('fetching should be a set', () => {
    const endState = usersReducer(startState, setFetching(true))
    expect(endState.isFetching).toBe(true)
})

test(`'user's toggle following should be a changed'`, () => {
    const endState = usersReducer(startState, setToggleFollowing(59, true))
    expect(endState.users[2].toggleFollowing).toBe(true)
})

test('page size should be a set', () => {
    const endState = usersReducer(startState, setPageSize(50))
    expect(endState.pageSize).toBe(50)
})