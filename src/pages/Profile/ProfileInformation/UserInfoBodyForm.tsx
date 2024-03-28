import {UtilityProfileUserType} from 'redux/profileReducer';
import s from './ProfileInformation.module.css';
import {TextField} from "components/TextField";
import {ChangeEvent, memo, useEffect} from "react";
import {Checkbox} from "components/Checkbox";
import {useController, useForm} from "react-hook-form";
import {ProfileUserResponseType} from "api/api.types";

type Props = {
    profile?: UtilityProfileUserType
    status: string
    edit: boolean
    toggleEditHandler: () => void
    changeStatusHandler: (value: ChangeEvent<HTMLInputElement>) => void
    handleSubmitProfileForm: (userData: ProfileUserResponseType) => void
}



export const UserInfoBodyForm = memo(({
                                          profile,
                                          status,
                                          toggleEditHandler,
                                          changeStatusHandler,
                                          handleSubmitProfileForm
                                      }: Props) => {
    console.log(profile?.lookingForAJob)

    const { control, register, handleSubmit, formState: { errors } } = useForm<ProfileUserResponseType>();

    const { field } = useController({
        name: 'lookingForAJob',
        control,
        defaultValue: profile?.lookingForAJob
    });

    useEffect(() => {
        if (profile && profile.lookingForAJob !== undefined) {
            field.onChange(profile.lookingForAJob);
        }
    }, [profile, field]);

    return (
        <form className={s.userInfoBody} onSubmit={handleSubmit(handleSubmitProfileForm)}>
            <button>Save</button>
            <div>
                <b>Name: </b>
                <TextField {...register('fullName')} defaultValue={profile?.fullName}/>
            </div>
            <div>
                <b>Status: </b>
                <TextField value={status}
                           name={'status'}/>
            </div>
            <div>
                <Checkbox label={<b>Looking for a job:</b>} {...register('lookingForAJob')} onValueChange={field.onChange}
                          checked={field.value}/>
            </div>
            <div>
                <b>My professional skills:</b> <TextField {...register('lookingForAJobDescription')} defaultValue={profile?.lookingForAJobDescription}/>
            </div>
            <div>
                <b>About me: </b> <TextField {...register('aboutMe')} defaultValue={profile?.aboutMe}/>
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