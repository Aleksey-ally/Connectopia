import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileInformationContainer} from './ProfileInformation/ProfileInformationContainer';
import React from "react";
import {WthAuthRedirect} from "utils/WithAuthRedirect";

export const Profile = WthAuthRedirect(() => {

    return (
        <div>
            <ProfileInformationContainer/>
            <MyPostsContainer/>
        </div>
    )
})