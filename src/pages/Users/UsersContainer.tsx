import {usersAPI} from "api/api"
import {Preloader} from "components/Preloader/Preloader"
import React from "react"
import {useSelector} from "react-redux"
import {AppThunkDispatch, ReducersType, useAppDispatch} from "redux/reduxStore"
import {
    followOnUser,
    getUsers,
    setCurrentPage,
    setFetching,
    setPageSize,
    setToggleFollowing,
    setTotalUsersCount,
    setUsers,
    unfollowOnUser,
    UsersType,
    UserType
} from "redux/usersReducer"
import {Users} from "./Users"

export type Props = {
    usersData: UsersType
    dispatch: AppThunkDispatch
    follow: (userID: number) => (dispatch: AppThunkDispatch) => void
    unfollow: (userID: number) => (dispatch: AppThunkDispatch) => void
    dispatchNewUsers: (users: UserType[]) => void
    dispatchNewCurrentPage: (currentPage: number) => void
    dispatchNewTotalUsersCount: (totalUsersCount: number) => void
    dispatchFetch: (isFetching: boolean) => void
    dispatchToggleFollowing: (userID: number, toggleFollowing: boolean) => void
    dispatchItemsPerPage: (pageSize: number) => void
    getUsers: (pageSize: number, currentPage: number) => (dispatch: AppThunkDispatch) => void;
}


export class UsersAPIClassContainer extends React.Component<Props> {

    componentDidMount() {
        this.props.dispatch(this.props.getUsers(this.props.usersData.pageSize, this.props.usersData.currentPage))
    }

    follow = (userID: number) => {
        this.props.dispatch(this.props.follow(userID))
    }

    unFollow = (userID: number) => {
        this.props.dispatch(this.props.unfollow(userID))
    }

    onClickPageHandler = (page: number) => {
        this.props.dispatchFetch(true)
        this.props.dispatchNewCurrentPage(page)

        usersAPI.getUsers(this.props.usersData.pageSize, page)
            .then((data) => {
                this.props.dispatchNewUsers(data.items);
                this.props.dispatchNewTotalUsersCount(data.totalCount)
                this.props.dispatchFetch(false)
            });
    }

    setItemsPerPage = (pageSize: number) => {
        this.props.dispatchFetch(true)
        this.props.dispatchItemsPerPage(pageSize)

        usersAPI.getUsers(pageSize, this.props.usersData.currentPage)
            .then((data) => {
                this.props.dispatchNewUsers(data.items);
                this.props.dispatchNewTotalUsersCount(data.totalCount)
                this.props.dispatchFetch(false)
            })


    }

    render() {
        return <>
            {this.props.usersData.isFetching ? <Preloader/> :
                <Users usersData={this.props.usersData} follow={this.follow} unFollow={this.unFollow}
                       onClickPageHandler={this.onClickPageHandler} setItemsPerPage={this.setItemsPerPage}/>}
        </>
    }
}

export const UsersContainer = () => {

    const usersData = useSelector<ReducersType, UsersType>(state => state.usersData)
    const dispatch = useAppDispatch()

    const dispatchNewUsers = (users: UserType[]) => {
        dispatch(setUsers(users))
    }
    const dispatchNewCurrentPage = (currentPage: number) => {
        dispatch(setCurrentPage(currentPage))
    }
    const dispatchNewTotalUsersCount = (totalUsersCount: number) => {
        dispatch(setTotalUsersCount(totalUsersCount))
    }
    const dispatchFetch = (isFetching: boolean) => {
        dispatch(setFetching(isFetching))
    }
    const dispatchToggleFollowing = (userID: number, toggleFollowing: boolean) => {
        dispatch(setToggleFollowing(userID, toggleFollowing))
    }
    const dispatchItemsPerPage = (pageSize: number) => {
        dispatch(setPageSize(pageSize))
    }

    return <UsersAPIClassContainer usersData={usersData} follow={followOnUser}
                                   unfollow={unfollowOnUser} dispatchNewUsers={dispatchNewUsers}
                                   dispatchNewCurrentPage={dispatchNewCurrentPage}
                                   dispatchNewTotalUsersCount={dispatchNewTotalUsersCount} dispatchFetch={dispatchFetch}
                                   dispatchToggleFollowing={dispatchToggleFollowing}
                                   dispatchItemsPerPage={dispatchItemsPerPage}
                                   getUsers={getUsers}
                                   dispatch={dispatch}/>

}