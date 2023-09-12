import { NavLink } from 'react-router-dom';
import LogoZoo from '../../imgs/Zoo.png'
import s from './Header.module.css'
import { Auth } from 'redux/authReducer';
import { UserAvatar } from 'components/UserAvatar/UserAvatar';

type Props = {
    auth: Auth
}

export const Header = ({ auth }: Props) => {
    return (
        <header className={s.header}>
            <img className={s.logoZoo} src={LogoZoo} alt="Zoo logo" />
            <div className={s.loginBlock}>
                {auth.isAuth ? 
                <span>Hello <b>{auth.login}</b><UserAvatar size={'small'}/></span> : 
                <NavLink className={s.login} to='/login'>Login</NavLink>}
            </div>
        </header>
    )
}