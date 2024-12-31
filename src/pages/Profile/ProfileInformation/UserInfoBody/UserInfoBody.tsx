import {UtilityProfileUserType} from 'redux/profileReducer';
import s from './UserInfoBody.module.scss';
import {Typography} from "components/Typography";
import {memo} from "react";
import {Button} from "components/Button";
import {Contacts} from "api/profile/profile.types";
import {useTranslation} from "react-i18next";

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

    const { t } = useTranslation();


    return (

        <div className={s.userInfoBody}>

            <div className={s.title}>
                <Typography>{t('profilePage.personInfo')}</Typography>
                {isPageCurrentUser && <Button variant={'secondary'} onClick={enableEditForm}>{t('profilePage.changeBtn')}</Button>}
            </div>

            <ul className={s.personalInfoTable}>
                <li>
                    <label className={s.titleOption} onDoubleClick={enableEditForm}>{t('profilePage.name')}</label>
                    <Typography className={s.option} variant={'h3'} as={'div'} id={'fullName'}
                                onDoubleClick={enableEditForm}>{profile?.fullName}</Typography>
                </li>

                <li>
                    <label className={s.titleOption} onDoubleClick={enableEditForm}>{t('profilePage.lookingJob')}</label>
                    <Typography className={s.option} variant={'subtitle2'}
                                as={'div'}
                                onDoubleClick={enableEditForm}>{profile?.lookingForAJob ? t('profilePage.lookingJobYes') : t('profilePage.lookingJobNo')}</Typography>
                </li>
                <li>
                    <label className={s.titleOption} onDoubleClick={enableEditForm}>{t('profilePage.mySkills')}</label>
                    <Typography className={s.option} variant={'subtitle2'}
                                as={'div'}
                                onDoubleClick={enableEditForm}>{profile?.lookingForAJobDescription || t("profilePage.noValue")}</Typography>
                </li>
                <li>
                    <label className={s.titleOption} onDoubleClick={enableEditForm}>{t('profilePage.aboutMe')}</label> <Typography
                    className={s.option} variant={'subtitle2'}
                    as={'div'} onDoubleClick={enableEditForm}>{profile?.aboutMe || t("profilePage.noValue")}</Typography>
                </li>
                <li>
                    <label className={s.titleOption}
                           onDoubleClick={enableEditForm}>{t('profilePage.contacts')}</label>{profile?.contacts && (Object.keys(profile.contacts) as Array<keyof Contacts>).map(c => (
                    <div key={c} className={s.optionWrapper}>
                        <Typography as={'h5'} className={s.titleContact}>{c}:</Typography>
                        <Typography className={s.option}
                                    onDoubleClick={enableEditForm}>{profile.contacts![c] || t("profilePage.noValue")}</Typography>
                    </div>
                )) || null}
                </li>

            </ul>

        </div>

    )
})
