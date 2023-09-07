import { MyPostsContainer } from "./MyPosts/MyPostsContainer";
import { ProfileInformationContainer } from './ProfileInformation/ProfileInformationContainer';

export const Profile = () => {
    return (
        <div>
            <ProfileInformationContainer />
            <MyPostsContainer />
        </div>
    )
}