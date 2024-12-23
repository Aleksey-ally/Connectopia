import s from './App.module.css';

import {useEffect} from "react";
import {useSelector} from "react-redux";
import {ReducersType, useAppDispatch} from "redux/reduxStore";
import {Outlet} from 'react-router-dom';

import {Auth} from "redux/authReducer";
import {Navbar} from "pages/Navbar";
import {HeaderContainer} from "components/Header";
import {getNavbarFriends, UsersType} from "redux/usersReducer";
import {toast} from "react-toastify";
import {errorOptions} from "utils/ToastifyOptions/ToastifyOptions";

const Layout = () => {
    const dispatch = useAppDispatch()
    const auth = useSelector<ReducersType, Auth>(state => state.auth)
    const usersData = useSelector<ReducersType, UsersType>(state => state.usersData)

    useEffect(() => {
        (async () => {
            try {
                if (auth.isAuth)
                await dispatch(getNavbarFriends(9, 1, true))
            } catch {
                toast.error('Error when receiving data', errorOptions)
            }
        })()

    }, [auth.isAuth, dispatch])

    return (
        <>
            <HeaderContainer auth={auth}/>
            <main className={s.appWrapper}>
                {auth.isAuth && <Navbar friendsData={usersData.navbarFriends} id={auth.id}/>}
                <div className={s.content}>
                    <Outlet/>
                </div>
            </main>
        </>
    )
}
export default Layout;
