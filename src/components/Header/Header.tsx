import { NavLink } from 'react-router-dom';
import LogoZoo from '../../imgs/Zoo.png'
import s from './Header.module.css'
import React from "react";

export const Header: React.FC = () => {
    return (
        <header className={s.header}>
            <img className={s.logoZoo} src={LogoZoo} alt="Zoo logo" />
            <div className={s.loginBlock}>
               <NavLink className={s.login} to='/login'>Login</NavLink> 
            </div>
        </header>
    )
}