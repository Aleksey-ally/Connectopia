import {useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {UsersDataType} from "redux/messagesReducer";
import {ReducersType} from 'redux/reduxStore';
import {FriendsSection} from "./FriendsSection/FriendsSection";
import s from './Navbar.module.css';


export const Navbar = () => {
    const friendsData = useSelector<ReducersType, UsersDataType[]>(state => state.messagesData.messagesUsersData)
    return (
        <nav className={s.navbar}>
            <div className={s.navButtonsSection}>
                <div>
                    <NavLink to='/profile/' className={navData => navData.isActive ? s.active : s.item}>Profile</NavLink>
                </div>
                <div>
                    <NavLink to='/messages'
                             className={navData => navData.isActive ? s.active : s.item}>Message</NavLink>
                </div>
                <div>
                    <NavLink to='/users'
                             className={navData => navData.isActive ? s.active : s.item}>Users</NavLink>
                </div>
                <div>
                    <NavLink to='/news' className={navData => navData.isActive ? s.active : s.item}>News</NavLink>
                </div>
                <div>
                    <NavLink to='/music' className={navData => navData.isActive ? s.active : s.item}>Music</NavLink>
                </div>
                <div>
                    <NavLink to='/settings'
                             className={navData => navData.isActive ? s.active : s.item}>Settings</NavLink>
                </div>
            </div>
            <div className={s.navFriendSection}>
                <FriendsSection friendsData={friendsData}/>
            </div>

        </nav>
    )
}