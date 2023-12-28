import React from "react";
import s from './UserMessage.module.css'
import {useParams} from "react-router-dom";
import {TextDataType} from "../../../redux/messagesReducer";


export const UserMessage = ({id, messageText}: TextDataType) => {
    const {uID} = useParams()
    const style = (uID !== undefined && id === +uID) ? s.currentCircle : s.circle

    return <div className={s.messageItem}>
        <div className={style}></div>
        {messageText}</div>
}