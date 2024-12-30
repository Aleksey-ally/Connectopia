import React, {memo} from "react";
import s from "pages/Navbar/FriendsSection/FriendsSection.module.scss";
import {Avatar} from "components/Avatar";
import {UserType} from "api/users/users.types";
import {useTranslation} from "react-i18next";


type FriendsSectionPropsType = {
    friendsData: UserType[]
}
export const FriendsSection = memo(({friendsData}: FriendsSectionPropsType) => {
    const {t} = useTranslation();

    return (
        <div className={s.friendSection}>
            <h3 className={s.label}>{t('navbar.friends')}</h3>
            {friendsData.map(fd =>
                <div className={s.item} key={fd.id}>
                    <div><Avatar size={'small'} photo={fd.photos.small}/></div>
                    <span className={s.name}>{fd.name}</span>
                </div>
            )}

        </div>
    )
})