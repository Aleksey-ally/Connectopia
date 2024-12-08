import React, {memo} from "react";
import {NavLink} from 'react-router-dom'
import s from 'components/UserItem/UserItem.module.scss'
import {UserAvatar} from "components/UserAvatar";
import {Typography} from "components/Typography";
import {UserType} from "redux/usersReducer";
import {Button} from "components/Button";

type UserItemType =
    Omit<UserType, 'followed' | 'toggleFollowing'>
    & Partial<Pick<UserType, 'followed' | 'toggleFollowing'>>
    & {
    follow?: (id: number) => void
    unFollow?: (id: number) => void
    className?: string
    userAvatar?: 'medium' | 'small' | 'large'
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
                                  userAvatar = 'medium'
                              }: UserItemType) => {

    return (
        <div className={`${s.user} ${className}`}>
            <div className={s.userInfo}>
                <NavLink className={s.linkAvatar} to={`/profile/${id}`}>
                    <UserAvatar size={userAvatar} photos={photos.small}/>
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
                              disabled={toggleFollowing}>Unfollow</Button>
                    : <Button onClick={() => follow(id)}
                              disabled={toggleFollowing}>Follow</Button>)}
        </div>
    )
})