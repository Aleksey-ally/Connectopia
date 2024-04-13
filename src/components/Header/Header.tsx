import {NavLink} from 'react-router-dom';

import s from './Header.module.css'
import {Auth, logout} from 'redux/authReducer';
import {UserAvatar} from 'components/UserAvatar';
import {Typography} from "components/Typography";
import {CIcon} from "assets/icons";
import {Dropdown} from "components/Dropdown";
import {DropdownItemWithIcon} from "components/Dropdown/DropdownItem/DropdownItemWithIcon";
import {PersonOutline} from "assets/icons";
import {Logout} from "assets/icons";
import {DropdownItem} from "components/Dropdown/DropdownItem";
import {useAppDispatch} from "redux/reduxStore";

type Props = {
    auth: Auth
    currentUserAvatar: string | undefined
}

export const Header = ({auth, currentUserAvatar}: Props) => {

    const dispatch = useAppDispatch()

    const logoutHandler = () =>{
        dispatch(logout)
    }

    return (
        <header className={s.header}>
            <NavLink to={'/'}>
                <div className={s.logo}>
                    <CIcon/>
                    <Typography className={s.title} as={'h4'} variant={'h4-header'}>onnectopia</Typography>
                </div>
            </NavLink>


            <div className={s.loginBlock}>
                {auth.isAuth ?
                    <>
                        <span>Hello <b>{auth?.login}</b></span>
                        <Dropdown trigger={<UserAvatar photos={currentUserAvatar} size={'small'}/>}>
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
                            <DropdownItemWithIcon onClick={logoutHandler} icon={<Logout/>} text="Sign Out"/>
                        </Dropdown>
                    </> :
                    <NavLink className={s.login} to='/login'>Login</NavLink>

                }
            </div>
        </header>
    )
}