import {UserAvatar} from 'components/UserAvatar';
import {setNewUserAvatar, UtilityProfileUserType} from 'redux/profileReducer';
import UserCover from 'imgs/userCover_1.jpg';
import s from './ProfileInformation.module.css';
import {Typography} from "components/Typography";
import {TextField} from "components/TextField";
import {ChangeEvent, memo, ReactNode} from "react";
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
        if (e.currentTarget.files) {
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
                        <div>
                            <b>Name: </b>
                            <Typography variant={'h3'} as={'span'}>{profile?.fullName}</Typography>
                        </div>
                        {edit &&
                            <div>
                                <b>Status: </b>
                                <TextField onBlur={toggleEditHandler} autoFocus value={status}
                                           onChange={changeStatusHandler}/>
                            </div>
                        }

                        {!edit &&
                            <div>
                                <b>Status: </b>
                                <Typography variant={'subtitle2'}
                                            as={'span'}
                                            onDoubleClick={toggleEditHandler}>{status}</Typography>
                            </div>
                        }
                        <div>
                            <b>Looking for a job:</b> <Typography variant={'subtitle2'}
                                                                  as={'span'}>{profile?.lookingForAJob}</Typography>
                        </div>
                        <div>
                            <b>My professional skills:</b> <Typography variant={'subtitle2'}
                                                                       as={'span'}>{profile?.lookingForAJobDescription}</Typography>
                        </div>
                        <div>
                            <b>About me: </b> <Typography variant={'subtitle2'}
                                                          as={'span'}>{profile?.aboutMe}</Typography>
                        </div>
                        <div>
                            <b>Contacts: </b>{(profile?.contacts && Object.keys(profile.contacts).map(c => (
                            <Typography key={c}>{profile.contacts[c] || 'не указано'}</Typography>
                        ))) || null}
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
})