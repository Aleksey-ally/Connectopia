import React, {memo} from "react";
import {NavLink} from 'react-router-dom'
import s from 'pages/Messages/DialogUser/DialogUser.module.scss'
import {UsersDataType} from "redux/messagesReducer";
import {UserAvatar} from "components/UserAvatar";


export const DialogUser = memo(({id, animalName, photoAvatar}: UsersDataType) => {
    return (
        <div className={s.dialogItem}>
            <NavLink to={`/messages/${id}`}
                     className={navData => navData.isActive ? s.activeDialogItem : s.dialogItem}>
                <UserAvatar size={'small'} alt={`${photoAvatar } avatar`}/>
                {/*<img src={photoAvatar} alt={`${photoAvatar } avatar`}/>*/}
                <span>{animalName}</span></NavLink>
        </div>
    )
})