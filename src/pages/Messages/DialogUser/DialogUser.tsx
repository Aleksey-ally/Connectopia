import React from "react";
import {NavLink} from 'react-router-dom'
import s from './DialogUser.module.css'
import {UsersDataType} from "../../../redux/messagesReducer";


export const DialogUser = ({id, animalName, photoAvatar}: UsersDataType) => {
    return (
        <div className={s.dialogItem}>
            <NavLink to={`${animalName.toLowerCase() + '/' + id}`}
                     className={navData => navData.isActive ? s.activeDialogItem : s.dialogItem}> <img src={photoAvatar}
                                                                                                       alt={'#'}/>
                <span>{animalName}</span></NavLink>
        </div>
    )
}