import { UtilityProfileUserType } from 'redux/profileReducer';
import ElephantBackground from '../../../imgs/ElephantBackground.png';
import s from './ProfileInformation.module.css';

type Props = {
  profile:UtilityProfileUserType
}

export const ProfileInformation = ({profile}:Props) => {
  return (
    <div className={s.description}>
      <img src={ElephantBackground} alt="Elephant background" />
      <div>
        <img src={profile.photos?.small} alt="" />
        Avatar + description
        </div>
    </div>
  )
}