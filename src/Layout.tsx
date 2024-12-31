import s from './App.module.css';

import {useEffect} from "react";
import {useSelector} from "react-redux";
import {ReducersType, useAppDispatch} from "redux/reduxStore";
import {Outlet, useLocation} from 'react-router-dom';

import {Auth} from "redux/authReducer";
import {Navbar} from "pages/Navbar";
import {HeaderContainer} from "components/Header";
import {getNavbarFriends, UsersType} from "redux/usersReducer";
import {toast} from "react-toastify";
import {errorOptions} from "utils/ToastifyOptions/ToastifyOptions";
import {AnimatedBackground} from "assets/animations";
import {useTranslation} from "react-i18next";


const Layout = () => {
    const dispatch = useAppDispatch()
    const auth = useSelector<ReducersType, Auth>(state => state.auth)
    const usersData = useSelector<ReducersType, UsersType>(state => state.usersData)
    const {pathname} = useLocation()

    const {t} = useTranslation();


    useEffect(() => {
        (async () => {
            try {
                if (auth.isAuth)
                    await dispatch(getNavbarFriends(9, 1, true))
            } catch {
                toast.error(t("notifications.errorData"), errorOptions)
            }
        })()

    }, [auth.isAuth, dispatch])

    return (
        <>
            <HeaderContainer auth={auth}/>
            <main className={auth.isAuth ? s.appWrapper : s.appWrapperLoginLayout}>
                {!auth.isAuth && pathname === '/login' && <AnimatedBackground className={s.bg}/>}
                {auth.isAuth && <Navbar friendsData={usersData.navbarFriends} id={auth.id}/>}
                <div className={auth.isAuth ? s.content : s.contentLoginLayout}>
                    <Outlet/>
                </div>
            </main>
        </>
    )
}
export default Layout;
