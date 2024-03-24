import {UtilityProfileUserType} from 'redux/profileReducer';
import s from './ProfileInformation.module.css';
import {TextField} from "components/TextField";
import {ChangeEvent, memo} from "react";
import {Checkbox} from "components/Checkbox";
import {useForm} from "react-hook-form";
import {ProfileUserResponseType} from "api/api.types";

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

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<ProfileUserResponseType>()

    const onSubmit = (e: ProfileUserResponseType) => {
        console.log(e)
    }

    return (
        <form className={s.userInfoBody} onSubmit={handleSubmit(onSubmit)}>
            <button>Save</button>
            <div>
                <b>Name: </b>
                <TextField value={profile?.fullName} {...register('fullName')}/>
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
                <b>My professional skills:</b> <TextField {...register('lookingForAJobDescription')}/>
            </div>
            <div>
                <b>About me: </b> <TextField {...register('aboutMe')} value={profile?.aboutMe}/>
            </div>
            <div>
                <b>Contacts: </b>
                {Object.entries(profile?.contacts || {}).map(([key, value]) => (
                    <TextField
                        key={key}
                        {...register(`contacts.${key}` as keyof ProfileUserResponseType)}
                        defaultValue={value || 'не указано'}
                    />
                ))}
            </div>
        </form>
    )
})