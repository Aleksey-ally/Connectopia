import {UtilityProfileUserType} from 'redux/profileReducer';
import s from './UserInfoBodyForm.module.scss';
import {TextField} from "components/TextField";
import {memo} from "react";
import {Checkbox} from "components/Checkbox";
import {useController, useForm} from "react-hook-form";
import {Typography} from "components/Typography";
import {Button} from "components/Button";
import {ProfileUserResponseType} from "api/profile/profile.types";
import {useTranslation} from "react-i18next";

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

    const { t } = useTranslation();

    return (
        <form className={classes.form} onSubmit={handleSubmit(handleSubmitProfileForm)}>
            <div className={s.title}>
                <Typography>{t('profilePage.personInfo')}</Typography>
                <Button variant={'tertiary'}>{t('profilePage.saveBtn')}</Button>
            </div>

            <ul className={s.personalInfoTable}>
                <li>
                    <label className={s.titleOption} htmlFor='fullName'><b>{t('profilePage.name')}</b></label>
                    <TextField id='fullName' {...register('fullName')} defaultValue={profile?.fullName}/>
                </li>
                <li className={s.checkboxInfo}>
                    <Checkbox label={<b>{t('profilePage.lookingJob')}</b>} {...register('lookingForAJob')}
                              onValueChange={field.onChange}
                              checked={field.value}/>
                </li>
                <li>
                    <label className={s.titleOption} htmlFor="lookingForAJobDescription"><b>{t('profilePage.mySkills')}</b></label><TextField
                    id='lookingForAJobDescription' {...register('lookingForAJobDescription')}
                    defaultValue={profile?.lookingForAJobDescription}/>
                </li>
                <li>
                    <label className={s.titleOption} htmlFor="aboutMe"><b>{t('profilePage.aboutMe')}</b></label> <TextField
                    id='aboutMe' {...register('aboutMe')}
                    defaultValue={profile?.aboutMe}/>
                </li>
                <li>
                    <label className={s.titleOption} htmlFor="contacts"><b>{t('profilePage.contacts')}</b></label>
                    {Object.entries(profile?.contacts || {}).map(([key, value]) => (
                        <>
                            <Typography key={key} as={'h5'} className={s.titleContact}>{key}:</Typography>
                            <TextField
                                id='contacts'
                                key={value}
                                {...register(`contacts.${key}` as keyof ProfileUserResponseType)}
                                defaultValue={value}
                            />
                        </>
                    ))}
                </li>
            </ul>

            {errorMessage && errorMessage.map((mes) => {
                return <div className={s.errorMessage}>{mes}</div>
            })}
        </form>
    )
})