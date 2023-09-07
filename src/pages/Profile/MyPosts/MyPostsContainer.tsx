import { useDispatch, useSelector } from "react-redux";
import { addPost, changePostText, ProfileDataType } from "redux/profileReducer";
import { ReducersType } from "redux/reduxStore";
import { MyPosts } from "./MyPosts";


export const MyPostsContainer = () => {

    const profileData = useSelector<ReducersType, ProfileDataType>(state => state.profileData)
    const dispatch = useDispatch()
    const dispatchNewTextInput = (newText: string) => {
        dispatch(changePostText(newText))
    }

    const addPostCallBack = () => {
        dispatch(addPost())
    }

    return <MyPosts profileData={profileData} dispatchNewTextInput={dispatchNewTextInput} addPost={addPostCallBack} />

}