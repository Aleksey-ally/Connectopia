import {UtilityProfileUserType} from 'redux/profileReducer';
import s from 'pages/Profile/ProfileInformation/ProfileInformation.module.css';
import {TextField} from "components/TextField";
import {memo, useEffect} from "react";
import {Checkbox} from "components/Checkbox";
import {useController, useForm} from "react-hook-form";
import {ProfileUserResponseType} from "api/api.types";
import {Typography} from "components/Typography";

type Props = {
    profile?: UtilityProfileUserType
    status: string
    edit: boolean
    handleSubmitProfileForm: (userData: ProfileUserResponseType) => void
    setEditForm: (value: boolean) => void
    errorMessage: string[]
}


export const UserInfoBodyForm = memo(({
                                          profile,
                                          status,
                                          handleSubmitProfileForm,
                                          setEditForm,
                                          errorMessage
                                      }: Props) => {
    const {control, register, handleSubmit, formState: {errors}} = useForm<ProfileUserResponseType>();

    const {field} = useController({
        name: 'lookingForAJob',
        control,
        defaultValue: profile?.lookingForAJob
    });

    useEffect(() => {
        if (profile && profile.lookingForAJob !== undefined) {
            field.onChange(profile.lookingForAJob);
        }
    }, [profile, field]);

    const classes = {
        form: `${s.userInfoBody} ${errorMessage.length && s.errorForm}`
    }

    return (
        <form className={classes.form} onSubmit={handleSubmit(handleSubmitProfileForm)}>

            <div className={s.title}>
                <Typography>Personal Information</Typography>
                <button>Save</button>
            </div>

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
                <Checkbox label={<b>Looking for a job:</b>} {...register('lookingForAJob')}
                          onValueChange={field.onChange}
                          checked={field.value}/>
            </div>
            <div>
                <b>My professional skills:</b> <TextField {...register('lookingForAJobDescription')}
                                                          defaultValue={profile?.lookingForAJobDescription}/>
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
            {errorMessage && errorMessage.map((mes) => {
                return <div className={s.errorMessage}>{mes}</div>
            })}
        </form>
    )
})