import {ProfileInformation} from './ProfileInformation/ProfileInformation';
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";

export const Profile = () => {
    return (
        <div>
            <ProfileInformation/>
            <MyPostsContainer/>
        </div>
    )
}