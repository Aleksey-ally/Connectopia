import {Preloader} from "components/Preloader"
import React, {useEffect} from "react"
import {useSelector} from "react-redux"
import {ReducersType, useAppDispatch} from "redux/reduxStore"
import {followOnUser, getUsers, setItemsPerPage, setPagination, unfollowOnUser, UsersType} from "redux/usersReducer"
import {Users} from "./Users"

export const UsersContainer = () => {

    const usersData = useSelector<ReducersType, UsersType>(state => state.usersData)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getUsers(usersData.pageSize, usersData.currentPage))
    }, []);

    const follow = (userID: number) => {
        dispatch(followOnUser(userID))
    }

    const unfollow = (userID: number) => {
        dispatch(unfollowOnUser(userID))
    }

    const setCurrentPage = (page: number) => {
        dispatch(setPagination(usersData.pageSize, page))
    }

    const setPageSize = (pageSize: number) => {
        dispatch(setItemsPerPage(pageSize, usersData.currentPage))
    }

    return <>
        {usersData.isFetching ? <Preloader/> :
            <Users usersData={usersData} follow={follow} unFollow={unfollow}
                   setCurrentPage={setCurrentPage} setPageSize={setPageSize}/>}
    </>

}