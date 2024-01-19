import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {getUserProfile, getUserStatus, ProfileDataType} from 'redux/profileReducer';
import {ReducersType, useAppDispatch} from 'redux/reduxStore';
import {ProfileInformation} from './ProfileInformation';

export const ProfileInformationContainer = () => {

    const {profile, status} = useSelector<ReducersType, ProfileDataType>(state => state.profileData)
    const currentUserID = useSelector<ReducersType, number | null>(state => state.auth.id)
    const dispatch = useAppDispatch()

    const {uID} = useParams()

    const userID = Number(uID) || currentUserID

    useEffect(() => {
        if (userID === null) return

        dispatch(getUserProfile(userID))
        dispatch(getUserStatus(userID))

    }, [userID])

    return <ProfileInformation profile={profile} status={status}/>
}