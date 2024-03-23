import {UtilityProfileUserType} from 'redux/profileReducer';
import s from './ProfileInformation.module.css';
import {TextField} from "components/TextField";
import {ChangeEvent, memo} from "react";
import {Checkbox} from "components/Checkbox";

type Props = {
    profile?: UtilityProfileUserType
    status: string
    edit: boolean
    toggleEditHandler: () => void
    changeStatusHandler: (value: ChangeEvent<HTMLInputElement>) => void
}

export const UserInfoBodyForm = memo(({
                                          profile,
                                          status,
                                          toggleEditHandler,
                                          changeStatusHandler
                                      }: Props) => {

    return (
        <form className={s.userInfoBody} onSubmit={(e) => {
            e.preventDefault()
            console.log(e.target)
        }}>
            <button>Save</button>
            <div>
                <b>Name: </b>
                <TextField value={profile?.fullName} name={'fullName'}/>
            </div>
            <div>
                <b>Status: </b>
                <TextField value={status}
                           name={'status'}/>
            </div>
            <div>
                <b>Looking for a job:</b> <Checkbox checked={profile?.lookingForAJob}/>
            </div>
            <div>
                <b>My professional skills:</b> <TextField value={profile?.lookingForAJobDescription}/>
            </div>
            <div>
                <b>About me: </b> <TextField value={profile?.aboutMe}/>
            </div>
            <div>
                <b>Contacts: </b>{(profile?.contacts && Object.keys(profile.contacts).map(c => (
                <TextField key={c} value={profile.contacts[c] || 'не указано'}/>
            ))) || null}
            </div>
        </form>
    )
})