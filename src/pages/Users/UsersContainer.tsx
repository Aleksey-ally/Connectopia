import {Preloader} from "components/Preloader"
import React, {useCallback, useEffect, useState} from "react"
import {useSelector} from "react-redux"
import {ReducersType, useAppDispatch} from "redux/reduxStore"
import {followOnUser, getUsers, setItemsPerPage, setPagination, unfollowOnUser, UsersType} from "redux/usersReducer"
import {Users} from "./Users"
import {toast} from "react-toastify";
import {errorOptions, successOptions} from "utils/ToastifyOptions/ToastifyOptions";
import {setFetching} from "redux/appReducer";
import {useTranslation} from "react-i18next";

export const UsersContainer = () => {
    const dispatch = useAppDispatch()

    const isFetching = useSelector<ReducersType, boolean>(state => state.app.isFetching)
    const usersData = useSelector<ReducersType, UsersType>(state => state.usersData)

    const [toggleSearchFriend, setToggleSearchFriend] = useState<boolean>(false )

    const {t} = useTranslation();

    useEffect(() => {
        dispatch(setFetching(true))
        dispatch(getUsers(usersData.pageSize, usersData.currentPage, toggleSearchFriend))
            .catch(() => {
                toast.error(t("notifications.errorReceivingUsers"), errorOptions)
            })
            .finally(() => {
                dispatch(setFetching(false))
            })
    }, [toggleSearchFriend, dispatch]);

    const follow = useCallback((userID: number) => {
        dispatch(followOnUser(userID))
            .then(() => {
                toast.success(t("notifications.follow"), successOptions)
            })
    }, [dispatch]);

    const unfollow = useCallback((userID: number) => {
        dispatch(unfollowOnUser(userID))
            .then(() => {
                toast.success(t("notifications.unfollow"), successOptions)
            })
    }, [dispatch]);

    const setCurrentPage = useCallback((page: number) => {
        dispatch(setPagination(usersData.pageSize, page, toggleSearchFriend))
            .catch(() => {
                toast.error(t("notifications.errorChangingPage"), errorOptions)
            })
    }, [dispatch, usersData.pageSize, toggleSearchFriend]);

    const setPageSize = useCallback((pageSize: number) => {
        dispatch(setItemsPerPage(pageSize, usersData.currentPage, toggleSearchFriend))
            .catch(() => {
                toast.error(t("notifications.errorChangingPageSize"), errorOptions)
            })
    }, [dispatch, usersData.currentPage, toggleSearchFriend]);

    return <>
        {isFetching ? <Preloader/> :
            <Users usersData={usersData} follow={follow} unFollow={unfollow}
                   setCurrentPage={setCurrentPage} setPageSize={setPageSize}
                   toggle={toggleSearchFriend} setToggle={setToggleSearchFriend}
            />}
    </>

}