import React, {memo} from "react";
import {NavLink} from 'react-router-dom'
import s from 'components/UserItem/UserItem.module.scss'
import {Avatar} from "components/Avatar";
import {Typography} from "components/Typography";
import {Button} from "components/Button";
import {UserType} from "api/users/users.types";
import {useTranslation} from "react-i18next";

type UserItemType =
    Omit<UserType, 'followed' | 'toggleFollowing'>
    & Partial<Pick<UserType, 'followed' | 'toggleFollowing'>>
    & {
    follow?: (id: number) => void
    unFollow?: (id: number) => void
    className?: string
    userAvatar?: 'medium' | 'small' | 'large'
    handleGetDialogData?: (uID: number, page: number, count: number, name:string, photo:string | null) => void
}

export const UserItem = memo(({
                                  id,
                                  photos,
                                  name,
                                  status,
                                  followed,
                                  toggleFollowing,
                                  follow,
                                  unFollow,
                                  className,
                                  userAvatar = 'medium',
                                  handleGetDialogData
                              }: UserItemType) => {

    const {t} = useTranslation();

    return (
        <div className={`${s.user} ${className}`} onClick={() => handleGetDialogData?.(id, 1, 20, name, photos?.small)}>
            <div className={s.userInfo}>
                <NavLink className={s.linkAvatar} to={`/profile/${id}`}>
                    <Avatar size={userAvatar} photo={photos.small}/>
                </NavLink>
                <div className={s.description}>
                    <NavLink to={`/profile/${id}`}>
                        <Typography className={`${s.item} ${s.name}`} as={'h5'}
                                    variant={'h5'}>{name}</Typography>
                    </NavLink>
                    <Typography className={`${s.item} ${s.status}`} as={'span'}
                                variant={'subtitle2'}>{status}</Typography>
                </div>
            </div>

            {follow && unFollow &&
                (followed
                    ? <Button variant={'secondary'} onClick={() => unFollow(id)}
                              disabled={toggleFollowing}>{t("users.unfollow")}</Button>
                    : <Button onClick={() => follow(id)}
                              disabled={toggleFollowing}>{t("users.follow")}</Button>)}
        </div>
    )
})