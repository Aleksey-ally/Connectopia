import {UserAvatar} from 'components/UserAvatar';
import {setNewUserAvatar, UtilityProfileUserType} from 'redux/profileReducer';
import UserCover from 'imgs/userCover_1.jpg';
import s from './ProfileInformation.module.css';
import {ChangeEvent, memo} from "react";
import {AppThunkDispatch} from "redux/reduxStore";
import {UserInfoBody} from "pages/Profile/ProfileInformation/UserInfoBody";
import {UserInfoBodyForm} from "pages/Profile/ProfileInformation/UserInfoBodyForm";
import {ProfileUserResponseType} from "api/api.types";

type Props = {
    uID?: string
    profile?: UtilityProfileUserType
    status: string
    edit: boolean
    toggleEditHandler: () => void
    changeStatusHandler: (value: ChangeEvent<HTMLInputElement>) => void
    dispatch: AppThunkDispatch
    handleSubmitProfileForm: (userData: ProfileUserResponseType) => void
}

export const ProfileInformation = (({
                                        uID,
                                        profile,
                                        status,
                                        edit,
                                        changeStatusHandler,
                                        toggleEditHandler,
                                        dispatch,
                                        handleSubmitProfileForm
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
                    <UserInfoBodyForm profile={profile} status={status} edit={edit}
                                      toggleEditHandler={toggleEditHandler}
                                      changeStatusHandler={changeStatusHandler}
                                      handleSubmitProfileForm={handleSubmitProfileForm}/>

                </div>

            </div>

        </div>
    )
})