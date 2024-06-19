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
                <Button variant={'secondary'} onClick={enableEditForm}>Change</Button>
            </div>

            <ul className={s.personalInfoTable}>
                <li>
                    <label className={s.titleOption} onDoubleClick={enableEditForm}>Name: </label>
                    <Typography className={s.option} variant={'h3'} as={'div'} id={'fullName'}
                                onDoubleClick={enableEditForm}>{profile?.fullName}</Typography>
                </li>

                <li>
                    <label className={s.titleOption} onDoubleClick={enableEditForm}>Looking for a job:</label>
                    <Typography variant={'subtitle2'}
                                as={'div'}>{profile?.lookingForAJob ? 'Yes' : 'No'}</Typography>
                </li>
                <li>
                    <label className={s.titleOption} onDoubleClick={enableEditForm}>My professional skills:</label>
                    <Typography className={s.option} variant={'subtitle2'}
                                as={'div'}
                                onDoubleClick={enableEditForm}>{profile?.lookingForAJobDescription}</Typography>
                </li>
                <li>
                    <label className={s.titleOption} onDoubleClick={enableEditForm}>About me: </label> <Typography
                    className={s.option} variant={'subtitle2'}
                    as={'div'} onDoubleClick={enableEditForm}>{profile?.aboutMe}</Typography>
                </li>
                <li>
                    <label className={s.titleOption}
                           onDoubleClick={enableEditForm}>Contacts: </label>{(profile?.contacts && Object.keys(profile.contacts).map(c => (
                    <Typography className={s.option} key={c}
                                onDoubleClick={enableEditForm}>{profile.contacts[c] || 'не указано'}</Typography>
                ))) || null}
                </li>

            </ul>

        </div>

    )
})