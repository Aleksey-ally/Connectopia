import React from "react";
import s from "./FriendsSection.module.css";
import {UsersDataType} from "redux/messagesReducer";


type FriendsSectionPropsType = {
    friendsData: UsersDataType[]
}
export const FriendsSection = ({friendsData}: FriendsSectionPropsType) => {
    return (
        <div className={s.friendSection}>
            <h3 className={s.label}>Friends</h3>
            {friendsData.map(fd =>
                <div className={s.item} key={fd.id}>
                    <img className={s.avatar} src={fd.photoAvatar} alt="#"/> <span>{fd.animalName}</span>
                </div>
            ).slice(0, 3)}

        </div>
    )
}