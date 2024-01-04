import {FC, useEffect} from "react";
import {useSelector} from "react-redux";
import {ReducersType} from "redux/reduxStore";
import {UtilityProfileUserType} from "redux/profileReducer";
import Button from "components/Button/Button";
import {profileAPI} from "api/api";

export const Settings: FC = () => {
    const userData = useSelector<ReducersType, UtilityProfileUserType>(state => state.profileData.profile)
    const userID = useSelector<ReducersType, number>(state => state.auth.id)
    let status = ''

    useEffect(() => {
        if (userID === null) return

        profileAPI.getStatus(userID)
            .then((data) => {
                status = data
            })

    }, [userID]);

    const onSubmitStatus = () => {

    }
    return (
        <div>
            Personal Information:

            <div>
                <form onSubmit={onSubmitStatus}>
                    <input type="text" placeholder={status}></input>
                    <Button type='submit'>Send</Button>
                </form>

            </div>
        </div>
    )
}