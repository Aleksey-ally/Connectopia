import AvatarElephant from '../../../../imgs/Elephant.png';
import {PostDataType} from "redux/profileReducer";
import s from './Post.module.css';
import {memo} from "react";

export const Post = memo(({message, likeCounter}: PostDataType) => {
    return (
        <div>
            <div className={s.item}>
                <img src={AvatarElephant} alt="Avatar elephant"/>
                <span>{message}</span>
                <div>
                    <span>like {likeCounter}</span>
                </div>
            </div>
        </div>
    )
})