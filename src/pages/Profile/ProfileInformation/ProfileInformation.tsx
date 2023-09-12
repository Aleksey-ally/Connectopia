import { UserAvatar } from 'components/UserAvatar/UserAvatar';
import { UtilityProfileUserType } from 'redux/profileReducer';
import ElephantBackground from '../../../imgs/ElephantBackground.png';
import s from './ProfileInformation.module.css';

type Props = {
  profile: UtilityProfileUserType
}

export const ProfileInformation = ({ profile }: Props) => {
  return (
    <div className={s.description}>
      <img src={ElephantBackground} alt="Elephant background" />
      <div>
        <UserAvatar size={'medium'} photos={profile.photos?.small} /> 
       <ol>Name: {profile.fullName}</ol>
       <ol>About me: {profile.aboutMe}</ol>
       <ol>Looking job: {profile.lookingForAJob}</ol>
       <ol>Description: {profile.lookingForAJobDescription}</ol>
        <div>
          Contacts:
          <ol>{profile.contacts?.facebook}</ol>
          <ol>{profile.contacts?.github}</ol>
          <ol>{profile.contacts?.instagram}</ol>
          <ol>{profile.contacts?.mainLink}</ol>
          <ol>{profile.contacts?.twitter}</ol>
          <ol>{profile.contacts?.vk}</ol>
          <ol>{profile.contacts?.website}</ol>
          <ol>{profile.contacts?.youtube}</ol>
        </div>
      </div>
    </div>
  )
}