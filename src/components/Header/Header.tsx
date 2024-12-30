import {NavLink, useNavigate} from 'react-router-dom';

import s from 'components/Header/Header.module.scss'
import {Auth, logout} from 'redux/authReducer';
import {Avatar} from 'components/Avatar';
import {Typography} from "components/Typography";
import {CIcon, Logout, PersonOutline} from "assets/icons";
import {Dropdown} from "components/Dropdown";
import {DropdownItemWithIcon} from "components/Dropdown/DropdownItem/DropdownItemWithIcon";
import {DropdownItem} from "components/Dropdown/DropdownItem";
import {useAppDispatch} from "redux/reduxStore";
import {toast} from "react-toastify";
import {infoOptions} from "utils/ToastifyOptions/ToastifyOptions";
import {useTranslation} from "react-i18next";

type Props = {
    auth: Auth
    currentUserAvatar: string | undefined
    userName?: string
}

export const Header = ({auth, currentUserAvatar, userName}: Props) => {

    const dispatch = useAppDispatch()

    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(logout)
            .then(() => {
                toast.info('Goodbye', infoOptions)
            })
    }

    const {t} = useTranslation();

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
                        <span>{t('header.greetings')}, <b>{userName}</b></span>
                        <Dropdown trigger={<Avatar photo={currentUserAvatar} size={'small'}/>}>
                            <DropdownItem>
                                <Avatar className={s.navigate} photo={currentUserAvatar} size={'small'}
                                        onClick={() => navigate(`/profile/${auth.id}`)}/>
                                <div onClick={() => navigate(`/profile/${auth.id}`)}>
                                    <Typography className={s.navigate}
                                                variant="subtitle2"> {userName ? userName : 'User Name'}</Typography>
                                    <Typography className={s.navigate} variant="caption"
                                                style={{color: 'var(--color-dark-100)'}}>
                                        {auth?.email ? auth.email : 'User Name'}
                                    </Typography>
                                </div>
                            </DropdownItem>
                            <DropdownItemWithIcon onClick={() => navigate(`/profile/${auth.id}`)}
                                                  icon={<PersonOutline/>}
                                                  text={t('header.myProfile')}/>
                            <DropdownItemWithIcon onClick={logoutHandler} icon={<Logout/>} text={t('header.signOut')}/>
                        </Dropdown>
                    </> :
                    <NavLink className={s.login} to='/login'>{t('header.login')}</NavLink>
                }
            </div>
        </header>
    )
}