import {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {changeUserStatus, getUserProfile, getUserStatus, ProfileDataType, updateProfile} from 'redux/profileReducer';
import {ReducersType, useAppDispatch} from 'redux/reduxStore';
import {ProfileInformation} from './ProfileInformation';
import {ProfileUserResponseType} from "api/api.types";

export const ProfileInformationContainer = () => {
    const dispatch = useAppDispatch()


    const {profile, status} = useSelector<ReducersType, ProfileDataType>(state => state.profileData)
    const currentUserID = useSelector<ReducersType, number | null>(state => state.auth.id)

    const [localStatus, setLocalStatus] = useState<string>('')
    const [editStatus, setEditStatus] = useState<boolean>(false)
    const [editForm, setEditForm] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string[]>([])

    const toggleEditHandler = useCallback(() => {
        Number(uID) === currentUserID && setEditStatus(!editStatus)
        status !== localStatus && dispatch(changeUserStatus(localStatus))
    }, [editStatus, localStatus])

    const changeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setLocalStatus(e.currentTarget.value)
    }, [localStatus])

    const setEditFormWithCheck = (value:boolean) => {
       if (currentUserID === Number(uID)) return setEditForm(value)
    }

    const handleSubmitProfileForm = (userData: ProfileUserResponseType) => {
        dispatch(updateProfile(userData))
            .then(message => {
                if (message) {
                    setErrorMessage(message)
                } else {
                    setEditForm(false)
                }
            })
    }

    const {uID} = useParams()

    const userID = Number(uID) || currentUserID

    useEffect(() => {
        if (userID === null) return

        dispatch(getUserProfile(userID))
        dispatch(getUserStatus(userID))
        setLocalStatus(status)

    }, [userID, status])

    return <ProfileInformation currentUserID={currentUserID}
                               uID={uID} profile={profile} status={localStatus} edit={editStatus}
                               toggleEditHandler={toggleEditHandler}
                               changeStatusHandler={changeStatusHandler}
                               dispatch={dispatch}
                               handleSubmitProfileForm={handleSubmitProfileForm}
                               editForm={editForm} setEditForm={setEditFormWithCheck}
                               errorMessage={errorMessage}/>
}