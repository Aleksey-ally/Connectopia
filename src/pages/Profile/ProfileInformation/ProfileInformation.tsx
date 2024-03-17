import {UserAvatar} from 'components/UserAvatar';
import {setNewUserAvatar, UtilityProfileUserType} from 'redux/profileReducer';
import UserCover from 'imgs/userCover_1.jpg';
import s from './ProfileInformation.module.css';
import {Typography} from "components/Typography";
import {TextField} from "components/TextField";
import {ChangeEvent, memo} from "react";
import {AppThunkDispatch} from "redux/reduxStore";

type Props = {
    uID?: string
    profile?: UtilityProfileUserType
    status: string
    edit: boolean
    toggleEditHandler: () => void
    changeStatusHandler: (value: ChangeEvent<HTMLInputElement>) => void
    dispatch: AppThunkDispatch
}

export const ProfileInformation = memo(({
                                            uID,
                                            profile,
                                            status,
                                            edit,
                                            changeStatusHandler,
                                            toggleEditHandler,
                                            dispatch
                                        }: Props) => {
    const userAvatarSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files){
            dispatch(setNewUserAvatar(e.currentTarget.files[0]))
        }
    }

    return (
        <div className={s.description}>

            <div className={s.userCover} style={{backgroundImage: `url(${UserCover})`}}>

                <div className={s.userInfo}>

                    <UserAvatar className={s.userAvatar} size={'medium'} photos={profile?.photos?.small}/>
                    {!uID && <input type="file" onChange={userAvatarSelected}/>}
                    <div className={s.userInfoBody}>
                        <Typography variant={'h3'}>{profile?.fullName}</Typography>
                        {edit &&
                            <TextField onBlur={toggleEditHandler} autoFocus value={status}
                                       onChange={changeStatusHandler}/>}
                        {!edit &&
                            <Typography variant={'subtitle2'} onDoubleClick={toggleEditHandler}>{status}</Typography>}
                    </div>

                </div>

            </div>

        </div>
    )
})