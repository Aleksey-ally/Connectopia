import React, {memo} from "react";
import s from 'pages/Messages/UserMessage/UserMessage.module.scss'
import {useParams} from "react-router-dom";

type TextDataType = {
    id: number;
    messageText: string;
    className?:string
};


export const UserMessage = memo(({id, messageText, className}: TextDataType) => {
    const {uID} = useParams()
    const style = (uID !== undefined && id === +uID) ? s.currentCircle : s.circle

    return <div className={`${s.messageItem} ${className}`}>
        <div className={style}></div>
        {messageText}</div>
})