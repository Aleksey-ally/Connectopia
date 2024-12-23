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
import {getUserProfile} from "redux/profileReducer";

const Layout = () => {
    const dispatch = useAppDispatch()
    const initializingApp = useSelector<ReducersType, boolean>(state => state.app.initializing)
    const auth = useSelector<ReducersType, Auth>(state => state.auth)
    const usersData = useSelector<ReducersType, UsersType>(state => state.usersData)

    useEffect(() => {
        (async () => {
            try {
                await dispatch(getNavbarFriends(9, 1, true))
            } catch {
                toast.error('Error when receiving data', errorOptions)
            }
        })()

    }, [dispatch])

    useEffect(() => {
        (async () => {
            try {
                if (auth.id) {
                    await dispatch(getUserProfile(auth.id))
                }
            } catch {
                toast.error('Error when receiving data', errorOptions)
            }
        })()
    }, [auth.id]);


    // if (!initializingApp) {
    //     return <Preloader/>
    // }

    return (
        <>
            <HeaderContainer auth={auth}/>
            <main className={s.appWrapper}>
                {auth.isAuth && <Navbar friendsData={usersData.navbarFriends} id={auth.id}/>}
                <div className={s.content}>
                    <Outlet />
                </div>
            </main>
        </>
    )
}
export default Layout;
