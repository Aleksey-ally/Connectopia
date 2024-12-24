import {Auth} from 'redux/authReducer';
import {Header} from "components/Header/Header";
import {useEffect, useState} from "react";
import {profileAPI} from "api/profile/profile.api";
import {ProfileUserResponseType} from "api/profile/profile.types";

type Props = {
    auth: Auth
}

export const HeaderContainer = ({auth}: Props) => {
    const [currentUserData, setCurrentUserData] = useState<ProfileUserResponseType>()

    useEffect(() => {
        if (!auth.isAuth) return
        (async () => {
            const res = await profileAPI.getProfile(auth.id!)
            setCurrentUserData(res)
        })()

        return ()=>{
            setCurrentUserData(undefined)
        }

    }, [auth.isAuth]);

    return (
        <Header auth={auth} userName={currentUserData?.fullName} currentUserAvatar={currentUserData?.photos.large}/>
    )
}