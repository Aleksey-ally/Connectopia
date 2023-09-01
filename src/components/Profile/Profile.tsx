import {ProfileInformation} from './ProfileInformation/ProfileInformation';
import {ActionType, ProfileDataType} from "../../redux/profileReducer";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";

// type ProfilePropsType = {
//     profileData: ProfileDataType
//     dispatch: (action: ActionType) => void
// }
export const Profile = () => {
    return (
        <div>
            <ProfileInformation/>
            <MyPostsContainer/>
        </div>
    )
}