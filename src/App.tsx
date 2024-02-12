import s from './App.module.css';

import {useEffect} from "react";
import {useSelector} from "react-redux";
import {ReducersType, useAppDispatch} from "redux/reduxStore";
import {Route, Routes} from 'react-router-dom';

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

const App = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAuthUserData)
    }, [])

    const initializingApp = useSelector<ReducersType, boolean>(state => state.app.initializing)
    const auth = useSelector<ReducersType, Auth>(state => state.auth)

    if (!initializingApp) {
        return <Preloader/>
    }

    return (
        <main>
            <HeaderContainer auth={auth}/>
            {auth.isAuth ? <div className={s.appWrapper}>

                    <Navbar/>
                    <div className={s.content}>
                        <Routes>
                            <Route path='/messages/:uID?'
                                   element={<MessagesContainer/>}/>
                            <Route path={'/profile/:uID?'} element={<Profile/>}/>
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
