import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {
    addPost,
    changePostText,
    changeUserStatus,
    getUserProfile,
    getUserStatus,
    ProfileDataType,
    updateProfile
} from 'redux/profileReducer';
import {ReducersType, useAppDispatch} from 'redux/reduxStore';
import {ProfileInformation} from './ProfileInformation';
import {toast} from "react-toastify";
import {errorOptions, successOptions} from "utils/ToastifyOptions/ToastifyOptions";
import {checkFollowedUser, followOnUser, unfollowOnUser} from "redux/usersReducer";
import {Photos, ProfileUserResponseType} from "api/profile/profile.types";
import {Preloader} from "components/Preloader";
import {setFetching} from "redux/appReducer";
import {useTranslation} from "react-i18next";

export const ProfileInformationContainer = () => {
    const dispatch = useAppDispatch()

    const isFetching = useSelector<ReducersType, boolean>(state => state.app.isFetching)

    const profileData = useSelector<ReducersType, ProfileDataType>(state => state.profileData)
    const currentUserID = useSelector<ReducersType, number | null>(state => state.auth.id)

    const [localStatus, setLocalStatus] = useState<string>('')
    const [editStatus, setEditStatus] = useState<boolean>(false)
    const [editForm, setEditForm] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string[]>([])
    const [isFollow, setIsFollow] = useState<boolean>(false)

    const toggleEditHandler = useCallback(() => {
        paramsUID === currentUserID && setEditStatus(!editStatus)
        profileData.status !== localStatus && dispatch(changeUserStatus(localStatus))
            .then(() => {
                toast.success(t("notifications.status"), successOptions)
            })
    }, [editStatus, localStatus])

    const changeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setLocalStatus(e.currentTarget.value)
    }, [localStatus])

    const setEditFormWithCheck = (value: boolean) => {
        if (currentUserID === paramsUID) return setEditForm(value)
    }

    const handleSubmitProfileForm = (userData: ProfileUserResponseType) => {

        dispatch(updateProfile({...userData, photos: profileData.profile.photos as Photos}))
            .then(message => {
                if (message) {
                    setErrorMessage(message)
                } else {
                    setEditForm(false)
                    toast.success(t("notifications.changeData"), successOptions)
                }
            })
    }

    const follow = useCallback((userID: number) => {
        dispatch(followOnUser(userID))
            .then(() => {
                toast.success(t("notifications.follow"), successOptions)
                setIsFollow(true)
            })
    }, [dispatch])

    const unFollow = useCallback((userID: number) => {
        dispatch(unfollowOnUser(userID))
            .then(() => {
                toast.success(t("notifications.unfollow"), successOptions)
                setIsFollow(false)

            })
    }, [dispatch])

    const checkFollowed = async (userID: number) => {

        await checkFollowedUser(userID).then((data) => {
            setIsFollow(data)
        });

    }

    const handleChangePostText = (newText: string) => {
        dispatch(changePostText(newText))
    }

    const handleAddPost = () => {
        dispatch(addPost())
    }

    const {uID} = useParams()

    const paramsUID = Number(uID)

    const userID = paramsUID || currentUserID

    const {t} = useTranslation();

    useEffect(() => {
        if (userID === null) return

        (async () => {
            dispatch(setFetching(true))
            try {
                await dispatch(getUserProfile(userID))
                await dispatch(getUserStatus(userID))
                setLocalStatus(profileData.status ? profileData.status : t("profilePage.noValue"));
                if (paramsUID && currentUserID !== paramsUID) {
                    await checkFollowed(paramsUID)
                }
                dispatch(setFetching(false))

            } catch {
                toast.error(t("notifications.errorReceivingUser"), errorOptions)
            }
        })();

    }, [userID, profileData.status, dispatch])

    return <>
        {isFetching ? <Preloader/> :
            <ProfileInformation currentUserID={currentUserID}
                                uID={paramsUID} profileData={profileData} status={localStatus} edit={editStatus}
                                toggleEditHandler={toggleEditHandler}
                                changeStatusHandler={changeStatusHandler}
                                dispatch={dispatch}
                                handleSubmitProfileForm={handleSubmitProfileForm}
                                editForm={editForm} setEditForm={setEditFormWithCheck}
                                errorMessage={errorMessage}
                                follow={follow}
                                unFollow={unFollow}
                                isFollow={isFollow}
                                changePostText={handleChangePostText}
                                addPost={handleAddPost}/>
        }
    </>
}