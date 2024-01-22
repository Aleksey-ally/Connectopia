import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileInformationContainer} from './ProfileInformation/ProfileInformationContainer';
import {Navigate} from "react-router-dom";
import React from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "redux/reduxStore";

export const Profile = () => {
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth)
    if (!isAuth) return <Navigate to={'/login'}/>

    return (
        <div>
            <ProfileInformationContainer/>
            <MyPostsContainer/>
        </div>
    )
}