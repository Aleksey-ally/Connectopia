import {UtilityProfileUserType} from 'redux/profileReducer';
import s from 'pages/Profile/ProfileInformation/ProfileInformation.module.css';
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
                        <label>Name: </label>
                        <Typography variant={'h3'} as={'div'} id={'fullName'}>{profile?.fullName}</Typography>
                    </div>
                </li>

                <li>
                    <div>
                        <label>Looking for a job:</label> <Typography variant={'subtitle2'}
                                                                      as={'div'}>{profile?.lookingForAJob}</Typography>
                    </div>
                </li>
                <li>
                    <div>
                        <label>My professional skills:</label> <Typography variant={'subtitle2'}
                                                                           as={'div'}>{profile?.lookingForAJobDescription}</Typography>
                    </div>
                </li>
                <li>
                    <div>
                        <label>About me: </label> <Typography variant={'subtitle2'}
                                                              as={'div'}>{profile?.aboutMe}</Typography>
                    </div>
                </li>
                <li>
                    <div>
                        <label>Contacts: </label>{(profile?.contacts && Object.keys(profile.contacts).map(c => (
                        <Typography key={c}>{profile.contacts[c] || 'не указано'}</Typography>
                    ))) || null}
                    </div>
                </li>

            </ul>


        </div>

    )
})