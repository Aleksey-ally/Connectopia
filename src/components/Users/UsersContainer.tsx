import axios from "axios"
import { Preloader } from "components/common/Preloader/Preloader"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { ReducersType } from "redux/reduxStore"
import { UserType, UsersType, followAC, setCurrentPageAC, setFetchingAC, setTotalUsersCountAC, setUsersAC } from "redux/usersReducer"
import { Users } from "./Users"

export type UsersPropsType = {
    usersData: UsersType
    dispatchFollow: (userId: number) => void
    dispatchNewUsers: (users: UserType[]) => void
    dispatchNewCurrentPage: (currentPage: number) => void
    dispatchNewTotalUsersCount: (totalUsersCount: number) => void
    dispatchFetch: (isFething: boolean) => void
}

export type BaseResponseType<D = {}> = {
    data: D;
};

type UsersResponseType = {
    items: UserType[]
    totalCount: number
}

export class UsersAPIClassContainer extends React.Component<UsersPropsType> {

    componentDidMount(): void {
        this.props.dispatchFetch(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.usersData.pageSize}&page=${this.props.usersData.currentPage}`).then((res: BaseResponseType<UsersResponseType>) => {
            this.props.dispatchNewUsers(res.data.items.map(u => ({ ...u, location: { country: "Belarus", city: "Minsk" } })));
            this.props.dispatchNewTotalUsersCount(res.data.totalCount)
            this.props.dispatchFetch(false)
        });
    }

    onClickFollow = (userId: number) => {
        this.props.dispatchFollow(userId);
    }

    onClickPageHandler = (page: number) => {
        this.props.dispatchFetch(true)
        this.props.dispatchNewCurrentPage(page)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.usersData.pageSize}&page=${page}`).then((res: BaseResponseType<UsersResponseType>) => {
            this.props.dispatchNewUsers(res.data.items.map(u => ({ ...u, location: { country: "Belarus", city: "Minsk" } })));
            this.props.dispatchNewTotalUsersCount(res.data.totalCount)
            this.props.dispatchFetch(false)
        });
    }

    render() {
        return <>
            {this.props.usersData.isFetching ? <Preloader /> : <Users usersData={this.props.usersData} onClickFollow={this.onClickFollow} onClickPageHandler={this.onClickPageHandler} />}
        </>
    }
}

export const UsersContainer = () => {

    const usersData = useSelector<ReducersType, UsersType>(state => state.usersData)
    const dispatch = useDispatch()

    const dispatchFollow = (userId: number) => {
        dispatch(followAC(userId))
    }
    const dispatchNewUsers = (users: UserType[]) => {
        dispatch(setUsersAC(users))
    }
    const dispatchNewCurrentPage = (currentPage: number) => {
        dispatch(setCurrentPageAC(currentPage))
    }
    const dispatchNewTotalUsersCount = (totalUsersCount: number) => {
        dispatch(setTotalUsersCountAC(totalUsersCount))
    }
    const dispatchFetch = (isFething: boolean) => {
        dispatch(setFetchingAC(isFething))
    }

    return <UsersAPIClassContainer usersData={usersData} dispatchFollow={dispatchFollow} dispatchNewUsers={dispatchNewUsers} dispatchNewCurrentPage={dispatchNewCurrentPage} dispatchNewTotalUsersCount={dispatchNewTotalUsersCount} dispatchFetch={dispatchFetch} />

}