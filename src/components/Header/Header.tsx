import {NavLink} from 'react-router-dom';

import s from './Header.module.css'
import {Auth} from 'redux/authReducer';
import {UserAvatar} from 'components/UserAvatar/UserAvatar';
import {Typography} from "components/Typography/Typography";
import {CICon} from "assets/icons/CIcon";
import {Dropdown} from "components/Dropdown";
import {DropdownItemWithIcon} from "components/Dropdown/DropdownItem/DropdownItemWithIcon";

type Props = {
    auth: Auth
}

export const Header = ({auth}: Props) => {
    return (
        <header className={s.header}>
            <NavLink to={'/'}>
                <div className={s.logo}>
                    <CICon/>
                    <Typography className={s.title} as={'h4'} variant={'h4'}>onnectopia</Typography>
                </div>
            </NavLink>

            <div className={s.loginBlock}>
                {auth.isAuth ?
                    <span>Hello <b>{auth.login}</b><UserAvatar size={'small'}/></span>
                :
                <NavLink className={s.login} to='/login'>Login</NavLink>}
            </div>
        </header>
    )
}