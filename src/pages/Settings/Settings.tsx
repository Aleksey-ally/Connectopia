import s from './Settings.module.scss'
import {ChangeEvent, FC, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {ReducersType, useAppDispatch} from "redux/reduxStore";
import {Typography} from "components/Typography";
import {
    changeUserName,
    changeUserStatus,
    getUserProfile,
    getUserStatus,
    setUserProfile,
    UtilityProfileUserType
} from "redux/profileReducer"
import {Button} from "components/Button";
import {toast} from "react-toastify";
import {successOptions} from "utils/ToastifyOptions/ToastifyOptions";
import {useTranslation} from "react-i18next";

export const Settings: FC = () => {
    const dispatch = useAppDispatch()
    const userID = useSelector<ReducersType, number>(state => state.auth.id as number)
    const user = useSelector<ReducersType, UtilityProfileUserType>(state => state.profileData.profile)
    const userStatus = useSelector<ReducersType, string>(state => state.profileData.status)
    const [status, setStatus] = useState<string>('')

    useEffect(() => {
        if (userID === null) return

        dispatch(getUserProfile(userID))
        dispatch(getUserStatus(userID))
        setStatus(userStatus);

    }, [userID, userStatus]);


    const inputStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    const buttonStatusHandler = () => {
        dispatch(changeUserStatus(status))
            .then(()=>{
                toast.success('You are successfully change status', successOptions)
            })
    }

    const inputNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setUserProfile({fullName: e.currentTarget.value}))
    }

    const buttonNameHandler = () => {
        dispatch(changeUserName(user.fullName as string))
            .then(()=>{
                toast.success('You are successfully change user name', successOptions)
            })
    }

    const { t, i18n } = useTranslation();


    return (
        <div className={s.settingsPage}>
            <Typography className={s.title} as={'h4'} variant={'h4'}>{t('settingsPage.language')}:</Typography>
            <div className={s.item}>
                    <Button className={s.button} variant={'secondary'} onClick={() => i18n.changeLanguage("en")}>English</Button>
                    <Button className={s.button} variant={'secondary'} onClick={() => i18n.changeLanguage("ru")}>Русский</Button>
            </div>


            <Typography className={s.title} as={'h4'} variant={'h4'}>{t('settingsPage.personalInformation')}</Typography>

            <div className={s.item}>
                <input className={s.input} id='status' type='text' value={status}
                       onChange={inputStatusHandler}></input>
                <label className={s.label} htmlFor='status'>Status</label>
                <Button className={s.button} variant={'secondary'} onClick={buttonStatusHandler}>Change</Button>
            </div>
            <div className={s.item}>
                <input className={s.input} id='name' type='text' value={user.fullName}
                       onChange={inputNameHandler}></input>
                <label className={s.label} htmlFor='name'>Name</label>
                <Button className={s.button} variant={'secondary'} onClick={buttonNameHandler}>Change</Button>
            </div>

        </div>
    )
}