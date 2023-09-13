
export type UsersType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
}

export type LocationUserType = {
    city: string
    country: string
}

export type UserType = {
    id: number
    name: string
    photos: { small: string | null, large: string | null }
    status: string
    location: LocationUserType
    followed: boolean
}


const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET-USERS"
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE"
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT"
const SET_FETCHING = "SET-FETCHING"

const initialState: UsersType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false
}


type ActionType =
    | Follow
    | UnFollow
    | SetUsers
    | SetCurrentPage
    | setTotalUsersCount
    | setFetching


export const usersReducer = (state = initialState, action: ActionType): UsersType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => u.id === action.userId ? { ...u, followed: true } : u)
            }

        case UNFOLLOW:
            return {
                ...state, users: state.users.map(u => u.id === action.userId? {...u, followed: false}: u)
            }

        case SET_USERS:
            return { ...state, users: action.users }

        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.currentPage }

        case SET_TOTAL_USERS_COUNT:
            return { ...state, totalUsersCount: action.totalUsersCount }

        case SET_FETCHING:
            return { ...state, isFetching: action.isFetching }

        default:
            return state
    }
}

type Follow = ReturnType<typeof follow>
type UnFollow = ReturnType<typeof unFollow>
type SetUsers = ReturnType<typeof setUsers>
type SetCurrentPage = ReturnType<typeof setCurrentPage>
type setTotalUsersCount = ReturnType<typeof setTotalUsersCount>
type setFetching = ReturnType<typeof setFetching>

export const follow = (userId: number) => ({
    type: FOLLOW,
    userId
} as const)

export const unFollow = (userId: number) => ({
    type: UNFOLLOW,
    userId
} as const)

export const setUsers = (users: UserType[]) => ({
    type: SET_USERS,
    users
} as const)

export const setCurrentPage = (currentPage: number) => ({
    type: SET_CURRENT_PAGE,
    currentPage
} as const)

export const setTotalUsersCount = (totalUsersCount: number) => ({
    type: SET_TOTAL_USERS_COUNT,
    totalUsersCount
} as const)

export const setFetching = (isFetching: boolean) => ({
    type: SET_FETCHING,
    isFetching
} as const)