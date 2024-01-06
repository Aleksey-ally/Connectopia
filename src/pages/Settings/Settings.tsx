import s from './Settings.module.scss'
import {ChangeEvent, FC, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {ReducersType} from "redux/reduxStore";
import Button from "components/Button/Button";
import {profileAPI} from "api/api";
import {Typography} from "components/Typography/Typography";

export const Settings: FC = () => {
    const userID = useSelector<ReducersType, number>(state => state.auth.id as number)
    const [status, setStatus] = useState<string>('')


    useEffect(() => {
        if (userID === null) return

        profileAPI.getStatus(userID)
            .then((data) => {
                setStatus(data)
            })

    }, [userID]);

    const inputStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    const buttonStatusHandler = () => {
        profileAPI.updateStatus(status)
            .catch(() => alert('An unexpected error occurred'))
    }

    return (
        <div className={s.settingsPage}>
           <Typography className={s.title} as={'h4'} variant={'h4'}>Personal Information:</Typography>

            <div className={s.item}>
                <input className={s.input} id='status' type='text' value={status} onChange={inputStatusHandler}></input>
                <label className={s.label} htmlFor='status'>Status</label>
                <Button className={s.button} variant={'secondary'} onClick={buttonStatusHandler}>Change</Button>
            </div>

        </div>
    )
}