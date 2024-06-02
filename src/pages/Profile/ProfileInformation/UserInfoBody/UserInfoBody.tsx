import {UtilityProfileUserType} from 'redux/profileReducer';
import s from './UserInfoBody.module.scss';
import {Typography} from "components/Typography";
import {memo} from "react";
import {Button} from "components/Button";

type Props = {
    profile?: UtilityProfileUserType
    setEditForm: (value: boolean) => void
}

export const UserInfoBody = memo(({
                                      profile,
                                      setEditForm
                                  }: Props) => {
    const enableEditForm = () => {
        setEditForm(true)
    }

    return (

        <div className={s.userInfoBody}>

            <div className={s.title}>
                <Typography>Personal Information</Typography>
                <Button onClick={enableEditForm}>Change</Button>
            </div>

            <ul className={s.personalInfoTable}>
                <li>
                    <div>
                        <label className={s.titleOption} onDoubleClick={enableEditForm}>Name: </label>
                        <Typography variant={'h3'} as={'div'} id={'fullName'}>{profile?.fullName}</Typography>
                    </div>
                </li>

                <li>
                    <div>
                        <label className={s.titleOption} onDoubleClick={enableEditForm}>Looking for a job:</label> <Typography variant={'subtitle2'}
                                                                      as={'div'}>{profile?.lookingForAJob}</Typography>
                    </div>
                </li>
                <li>
                    <div>
                        <label className={s.titleOption} onDoubleClick={enableEditForm}>My professional skills:</label> <Typography variant={'subtitle2'}
                                                                           as={'div'}>{profile?.lookingForAJobDescription}</Typography>
                    </div>
                </li>
                <li>
                    <div>
                        <label className={s.titleOption} onDoubleClick={enableEditForm}>About me: </label> <Typography variant={'subtitle2'}
                                                              as={'div'}>{profile?.aboutMe}</Typography>
                    </div>
                </li>
                <li>
                    <div>
                        <label className={s.titleOption} onDoubleClick={enableEditForm}>Contacts: </label>{(profile?.contacts && Object.keys(profile.contacts).map(c => (
                        <Typography key={c}>{profile.contacts[c] || 'не указано'}</Typography>
                    ))) || null}
                    </div>
                </li>

            </ul>

        </div>

    )
})