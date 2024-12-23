import {Auth} from 'redux/authReducer';
import {Header} from "components/Header/Header";
import {useSelector} from "react-redux";
import {ReducersType} from "redux/reduxStore";

type Props = {
    auth: Auth
}

export const HeaderContainer = ({auth}: Props) => {
    const currentUserAvatar = useSelector<ReducersType, string | undefined>(state => state.profileData.profile.photos?.large)
    const userName = useSelector<ReducersType, string | undefined>(state => state.profileData.profile.fullName)

    return (
        <Header auth={auth} userName={userName} currentUserAvatar={currentUserAvatar}/>
    )
}