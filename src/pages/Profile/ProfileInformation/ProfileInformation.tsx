import {Avatar} from 'components/Avatar';
import {ProfileDataType, setNewUserAvatar} from 'redux/profileReducer';
import UserCover from 'assets/imgs/userCover_1.jpg';
import s from 'pages/Profile/ProfileInformation/ProfileInformation.module.scss';
import {ChangeEvent, useState} from "react";
import {AppThunkDispatch} from "redux/reduxStore";
import {UserInfoBody} from "pages/Profile/ProfileInformation/UserInfoBody/UserInfoBody";
import {UserInfoBodyForm} from "pages/Profile/ProfileInformation/UserInfoBodyForm/UserInfoBodyForm";
import {Edit} from "assets/icons/Edit";
import {TextField} from "components/TextField";
import {Typography} from "components/Typography";
import {toast} from "react-toastify";
import {errorOptions, successOptions} from "utils/ToastifyOptions/ToastifyOptions";
import {Button} from "components/Button";
import {ProfileUserResponseType} from "api/profile/profile.types";
import {Send} from "assets/icons";

type Props = {
    currentUserID: number | null
    uID?: number
    profileData?: ProfileDataType
    status: string
    edit: boolean
    toggleEditHandler: () => void
    changeStatusHandler: (value: ChangeEvent<HTMLInputElement>) => void
    dispatch: AppThunkDispatch
    handleSubmitProfileForm: (userData: ProfileUserResponseType) => void
    editForm: boolean
    setEditForm: (value: boolean) => void
    errorMessage: string[]
    follow: (userID: number) => void
    unFollow: (userID: number) => void
    isFollow: boolean
    changePostText: (newText: string) => void
    addPost: () => void
}

export const ProfileInformation = (({
                                        currentUserID, uID, profileData,
                                        status, edit, changeStatusHandler,
                                        toggleEditHandler, dispatch,
                                        handleSubmitProfileForm, editForm,
                                        setEditForm, errorMessage, follow,
                                        unFollow, isFollow, changePostText,
                                        addPost
                                    }: Props) => {

    const [isEditVisible, setEditVisible] = useState<boolean>(false);
    const userAvatarSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            dispatch(setNewUserAvatar(e.currentTarget.files[0]))
                .then((message) => {
                    if (message) {
                        toast.error(message, errorOptions)
                    } else {
                        toast.success('You are successfully changed avatar', successOptions)
                    }

                })
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

                <div className={s.userWrapper}>
                    <div className={s.userInfo}>
                        <input id="avatarInput" className={s.fileUploader} type="file" onChange={userAvatarSelected}/>
                        <div className={classNames.userAvatar}>
                            <Avatar onMouseOver={handleMouseOver}
                                    onMouseOut={handleMouseOut}
                                    size={'large'}
                                    photo={profileData?.profile?.photos?.small}>

                                {uID === currentUserID && isEditVisible &&
                                    <label htmlFor="avatarInput" className={s.edit} onMouseOver={handleMouseOver}
                                           onMouseOut={handleMouseOut}>
                                        <Edit/>
                                    </label>
                                }
                            </Avatar>
                        </div>

                        {edit &&
                            <div>
                                <label>Status</label>
                                <TextField onBlur={toggleEditHandler} autoFocus value={status}
                                           onChange={changeStatusHandler}/>
                            </div>
                        }
                        {!edit &&
                            <div>
                                <label className={s.statusTitle} htmlFor={'status'}
                                       onDoubleClick={toggleEditHandler}>Status</label>
                                <Typography id={'status'} className={s.status} variant={'subtitle2'}
                                            as={'div'}
                                            onDoubleClick={toggleEditHandler}>{status}</Typography>
                            </div>
                        }
                    </div>

                    {currentUserID !== uID && <div className={s.buttonsPanel}>
                        {isFollow
                            ? <Button variant={'secondary'} onClick={() => {
                                unFollow(uID!)
                            }}>Unfollow
                            </Button>
                            : <Button onClick={() => {
                                follow(uID!)
                            }}>Follow</Button>}
                    </div>}
                </div>
            </div>

            <div className={s.personalInfo}>

                {!editForm &&
                    <UserInfoBody currentUserID={currentUserID} uID={uID} profile={profileData?.profile}
                                  setEditForm={setEditForm}/>}

                {editForm && <UserInfoBodyForm profile={profileData?.profile}
                                               handleSubmitProfileForm={handleSubmitProfileForm}
                                               errorMessage={errorMessage}/>}
            </div>

            {currentUserID === uID && <div className={s.posts}>
                <TextField placeholder={'Write something...'} value={profileData?.textPost}
                           onValueChange={changePostText}></TextField>
                <Button variant={'tertiary'} onClick={addPost}><Send/></Button>
                {profileData?.postData.map(p => {
                    return <div key={p.id} className={s.post}>{p.message}</div>
                })}
            </div>}

        </div>
    )
})