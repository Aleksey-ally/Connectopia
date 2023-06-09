import React from "react";
import s from "./FriendsSection.module.css";
import {UsersDataType} from "../../../redux/store";

type PropsType = {
    friendsData: UsersDataType[]
}
export const FriendsSection: React.FC<PropsType> = ({friendsData}) => {
    return (
        <div className={s.friendSection}>
            <h3 className={s.title}>Friends</h3>
            {friendsData.map(fd =>
                <div key={fd.id}>
                    <img src={fd.photoAvatar} alt="#"/> <span>{fd.animalName}</span>
                </div>
            ).slice(0, 3)}

        </div>
    )
}