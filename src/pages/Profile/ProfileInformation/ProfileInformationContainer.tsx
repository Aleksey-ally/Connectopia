import {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {changeUserStatus, getUserProfile, getUserStatus, ProfileDataType, updateProfile} from 'redux/profileReducer';
import {ReducersType, useAppDispatch} from 'redux/reduxStore';
import {ProfileInformation} from './ProfileInformation';
import {profileAPI} from "api/api";
import {ProfileUserResponseType} from "api/api.types";

export const ProfileInformationContainer = () => {
    const dispatch = useAppDispatch()


    const {profile, status} = useSelector<ReducersType, ProfileDataType>(state => state.profileData)
    const currentUserID = useSelector<ReducersType, number | null>(state => state.auth.id)

    const [localStatus, setLocalStatus] = useState<string>('')
    const [edit, setEdit] = useState<boolean>(false)

    const toggleEditHandler = useCallback(() => {
        setEdit(!edit)
        status !== localStatus && dispatch(changeUserStatus(localStatus))
    }, [edit, localStatus])
    const changeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setLocalStatus(e.currentTarget.value)
    }, [localStatus])
    const handleSubmitProfileForm = (userData:ProfileUserResponseType) => {
        dispatch(updateProfile(userData))
    }


    const {uID} = useParams()

    const userID = Number(uID) || currentUserID

    useEffect(() => {
        if (userID === null) return

        dispatch(getUserProfile(userID))
        dispatch(getUserStatus(userID))
        setLocalStatus(status)

    }, [userID, status])

    return <ProfileInformation uID={uID} profile={profile} status={localStatus} edit={edit}
                               toggleEditHandler={toggleEditHandler}
                               changeStatusHandler={changeStatusHandler}
                               dispatch={dispatch}
                               handleSubmitProfileForm={handleSubmitProfileForm}/>
}