import {NavLink, useNavigate} from 'react-router-dom';

import s from 'components/Header/Header.module.scss'
import {Auth, logout} from 'redux/authReducer';
import {Avatar} from 'components/Avatar';
import {Typography} from "components/Typography";
import {CIcon} from "assets/icons";
import {Dropdown} from "components/Dropdown";
import {DropdownItemWithIcon} from "components/Dropdown/DropdownItem/DropdownItemWithIcon";
import {PersonOutline} from "assets/icons";
import {Logout} from "assets/icons";
import {DropdownItem} from "components/Dropdown/DropdownItem";
import {useAppDispatch} from "redux/reduxStore";
import {toast} from "react-toastify";
import {infoOptions} from "utils/ToastifyOptions/ToastifyOptions";

type Props = {
    auth: Auth
    currentUserAvatar: string | undefined
}

export const Header = ({auth, currentUserAvatar}: Props) => {

    const dispatch = useAppDispatch()

    const navigate = useNavigate();


    const logoutHandler = () => {
        dispatch(logout)
            .then(() => {
                toast.info('Goodbye', infoOptions)
            })
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
                        <span>Hello, <b>{auth?.login}</b></span>
                        <Dropdown trigger={<Avatar photos={currentUserAvatar} size={'small'}/>}>
                            <DropdownItem>
                                <Avatar className={s.navigate} photos={currentUserAvatar} size={'small'}
                                            onClick={() => navigate(`/profile/${auth.id}`)}/>
                                <div onClick={() => navigate(`/profile/${auth.id}`)}>
                                    <Typography className={s.navigate}
                                                variant="subtitle2"> {auth?.login ? auth.login : 'User Name'}</Typography>
                                    <Typography className={s.navigate} variant="caption"
                                                style={{color: 'var(--color-dark-100)'}}>
                                        {auth?.email ? auth.email : 'User Name'}
                                    </Typography>
                                </div>
                            </DropdownItem>
                            <DropdownItemWithIcon onClick={() => navigate(`/profile/${auth.id}`)} icon={<PersonOutline/>}
                                                  text={'My Profile'}/>
                            <DropdownItemWithIcon onClick={logoutHandler} icon={<Logout/>} text="Sign Out"/>
                        </Dropdown>
                    </> :
                    <NavLink className={s.login} to='/login'>Login</NavLink>
                }
            </div>
        </header>
    )
}