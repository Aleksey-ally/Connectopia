import {UserAvatar} from 'components/UserAvatar';
import {UtilityProfileUserType} from 'redux/profileReducer';
import UserCover from 'imgs/userCover_1.jpg';
import s from './ProfileInformation.module.css';
import {Typography} from "components/Typography";
import {TextField} from "components/TextField";
import {ChangeEvent} from "react";

type Props = {
    profile: UtilityProfileUserType
    status: string
    edit:boolean
    toggleEditHandler: () => void
    changeStatusHandler: (value:ChangeEvent<HTMLInputElement>) => void
}

export const ProfileInformation = ({profile, status, edit, changeStatusHandler, toggleEditHandler}: Props) => {

    return (
        <div className={s.description}>

            <div className={s.userCover} style={{backgroundImage: `url(${UserCover})`}}>

                <div className={s.userInfo}>

                    <UserAvatar className={s.userAvatar} size={'medium'} photos={profile.photos?.small}/>
                    <div className={s.userInfoBody}>
                        <Typography variant={'h3'}>{profile.fullName}</Typography>
                        {edit &&
                            <TextField onBlur={toggleEditHandler} autoFocus value={status} onChange={changeStatusHandler}/>}
                        {!edit &&
                            <Typography variant={'subtitle2'} onDoubleClick={toggleEditHandler}>{status}</Typography>}
                    </div>

                </div>

            </div>

        </div>
    )
}