import {useSelector} from "react-redux";
import {addPost, changePostText, ProfileDataType} from "redux/profileReducer";
import {ReducersType, useAppDispatch} from "redux/reduxStore";
import {MyPosts} from "./MyPosts";
import {useCallback} from "react";


export const MyPostsContainer = () => {

    const profileData = useSelector<ReducersType, ProfileDataType>(state => state.profileData)
    const dispatch = useAppDispatch()
    const dispatchNewTextInput = useCallback((newText: string) => {
        dispatch(changePostText(newText))
    },[dispatch])
    const addPostCallBack = useCallback(() => {
        dispatch(addPost())
    },[dispatch])

    return <MyPosts profileData={profileData} dispatchNewTextInput={dispatchNewTextInput} addPost={addPostCallBack}/>

}