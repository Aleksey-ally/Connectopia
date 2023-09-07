import React from "react";
import s from './UserMessage.module.css'
import { useLocation, useParams } from "react-router-dom";
import { TextDataType } from "../../../redux/messagesReducer";


export const UserMessage = ({ id, messageText }: TextDataType) => {  
    const { uId } = useParams()
    const style = (uId !== undefined && id === +uId) ? s.currentCircle : s.circle

    return <div className={s.messageItem}>
        <div className={style}></div>
        {messageText}</div >
}