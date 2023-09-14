import { profileAPI } from 'api/api';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { UtilityProfileUserType, setUserProfile } from 'redux/profileReducer';
import { ReducersType } from 'redux/reduxStore';
import { ProfileInformation } from './ProfileInformation';

export const ProfileInformationContainer = () => {

  const profile = useSelector<ReducersType, UtilityProfileUserType>(state => state.profileData.profile)
  const currentUserID = useSelector<ReducersType, number | null>(state => state.auth.id)
  const dispatch = useDispatch()

  let { uID } = useParams()

  if (!uID) {
    uID = currentUserID?.toString()
  }

  useEffect(() => {
    profileAPI.getProfile(uID as string)
      .then(data => {
        dispatch(setUserProfile(data))
      })
  }, [])

  return <ProfileInformation profile={profile} />
}