import {UserAvatar} from 'components/UserAvatar/UserAvatar';
import {UtilityProfileUserType} from 'redux/profileReducer';
import UserCover from 'imgs/userCover_1.jpg';
import s from './ProfileInformation.module.css';
import {Typography} from "components/Typography/Typography";

type Props = {
    profile: UtilityProfileUserType
}

export const ProfileInformation = ({profile}: Props) => {
    return (
        <div className={s.description}>
            <div className={s.userCover} style={{backgroundImage: `url(${UserCover})`}}>
                <div className={s.userInfo}>
                    <UserAvatar className={s.userAvatar} size={'medium'} photos={profile.photos?.small}/>
                    <div className={s.userInfoBody}>
                        <Typography variant={'h3'}>{profile.fullName}</Typography>
                        <Typography variant={'subtitle2'}>Status</Typography>
                    </div>
                </div>
            </div>


        </div>
    )
}