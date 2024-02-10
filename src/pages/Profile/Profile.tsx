import {MyPostsContainer} from "./MyPosts";
import {ProfileInformationContainer} from './ProfileInformation';
import React from "react";

export const Profile = () => {

    return (
        <div>
            <ProfileInformationContainer/>
            <MyPostsContainer/>
        </div>
    )
}