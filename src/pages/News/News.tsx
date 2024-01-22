import React from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "redux/reduxStore";
import {Navigate} from "react-router-dom";

export const News : React.FC = () => {
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth)
    if (!isAuth) return <Navigate to={'/login'}/>

    return (
        <div>News</div>
    )
}