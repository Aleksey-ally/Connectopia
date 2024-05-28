import {UtilityProfileUserType} from 'redux/profileReducer';
import s from 'pages/Profile/ProfileInformation/ProfileInformation.module.scss';
import {TextField} from "components/TextField";
import {memo, useEffect} from "react";
import {Checkbox} from "components/Checkbox";
import {useController, useForm} from "react-hook-form";
import {ProfileUserResponseType} from "api/api.types";
import {Typography} from "components/Typography";

type Props = {
    profile?: UtilityProfileUserType
    handleSubmitProfileForm: (userData: ProfileUserResponseType) => void
    errorMessage: string[]
}


export const UserInfoBodyForm = memo(({
                                          profile,
                                          handleSubmitProfileForm,
                                          errorMessage
                                      }: Props) => {
    const {control, register, handleSubmit} = useForm<ProfileUserResponseType>();

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
                <label htmlFor='fullName'><b>Name: </b></label>
                <TextField id='fullName' {...register('fullName')} defaultValue={profile?.fullName}/>
            </div>
            <div>
                <Checkbox label={<b>Looking for a job:</b>} {...register('lookingForAJob')}
                          onValueChange={field.onChange}
                          checked={field.value}/>
            </div>
            <div>
                <label htmlFor="lookingForAJobDescription"><b>My professional skills:</b></label><TextField id='lookingForAJobDescription' {...register('lookingForAJobDescription')}
                                                         defaultValue={profile?.lookingForAJobDescription}/>
            </div>
            <div>
                <label htmlFor="aboutMe"><b>About me: </b></label> <TextField id='aboutMe' {...register('aboutMe')}
                                                                              defaultValue={profile?.aboutMe}/>
            </div>
            <div>
                <label htmlFor="contacts"><b>Contacts: </b></label>
                {Object.entries(profile?.contacts || {}).map(([key, value]) => (
                    <TextField
                        id='contacts'
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