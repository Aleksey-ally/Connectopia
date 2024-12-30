import {NavLink} from 'react-router-dom';
import {FriendsSection} from "./FriendsSection";
import s from 'pages/Navbar/Navbar.module.scss';
import React from "react";
import {Auth} from "redux/authReducer";
import {UserType} from "api/users/users.types";
import {useTranslation} from "react-i18next";

type NavbarType = {
    friendsData: UserType[]
} & Pick<Auth, 'id'>


export const Navbar = ({friendsData, id}: NavbarType) => {

    const {t} = useTranslation();

    return (
        <nav className={s.navbar}>
            <h3 className={s.label}>{t('navbar.menu')}</h3>
            <div className={s.navButtonsSection}>
                <span>
                    <NavLink to={`/profile/${id}`} className={s.item}>{t('navbar.profile')}</NavLink>
                </span>
                <span>
                    <NavLink to='/messages'
                             className={s.item}>{t('navbar.messages')}</NavLink>
                </span>
                <span>
                    <NavLink to='/users'
                             className={s.item}>{t('navbar.users')}</NavLink>
                </span>
                <span>
                    <NavLink to='/weather' className={s.item}>{t('navbar.weather')}</NavLink>
                </span>
                <span>
                    <NavLink to='/music' className={s.item}>Music</NavLink>
                </span>
                <span>
                    <NavLink to='/settings'
                             className={s.item}>{t('navbar.settings')}</NavLink>
                </span>
            </div>
            <FriendsSection friendsData={friendsData}/>
        </nav>
    )
}