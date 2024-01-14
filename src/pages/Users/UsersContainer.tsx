import {Preloader} from "components/Preloader/Preloader"
import React from "react"
import {useSelector} from "react-redux"
import {AppThunkDispatch, ReducersType, useAppDispatch} from "redux/reduxStore"
import {followOnUser, getUsers, setItemsPerPage, setPagination, unfollowOnUser, UsersType} from "redux/usersReducer"
import {Users} from "./Users"

export type Props = {
    usersData: UsersType
    dispatch: AppThunkDispatch
    follow: (userID: number) => (dispatch: AppThunkDispatch) => void
    unfollow: (userID: number) => (dispatch: AppThunkDispatch) => void
    getUsers: (pageSize: number, currentPage: number) => (dispatch: AppThunkDispatch) => void
    setPagination: (pageSize: number, page: number) => (dispatch: AppThunkDispatch) => void
    setItemsPerPage: (pageSize: number, currentPage: number) => (dispatch: AppThunkDispatch) => void
}


export class UsersAPIClassContainer extends React.Component<Props> {

    componentDidMount() {
        this.props.dispatch(this.props.getUsers(this.props.usersData.pageSize, this.props.usersData.currentPage))
    }

    follow = (userID: number) => {
        this.props.dispatch(this.props.follow(userID))
    }

    unfollow = (userID: number) => {
        this.props.dispatch(this.props.unfollow(userID))
    }

    setPagination = (page: number) => {
        this.props.dispatch(this.props.setPagination(this.props.usersData.pageSize, page))
    }

    setItemsPerPage = (pageSize: number) => {
        this.props.dispatch(this.props.setItemsPerPage(pageSize, this.props.usersData.currentPage))
    }

    render() {
        return <>
            {this.props.usersData.isFetching ? <Preloader/> :
                <Users usersData={this.props.usersData} follow={this.follow} unFollow={this.unfollow}
                       onClickPageHandler={this.setPagination} setItemsPerPage={this.setItemsPerPage}/>}
        </>
    }
}

export const UsersContainer = () => {

    const usersData = useSelector<ReducersType, UsersType>(state => state.usersData)
    const dispatch = useAppDispatch()

    return <UsersAPIClassContainer usersData={usersData} follow={followOnUser}
                                   unfollow={unfollowOnUser}
                                   getUsers={getUsers}
                                   dispatch={dispatch}
                                   setPagination={setPagination}
                                   setItemsPerPage={setItemsPerPage}/>

}