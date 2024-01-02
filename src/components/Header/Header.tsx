import {NavLink} from 'react-router-dom';

import s from './Header.module.css'
import {Auth} from 'redux/authReducer';
import {UserAvatar} from 'components/UserAvatar/UserAvatar';
import {Typography} from "components/Typography/Typography";
import {CICon} from "assets/icons/CIcon";
import {Dropdown} from "components/Dropdown";
import {DropdownItemWithIcon} from "components/Dropdown/DropdownItem/DropdownItemWithIcon";
import PersonOutline from "assets/icons/person-outline";
import Logout from "assets/icons/logout";
import {DropdownItem} from "components/Dropdown/DropdownItem";

type Props = {
    auth: Auth
    currentUserAvatar: string | undefined
}

export const Header = ({auth, currentUserAvatar}: Props) => {
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
                    <>
                        <span>Hello <b>{auth?.login}</b></span>
                        <Dropdown trigger={<UserAvatar size={'small'}/>}>
                            <DropdownItem>
                                <UserAvatar photos={currentUserAvatar} size={'small'}/>
                                <div>
                                    <Typography
                                        variant="subtitle2"> {auth?.login ? auth.login : 'User Name'}</Typography>
                                    <Typography variant="caption" style={{color: 'var(--color-dark-100)'}}>
                                        {auth?.email ? auth.email : 'User Name'}
                                    </Typography>
                                </div>
                            </DropdownItem>
                            <DropdownItemWithIcon icon={<PersonOutline/>} text={'My Profile'}/>
                            <DropdownItemWithIcon icon={<Logout/>} text="Sign Out"/>
                        </Dropdown>
                    </> :
                    <NavLink className={s.login} to='/login'>Login</NavLink>

                }
            </div>
        </header>
    )
}