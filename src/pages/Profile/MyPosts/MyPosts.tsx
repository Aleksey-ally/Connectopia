import {ChangeEvent, lazy, memo} from "react";
import s from './MyPosts.module.css';
import {ProfileDataType} from "redux/profileReducer";
import {withSuspense} from "utils/WithSuspense";

type Props = {
    profileData: ProfileDataType
    dispatchNewTextInput: (newText: string) => void
    addPost: () => void
}
export const MyPosts = memo(({profileData, dispatchNewTextInput, addPost}: Props) => {

    const Post = withSuspense(
        lazy(() =>
            import('./Post')
                .then(module => ({default: module.Post}))
        )
    )

    const onChangeInputPostHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatchNewTextInput(e.currentTarget.value)
    }

    return (
        <div className={s.posts}>
            <div>
                <h3>My posts</h3>
                <div>
                    <textarea placeholder={'type text'} value={profileData.textPost}
                              onChange={onChangeInputPostHandler}/>
                </div>
                <div>
                    <button className={s.buttonPost} onClick={addPost}>Add post</button>
                </div>
            </div>

            {profileData.postData.map(p => <Post key={p.id} id={p.id} message={p.message}
                                                 likeCounter={p.likeCounter}/>)}

        </div>
    )
})