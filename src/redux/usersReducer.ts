import AvatarUnknownUser from "../imgs//UnknownUser.png";


export type UsersType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
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

const initialState: UsersType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1
}


type UsersAtionType = FollowACType | SetUsersACType | SetCurrentPageACType


export const usersReducer = (state = initialState, action: UsersAtionType): UsersType => {
    switch (action.type) {
        case FOLLOW:

            return {
                ...state,
                users: state.users.map(u => u.id === action.payload.userId ? {...u, followed: !u.followed} : u)
            }

        case SET_USERS:

            return {...state, users: action.payload.users}

        case SET_CURRENT_PAGE:

            return {...state, currentPage: action.payload.currentPage}

        default:
            return state
    }
}

export type FollowACType = ReturnType<typeof followAC>
export type SetUsersACType = ReturnType<typeof setUsersAC>
export type SetCurrentPageACType = ReturnType<typeof setCurrentPageAC>

export const followAC = (userId: number) => ({
    type: FOLLOW,
    payload: {
        userId
    }
} as const)

export const setUsersAC = (users: UserType[]) => ({
    type: SET_USERS,
    payload: {
        users
    }
} as const)

export const setCurrentPageAC = (currentPage: number) => ({
    type: SET_CURRENT_PAGE,
    payload: {
        currentPage
    }
} as const)