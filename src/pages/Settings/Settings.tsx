import {ChangeEvent, FC, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {ReducersType} from "redux/reduxStore";
import Button from "components/Button/Button";
import {profileAPI} from "api/api";

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
        <div>
            Personal Information:

            <div>
                <input type="text" value={status} onChange={inputStatusHandler}></input>
                <Button onClick={buttonStatusHandler}>Send</Button>
            </div>

        </div>
    )
}