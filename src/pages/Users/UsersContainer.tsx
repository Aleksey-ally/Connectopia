import { followAPI, usersAPI } from "api/api"
import { Preloader } from "components/Preloader/Preloader"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { ReducersType } from "redux/reduxStore"
import {
    UserType,
    UsersType,
    follow,
    setCurrentPage,
    setFetching,
    setTotalUsersCount,
    setUsers,
    setToggleFollowing,
    unFollow,
    setPageSize
} from "redux/usersReducer"
import { Users } from "./Users"

export type Props = {
    usersData: UsersType
    dispatchFollow: (userID: number) => void
    dispatchUnFollow: (userID: number) => void
    dispatchNewUsers: (users: UserType[]) => void
    dispatchNewCurrentPage: (currentPage: number) => void
    dispatchNewTotalUsersCount: (totalUsersCount: number) => void
    dispatchFetch: (isFetching: boolean) => void
    dispatchToggleFollowing: (userID: number, toggleFollowing: boolean) => void
    dispatchItemsPerPage: (pageSize:number)=>void
}



export class UsersAPIClassContainer extends React.Component<Props> {

    componentDidMount(): void {
        this.props.dispatchFetch(true)

        usersAPI.getUsers(this.props.usersData.pageSize, this.props.usersData.currentPage)
            .then((data) => {
                this.props.dispatchNewUsers(data.items.map(u => ({ ...u, location: { country: "Belarus", city: "Minsk" }, toggleFollowing: false })));
                this.props.dispatchNewTotalUsersCount(data.totalCount)
                this.props.dispatchFetch(false)
            });
    }

    follow = (userID: number) => {
        this.props.dispatchToggleFollowing(userID, true)

        followAPI.follow(userID)
            .then(() => {
                this.props.dispatchFollow(userID)
                this.props.dispatchToggleFollowing(userID, false)
            })
    }

    unFollow = (userID: number) => {
        this.props.dispatchToggleFollowing(userID, true)

        followAPI.unFollow(userID)
            .then(() => {
                this.props.dispatchUnFollow(userID)
                this.props.dispatchToggleFollowing(userID, false)
            })
    }

    onClickPageHandler = (page: number) => {
        this.props.dispatchFetch(true)
        this.props.dispatchNewCurrentPage(page)

        usersAPI.getUsers(this.props.usersData.pageSize, page)
            .then((data) => {
                this.props.dispatchNewUsers(data.items.map(u => ({ ...u, location: { country: "Belarus", city: "Minsk" } })));
                this.props.dispatchNewTotalUsersCount(data.totalCount)
                this.props.dispatchFetch(false)
            });
    }

    setItemsPerPage = (pageSize:number) => {
        this.props.dispatchFetch(true)
        this.props.dispatchItemsPerPage(pageSize)

        usersAPI.getUsers(pageSize, this.props.usersData.currentPage)
            .then((data)=>{
                this.props.dispatchNewUsers(data.items.map(u => ({ ...u, location: { country: "Belarus", city: "Minsk" } })));
                this.props.dispatchNewTotalUsersCount(data.totalCount)
                this.props.dispatchFetch(false)
            })


    }

    render() {
        return <>
            {this.props.usersData.isFetching ? <Preloader /> : <Users usersData={this.props.usersData} follow={this.follow} unFollow={this.unFollow} onClickPageHandler={this.onClickPageHandler} setItemsPerPage={this.setItemsPerPage} />}
        </>
    }
}

export const UsersContainer = () => {

    const usersData = useSelector<ReducersType, UsersType>(state => state.usersData)
    const dispatch = useDispatch()

    const dispatchFollow = (userID: number) => {
        dispatch(follow(userID))
    }
    const dispatchUnFollow = (userID: number) => {
        dispatch(unFollow(userID))
    }
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

    return <UsersAPIClassContainer usersData={usersData} dispatchFollow={dispatchFollow} dispatchUnFollow={dispatchUnFollow} dispatchNewUsers={dispatchNewUsers} dispatchNewCurrentPage={dispatchNewCurrentPage} dispatchNewTotalUsersCount={dispatchNewTotalUsersCount} dispatchFetch={dispatchFetch} dispatchToggleFollowing={dispatchToggleFollowing} dispatchItemsPerPage={dispatchItemsPerPage} />

}