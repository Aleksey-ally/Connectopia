
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
| FollowType 
| SetUsersType 
| SetCurrentPageType 
| setTotalUsersCountType 
| setFetchingType


export const usersReducer = (state = initialState, action: ActionType): UsersType => {
    switch (action.type) {
        case FOLLOW:

            return {
                ...state,
                users: state.users.map(u => u.id === action.payload.userId ? { ...u, followed: !u.followed } : u)
            }

        case SET_USERS:

            return { ...state, users: action.payload.users }

        case SET_CURRENT_PAGE:

            return { ...state, currentPage: action.payload.currentPage }

        case SET_TOTAL_USERS_COUNT:
            return { ...state, totalUsersCount: action.payload.totalUsersCount }

        case SET_FETCHING:
            return { ...state, isFetching: action.payload.isFetching }

        default:
            return state
    }
}

type FollowType = ReturnType<typeof follow>
type SetUsersType = ReturnType<typeof setUsers>
type SetCurrentPageType = ReturnType<typeof setCurrentPage>
type setTotalUsersCountType = ReturnType<typeof setTotalUsersCount>
type setFetchingType = ReturnType<typeof setFetching>

export const follow = (userId: number) => ({
    type: FOLLOW,
    payload: {
        userId
    }
} as const)

export const setUsers = (users: UserType[]) => ({
    type: SET_USERS,
    payload: {
        users
    }
} as const)

export const setCurrentPage = (currentPage: number) => ({
    type: SET_CURRENT_PAGE,
    payload: {
        currentPage
    }
} as const)

export const setTotalUsersCount = (totalUsersCount: number) => ({
    type: SET_TOTAL_USERS_COUNT,
    payload: {
        totalUsersCount
    }
} as const)

export const setFetching = (isFetching: boolean) => ({
    type: SET_FETCHING,
    payload: {
        isFetching
    }
} as const)