import { Header } from "components/Header/Header";
import { MessagesContainer } from "pages/Messages/MessagesContainer";
import { Music } from 'pages/Music/Music';
import { Navbar } from "pages/Navbar/Navbar";
import { News } from 'pages/News/News';
import { Profile } from "pages/Profile/Profile";
import { Settings } from 'pages/Settings/Settings';
import { UsersContainer } from 'pages/Users/UsersContainer';
import { Route, Routes } from 'react-router-dom';
import s from './App.module.css';


const App = () => {
    return (

        <div className={s.appWrapper}>
            <Header />
            <Navbar />
            <div className={s.content}>
                <Routes>
                    <Route path='/messages/:uId?' 
                        element={<MessagesContainer />} />
                    <Route path={'/profile/:id?'} element={<Profile />} />
                    <Route path='/users' element={<UsersContainer />} />
                    <Route path='/news' element={<News />} />
                    <Route path='/music' element={<Music />} />
                    <Route path='/settings' element={<Settings />} />
                </Routes>
            </div>
        </div>
    )
}

export default App;
