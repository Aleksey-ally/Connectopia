import {profileAPI} from 'api/api';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {UtilityProfileUserType, setUserProfile} from 'redux/profileReducer';
import {ReducersType} from 'redux/reduxStore';
import {ProfileInformation} from './ProfileInformation';

export const ProfileInformationContainer = () => {

    const profile = useSelector<ReducersType, UtilityProfileUserType>(state => state.profileData.profile)
    const currentUserID = useSelector<ReducersType, number | null>(state => state.auth.id)
    const dispatch = useDispatch()

    let {uID} = useParams()

    const userID = Number(uID) || currentUserID

    useEffect(() => {
        if(userID === null) return

        profileAPI.getProfile(userID as number)
            .then(data => {
                dispatch(setUserProfile(data))
            })
    }, [userID])

    return <ProfileInformation profile={profile}/>
}