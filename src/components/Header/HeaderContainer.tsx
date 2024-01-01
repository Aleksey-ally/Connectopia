import {Auth} from 'redux/authReducer';
import {Header} from "components/Header/Header";
import {useEffect} from "react";
import {profileAPI} from "api/api";
import {setUserProfile} from "redux/profileReducer";
import {useSelector} from "react-redux";
import {ReducersType} from "redux/reduxStore";

type Props = {
    auth: Auth
}

export const HeaderContainer = ({auth}: Props) => {
    useEffect(() => {
        if (auth.id === null) return

        profileAPI.getProfile(auth.id as number)
            .then((data) => {
                setUserProfile(data)
            })
    }, [auth]);
    const currentUserAvatar = useSelector<ReducersType, string | undefined>(state => state.profileData.profile.photos?.small)
    return (
        <Header auth={auth} currentUserAvatar={currentUserAvatar}/>
    )
}