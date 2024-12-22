import {UtilityProfileUserType} from 'redux/profileReducer';
import s from './UserInfoBody.module.scss';
import {Typography} from "components/Typography";
import {memo} from "react";
import {Button} from "components/Button";
import {Contacts} from "api/profile/profile.types";

type Props = {
    currentUserID: number | null
    uID?: number
    profile?: UtilityProfileUserType
    setEditForm: (value: boolean) => void
}

export const UserInfoBody = memo(({
                                      currentUserID,
                                      uID,
                                      profile,
                                      setEditForm
                                  }: Props) => {
    const enableEditForm = () => {
        setEditForm(true)
    }

    const isPageCurrentUser = uID === currentUserID

    return (

        <div className={s.userInfoBody}>

            <div className={s.title}>
                <Typography>Personal Information</Typography>
                {isPageCurrentUser && <Button variant={'secondary'} onClick={enableEditForm}>Change</Button>}
            </div>

            <ul className={s.personalInfoTable}>
                <li>
                    <label className={s.titleOption} onDoubleClick={enableEditForm}>Name: </label>
                    <Typography className={s.option} variant={'h3'} as={'div'} id={'fullName'}
                                onDoubleClick={enableEditForm}>{profile?.fullName}</Typography>
                </li>

                <li>
                    <label className={s.titleOption} onDoubleClick={enableEditForm}>Looking for a job:</label>
                    <Typography className={s.option} variant={'subtitle2'}
                                as={'div'}
                                onDoubleClick={enableEditForm}>{profile?.lookingForAJob ? 'Yes' : 'No'}</Typography>
                </li>
                <li>
                    <label className={s.titleOption} onDoubleClick={enableEditForm}>My professional skills:</label>
                    <Typography className={s.option} variant={'subtitle2'}
                                as={'div'}
                                onDoubleClick={enableEditForm}>{profile?.lookingForAJobDescription || 'not specified'}</Typography>
                </li>
                <li>
                    <label className={s.titleOption} onDoubleClick={enableEditForm}>About me: </label> <Typography
                    className={s.option} variant={'subtitle2'}
                    as={'div'} onDoubleClick={enableEditForm}>{profile?.aboutMe || 'not specified'}</Typography>
                </li>
                <li>
                    <label className={s.titleOption}
                           onDoubleClick={enableEditForm}>Contacts: </label>{profile?.contacts && (Object.keys(profile.contacts) as Array<keyof Contacts>).map(c => (
                    <div className={s.optionWrapper}>
                        <Typography key={c} as={'h5'} className={s.titleContact}>{c}:</Typography>
                        <Typography className={s.option} key={c}
                                    onDoubleClick={enableEditForm}>{profile.contacts![c] || 'not specified'}</Typography>
                    </div>
                )) || null}
                </li>

            </ul>

        </div>

    )
})
