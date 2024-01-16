import {Auth} from 'redux/authReducer';
import {Header} from "components/Header/Header";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {ReducersType} from "redux/reduxStore";

type Props = {
    auth: Auth
}

export const HeaderContainer = ({auth}: Props) => {
    useEffect(() => {
        if (auth.id === null) return
    }, [auth]);

    const currentUserAvatar = useSelector<ReducersType, string | undefined>(state => state.profileData.profile.photos?.small)

    return (
        <Header auth={auth} currentUserAvatar={currentUserAvatar}/>
    )
}