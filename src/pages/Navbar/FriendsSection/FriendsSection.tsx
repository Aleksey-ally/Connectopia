import React, {memo} from "react";
import s from "pages/Navbar/FriendsSection/FriendsSection.module.scss";
import {UsersDataType} from "redux/messagesReducer";


type FriendsSectionPropsType = {
    friendsData: UsersDataType[]
}
export const FriendsSection = memo(({friendsData}: FriendsSectionPropsType) => {
    return (
        <div className={s.friendSection}>
            <h3 className={s.label}>Friends</h3>
            {friendsData.map(fd =>
                <div className={s.item} key={fd.id}>
                    <img className={s.avatar} src={fd.photoAvatar} alt={`${fd.animalName} avatar`}/> <span>{fd.animalName}</span>
                </div>
            ).slice(0, 3)}

        </div>
    )
})