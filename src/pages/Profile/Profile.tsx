import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileInformationContainer} from './ProfileInformation/ProfileInformationContainer';
import React from "react";
import {WthAuthRedirect} from "utils/WithAuthRedirect";
import {compose} from "redux";

export const Profile = compose(
    WthAuthRedirect
)(() => {

    return (
        <div>
            <ProfileInformationContainer/>
            <MyPostsContainer/>
        </div>
    )
})