import {lazy, Suspense} from "react";
import {Preloader} from "components/Preloader";


const ProfileInformationContainer = lazy(() => import('./ProfileInformation').then(module => ({default: module.ProfileInformationContainer})));
const MyPostsContainer = lazy(() => import('./MyPosts').then(module => ({default: module.MyPostsContainer})));

export const Profile = () => {

    return (
        <div>

            <Suspense fallback={<Preloader/>}>
                <ProfileInformationContainer/>
            </Suspense>

            <Suspense fallback={<Preloader/>}>
                <MyPostsContainer/>
            </Suspense>

        </div>
    )
}