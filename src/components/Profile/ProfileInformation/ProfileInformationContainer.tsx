import { useEffect } from 'react';
import axios from 'axios';
import { ProfileInformation } from './ProfileInformation';
import { useDispatch } from 'react-redux';
import { UtilityProfileUserType, setUserProfile } from 'redux/profileReducer';
import { useSelector } from 'react-redux';
import { ReducersType } from 'redux/reduxStore';
import { useParams } from 'react-router-dom';

type BaseResponseType<D = {}> = {
  data: D;
};

export type ProfileUserResponseType = {
  userId: number
  aboutMe: string
  contacts: {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
  }
  fullName: string
  lookingForAJob: boolean
  lookingForAJobDescription: string
  photos: {
    large: string
    small: string
  }
};

export const ProfileInformationContainer = () => {

  const profile = useSelector<ReducersType, UtilityProfileUserType>(state => state.profileData.profile)
  const dispatch = useDispatch()

  const { id } = useParams()

  useEffect(() => {
    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${id}`)
      .then((res: BaseResponseType<ProfileUserResponseType>) => {
        dispatch(setUserProfile(res.data))
      })
  }, [])

  return <ProfileInformation profile={profile} />
}