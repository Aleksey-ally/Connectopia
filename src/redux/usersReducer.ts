import {usersAPI} from "api/users/users.api";
import {AppThunkDispatch} from "redux/reduxStore";
import {UserType} from "api/users/users.types";
import {setFetching} from "redux/appReducer";

export type UsersType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    friends: UserType[]
    navbarFriends: UserType[]
}

const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET-USERS"
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE"
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT"
const TOGGLE_FOLLOWING = "TOGGLE-FOLLOWING"
const SET_PAGE_SIZE = "SET-PAGE-SIZE"
const SET_FRIENDS = "SET-FRIENDS"
const SET_NAVBAR_FRIENDS = "SET-NAVBAR-FRIENDS"

const initialState: UsersType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    friends: [],
    navbarFriends: []
}


type ActionType =
    | Follow
    | UnFollow
    | SetUsers
    | SetCurrentPage
    | SetTotalUsersCount
    | SetToggleFollowing
    | SetPageSize
    | SetFriends
    | SetNavbarFriends


export const usersReducer = (state = initialState, action: ActionType): UsersType => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => u.id === action.userID ? {...u, followed: true} : u)
            }

        case UNFOLLOW:
            return {
                ...state, users: state.users.map(u => u.id === action.userID ? {...u, followed: false} : u)
            }

        case SET_USERS:
            return {...state, users: action.users}

        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}

        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.totalUsersCount}


        case TOGGLE_FOLLOWING: {
            return {
                ...state,
                users: state.users.map(u => u.id === action.userID ? {
                    ...u,
                    toggleFollowing: action.toggleFollowing
                } : u)
            }
        }

        case SET_PAGE_SIZE : {
            return {...state, pageSize: action.pageSize}
        }

        case SET_FRIENDS : {
            return {...state, friends: action.friends}
        }

        case SET_NAVBAR_FRIENDS : {
            return {...state, navbarFriends: action.friends}
        }

        default:
            return state
    }
}
type Follow = ReturnType<typeof follow>
type UnFollow = ReturnType<typeof unFollow>
type SetUsers = ReturnType<typeof setUsers>
type SetCurrentPage = ReturnType<typeof setCurrentPage>
type SetTotalUsersCount = ReturnType<typeof setTotalUsersCount>
type SetToggleFollowing = ReturnType<typeof setToggleFollowing>
type SetPageSize = ReturnType<typeof setPageSize>
type SetFriends = ReturnType<typeof setFriends>
type SetNavbarFriends = ReturnType<typeof setNavbarFriends>

export const follow = (userID: number) => ({
    type: FOLLOW,
    userID
} as const)

export const unFollow = (userID: number) => ({
    type: UNFOLLOW,
    userID
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

export const setToggleFollowing = (userID: number, toggleFollowing: boolean) => ({
    type: TOGGLE_FOLLOWING,
    userID,
    toggleFollowing
} as const)

export const setPageSize = (pageSize: number) => ({
    type: SET_PAGE_SIZE,
    pageSize,
} as const)

export const setFriends = (friends: UserType[]) => ({
    type: SET_FRIENDS,
    friends
} as const)

export const setNavbarFriends = (friends: UserType[]) => ({
    type: SET_NAVBAR_FRIENDS,
    friends
} as const)


export const getUsers = (pageSize: number, currentPage: number, friend?: boolean, term?: string) =>
    async (dispatch: AppThunkDispatch) => {
        try {

            const res = await usersAPI.getUsers(pageSize, currentPage, friend, term);

            if (friend) {
                dispatch(setFriends(res.items))
            } else {
                dispatch(setCurrentPage(currentPage))
                dispatch(setUsers(res.items))
                dispatch(setTotalUsersCount(res.totalCount))
            }

        } catch {
            return
        }

    }

export const getNavbarFriends = (pageSize: number, currentPage: number, friend: boolean) => async (dispatch: AppThunkDispatch) => {
    dispatch(setFetching(true))
    try {
        const res = await usersAPI.getUsers(pageSize, currentPage, friend);
        dispatch(setNavbarFriends(res.items))
    } finally {
        dispatch(setFetching(false))
    }
}


export const setPagination = (pageSize: number, page: number, toggleSearchFriend: boolean) =>
    async (dispatch: AppThunkDispatch) => {
        dispatch(setFetching(true))
        dispatch(setCurrentPage(page))

        const res = await usersAPI.getUsers(pageSize, page, toggleSearchFriend)

        if (!res.error) {
            dispatch(setUsers(res.items))
            dispatch(setTotalUsersCount(res.totalCount))
        }

        dispatch(setFetching(false))
    }


export const setItemsPerPage = (pageSize: number, currentPage: number, toggleSearchFriend: boolean) =>
    async (dispatch: AppThunkDispatch) => {
        dispatch(setFetching(true))
        dispatch(setPageSize(pageSize))

        const res = await usersAPI.getUsers(pageSize, currentPage, toggleSearchFriend)

        if (!res.error) {
            dispatch(setUsers(res.items))
            dispatch(setTotalUsersCount(res.totalCount))
        }

        dispatch(setFetching(false))
    }


export const followOnUser = (userID: number) =>
    async (dispatch: AppThunkDispatch) => {
        dispatch(setToggleFollowing(userID, true))

        const res = await usersAPI.follow(userID)

        if (res.resultCode === 0) {
            dispatch(follow(userID))
        }

        dispatch(setToggleFollowing(userID, false))
        return {}

    }

export const unfollowOnUser = (userID: number) =>
    async (dispatch: AppThunkDispatch) => {
        dispatch(setToggleFollowing(userID, true))

        const res = await usersAPI.unFollow(userID)

        if (res.resultCode === 0) {
            dispatch(unFollow(userID))
        }

        dispatch(setToggleFollowing(userID, false))
    }

export const checkFollowedUser = async (userID: number) => {
    return await usersAPI.checkFollowed(userID)
}