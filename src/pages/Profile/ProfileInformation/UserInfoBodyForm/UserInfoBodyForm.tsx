import {UtilityProfileUserType} from 'redux/profileReducer';
import s from './UserInfoBodyForm.module.scss';
import {TextField} from "components/TextField";
import {memo, useEffect} from "react";
import {Checkbox} from "components/Checkbox";
import {useController, useForm} from "react-hook-form";
import {ProfileUserResponseType} from "api/api.types";
import {Typography} from "components/Typography";
import {Button} from "components/Button";

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

    const classes = {
        form: `${s.userInfoBody} ${errorMessage.length && s.errorForm}`
    }

    return (
        <form className={classes.form} onSubmit={handleSubmit(handleSubmitProfileForm)}>
            <div className={s.title}>
                <Typography>Personal Information</Typography>
                <Button variant={'tertiary'}>Save</Button>
            </div>

            <ul className={s.personalInfoTable}>
                <li>
                    <label className={s.titleOption} htmlFor='fullName'><b>Name: </b></label>
                    <TextField id='fullName' {...register('fullName')} defaultValue={profile?.fullName}/>
                </li>
                <li>
                    <Checkbox label={<b>Looking for a job:</b>} {...register('lookingForAJob')}
                              onValueChange={field.onChange}
                              checked={field.value}/>
                </li>
                <li>
                    <label className={s.titleOption} htmlFor="lookingForAJobDescription"><b>My professional skills:</b></label><TextField
                    id='lookingForAJobDescription' {...register('lookingForAJobDescription')}
                    defaultValue={profile?.lookingForAJobDescription}/>
                </li>
                <li>
                    <label className={s.titleOption} htmlFor="aboutMe"><b>About me: </b></label> <TextField
                    id='aboutMe' {...register('aboutMe')}
                    defaultValue={profile?.aboutMe}/>
                </li>
                <li>
                    <label className={s.titleOption} htmlFor="contacts"><b>Contacts: </b></label>
                    {Object.entries(profile?.contacts || {}).map(([key, value]) => (
                        <TextField
                            id='contacts'
                            key={key}
                            {...register(`contacts.${key}` as keyof ProfileUserResponseType)}
                            defaultValue={value || 'не указано'}
                        />
                    ))}
                </li>
            </ul>

            {errorMessage && errorMessage.map((mes) => {
                return <div className={s.errorMessage}>{mes}</div>
            })}
        </form>
    )
})