import {UserAvatar} from 'components/UserAvatar';
import {setNewUserAvatar, UtilityProfileUserType} from 'redux/profileReducer';
import UserCover from 'imgs/userCover_1.jpg';
import s from './ProfileInformation.module.css';
import {ChangeEvent, useState} from "react";
import {AppThunkDispatch} from "redux/reduxStore";
import {UserInfoBody} from "pages/Profile/ProfileInformation/UserInfoBody/UserInfoBody";
import {UserInfoBodyForm} from "pages/Profile/ProfileInformation/UserInfoBodyForm/UserInfoBodyForm";
import {ProfileUserResponseType} from "api/api.types";
import {Edit} from "assets/icons/Edit";

type Props = {
    uID?: string
    profile?: UtilityProfileUserType
    status: string
    edit: boolean
    toggleEditHandler: () => void
    changeStatusHandler: (value: ChangeEvent<HTMLInputElement>) => void
    dispatch: AppThunkDispatch
    handleSubmitProfileForm: (userData: ProfileUserResponseType) => void
    editForm: boolean
    setEditForm: (value: boolean) => void
    errorMessage: string[]
}

export const ProfileInformation = (({
                                        uID,
                                        profile,
                                        status,
                                        edit,
                                        changeStatusHandler,
                                        toggleEditHandler,
                                        dispatch,
                                        handleSubmitProfileForm,
                                        editForm,
                                        setEditForm,
                                        errorMessage
                                    }: Props) => {

    const [isEditVisible, setEditVisible] = useState<boolean>(false);

    const userAvatarSelected = (e: ChangeEvent<HTMLInputElement>) => {
        console.log()
        if (e.currentTarget.files) {
            dispatch(setNewUserAvatar(e.currentTarget.files[0]))
        }
    }

    const handleMouseOver = () => {
        setEditVisible(true)
    }

    const handleMouseOut = () => {
        setEditVisible(false)
    }

    const classNames = {
        userAvatar: `${s.userAvatar} ${isEditVisible ? s.opacity : ''}`
    }

    return (
        <div className={s.description}>

            <div className={s.userCover} style={{backgroundImage: `url(${UserCover})`}}>

                <div className={s.userInfo}>
                    <input id="avatarInput" className={s.fileUploader} type="file" onChange={userAvatarSelected}/>
                    <UserAvatar className={classNames.userAvatar} onMouseOver={handleMouseOver}
                                onMouseOut={handleMouseOut}
                                size={'large'}
                                photos={profile?.photos?.small}>

                        {!uID && isEditVisible &&
                            <label htmlFor="avatarInput" className={s.edit} onMouseOver={handleMouseOver}
                                   onMouseOut={handleMouseOut}>
                                <Edit/>
                            </label>
                        }

                    </UserAvatar>

                </div>

            </div>

            <div className={s.personalInfo}>

                {!editForm &&
                    <UserInfoBody profile={profile} status={status} changeStatusHandler={changeStatusHandler}
                                  toggleEditHandler={toggleEditHandler} edit={edit}
                                  setEditForm={setEditForm}/>}

                {editForm && <UserInfoBodyForm profile={profile} status={status} edit={edit}
                                               handleSubmitProfileForm={handleSubmitProfileForm}
                                               setEditForm={setEditForm} errorMessage={errorMessage}/>}
            </div>

        </div>
    )
})