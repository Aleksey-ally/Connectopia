import s from './App.module.css';

import {useEffect} from "react";
import {useSelector} from "react-redux";
import {ReducersType, useAppDispatch} from "redux/reduxStore";
import {Navigate, Route, Routes} from 'react-router-dom';

import {Auth, getAuthUserData} from "redux/authReducer";

import {Music} from 'pages/Music';
import {Navbar} from "pages/Navbar";
import {News} from 'pages/News';
import {Profile} from "pages/Profile";
import {Settings} from 'pages/Settings';
import {Login} from "pages/Login";
import {UsersContainer} from 'pages/Users';
import {HeaderContainer} from "components/Header";
import {MessagesContainer} from "pages/Messages";
import {Preloader} from "components/Preloader";
import {getNavbarFriends, UsersType} from "redux/usersReducer";
import {toast} from "react-toastify";
import {errorOptions} from "utils/ToastifyOptions/ToastifyOptions";
import {getUserProfile} from "redux/profileReducer";

const App = () => {
    const dispatch = useAppDispatch()
    const initializingApp = useSelector<ReducersType, boolean>(state => state.app.initializing)
    const auth = useSelector<ReducersType, Auth>(state => state.auth)
    const usersData = useSelector<ReducersType, UsersType>(state => state.usersData)

    useEffect(() => {
        (async () => {
            try {
                await dispatch(getAuthUserData)
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


    if (!initializingApp) {
        return <Preloader/>
    }

    return (
        <main>
            <HeaderContainer auth={auth}/>
            {auth.isAuth ? <div className={s.appWrapper}>

                    <Navbar friendsData={usersData.navbarFriends} id={auth.id}/>
                    <div className={s.content}>
                        <Routes>
                            <Route path="/" element={<Navigate to={`/profile/${auth.id}`}/>}/>
                            <Route path={'/profile/:uID?'} element={<Profile/>}/>
                            <Route path='/messages'
                                   element={<MessagesContainer/>}/>
                            <Route path='/users' element={<UsersContainer/>}/>
                            <Route path='/news' element={(<News/>)}/>
                            <Route path='/music' element={<Music/>}/>
                            <Route path='/settings' element={<Settings/>}/>
                        </Routes>
                    </div>

                </div>
                : <Login/>}
        </main>
    )
}
export default App;
