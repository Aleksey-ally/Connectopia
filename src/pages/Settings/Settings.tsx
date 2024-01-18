import s from './Settings.module.scss'
import {ChangeEvent, FC, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {ReducersType, useAppDispatch} from "redux/reduxStore";
import Button from "components/Button/Button";
import {Typography} from "components/Typography/Typography";
import {
    changeUserName,
    changeUserStatus,
    getUserProfile,
    setUserProfile,
    getUserStatus,
    UtilityProfileUserType
} from "redux/profileReducer"

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
    }

    const inputNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setUserProfile({fullName: e.currentTarget.value}))
    }

    const buttonNameHandler = () => {
        dispatch(changeUserName(user.fullName as string))
    }

    return (
        <div className={s.settingsPage}>
            <Typography className={s.title} as={'h4'} variant={'h4'}>Personal Information:</Typography>

            <div className={s.item}>
                <input className={s.input} id='status' type='text' value={status} onChange={inputStatusHandler}></input>
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