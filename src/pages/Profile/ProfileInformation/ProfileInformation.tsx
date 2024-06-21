import {UserAvatar} from 'components/UserAvatar';
import {setNewUserAvatar, UtilityProfileUserType} from 'redux/profileReducer';
import UserCover from 'imgs/userCover_1.jpg';
import s from 'pages/Profile/ProfileInformation/ProfileInformation.module.scss';
import {ChangeEvent, useState} from "react";
import {AppThunkDispatch} from "redux/reduxStore";
import {UserInfoBody} from "pages/Profile/ProfileInformation/UserInfoBody/UserInfoBody";
import {UserInfoBodyForm} from "pages/Profile/ProfileInformation/UserInfoBodyForm/UserInfoBodyForm";
import {ProfileUserResponseType} from "api/api.types";
import {Edit} from "assets/icons/Edit";
import {TextField} from "components/TextField";
import {Typography} from "components/Typography";

type Props = {
    currentUserID: number | null
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
                                        currentUserID,
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

                    {edit &&
                        <div>
                            <label>Status: </label>
                            <TextField onBlur={toggleEditHandler} autoFocus value={status}
                                       onChange={changeStatusHandler}/>
                        </div>
                    }
                    {!edit &&
                        <div>
                            <label className={s.statusTitle} htmlFor={'status'} onDoubleClick={toggleEditHandler}>Status: </label>
                            <Typography id={'status'} className={s.status} variant={'subtitle2'}
                                        as={'div'}
                                        onDoubleClick={toggleEditHandler}>{status}</Typography>
                        </div>
                    }

                </div>

            </div>

            <div className={s.personalInfo}>

                {!editForm &&
                    <UserInfoBody currentUserID={currentUserID} uID={uID} profile={profile} setEditForm={setEditForm}/>}

                {editForm && <UserInfoBodyForm profile={profile}
                                               handleSubmitProfileForm={handleSubmitProfileForm}
                                               errorMessage={errorMessage}/>}
            </div>

        </div>
    )
})