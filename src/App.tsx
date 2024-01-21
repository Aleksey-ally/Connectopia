import {MessagesContainer} from "pages/Messages/MessagesContainer";
import {Music} from 'pages/Music/Music';
import {Navbar} from "pages/Navbar/Navbar";
import {News} from 'pages/News/News';
import {Profile} from "pages/Profile/Profile";
import {Settings} from 'pages/Settings/Settings';
import {UsersContainer} from 'pages/Users/UsersContainer';
import {Route, Routes} from 'react-router-dom';
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'
import './styles/index.scss'

import s from './App.module.css';
import {useEffect} from "react";
import {Auth, getAuthUserData} from "redux/authReducer";
import {useSelector} from "react-redux";
import {ReducersType, useAppDispatch} from "redux/reduxStore";
import {HeaderContainer} from "components/Header/HeaderContainer";
import {Login} from "pages/Login/Login";

const App = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAuthUserData)
    }, [])
    const auth = useSelector<ReducersType, Auth>(state => state.auth)

    return (
        <>
            <HeaderContainer auth={auth}/>
            <main className={s.appWrapper}>
                <Navbar/>
                <div className={s.content}>
                    <Routes>
                        <Route path='/messages/:uID?'
                               element={<MessagesContainer/>}/>
                        <Route path={'/profile/:uID?'} element={<Profile/>}/>
                        <Route path='/users' element={<UsersContainer/>}/>
                        <Route path='/news' element={<News/>}/>
                        <Route path='/music' element={<Music/>}/>
                        <Route path='/settings' element={<Settings/>}/>
                        <Route path='/login' element={<Login/>}/>
                    </Routes>
                </div>
            </main>
        </>
    )
}
export default App;
