import {lazy} from "react";
import {withSuspense} from "utils/WithSuspense";

const ProfileInformationContainer = withSuspense(
    lazy(() =>
        import('./ProfileInformation')
            .then(module => ({default: module.ProfileInformationContainer}))
    ));
const MyPostsContainer = withSuspense(
    lazy(() =>
        import('./MyPosts')
            .then(module => ({default: module.MyPostsContainer}))
    ))


export const Profile = () => {

    return (
        <div>
            <ProfileInformationContainer/>
            <MyPostsContainer/>
        </div>
    )
}