import React, {memo} from "react";
import s from "pages/Navbar/FriendsSection/FriendsSection.module.scss";
import {UsersDataType} from "redux/messagesReducer";
import {UserAvatar} from "components/UserAvatar";
import {UserType} from "redux/usersReducer";


type FriendsSectionPropsType = {
    friendsData: UserType[]
}
export const FriendsSection = memo(({friendsData}: FriendsSectionPropsType) => {
    return (
        <div className={s.friendSection}>
            <h3 className={s.label}>Friends</h3>
            {friendsData.map(fd =>
                <div className={s.item} key={fd.id}>
                    <UserAvatar size={'small'}/>
                    <span>{fd.name}</span>
                </div>
            ).slice(0, 3)}

        </div>
    )
})