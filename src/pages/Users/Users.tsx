import {UserAvatar} from "components/UserAvatar";
import {NavLink} from "react-router-dom";
import {UsersType} from "redux/usersReducer";
import s from "pages/Users/Users.module.scss";
import {Pagination} from "components/Pagination";
import {Typography} from "components/Typography";
import {Button} from "components/Button";
import {memo} from "react";

export type UsersPropsType = {
    usersData: UsersType
    follow: (userID: number) => void
    unFollow: (userID: number) => void
    setCurrentPage: (page: number) => void
    setPageSize: (pageSize: number) => void
}

export const Users = memo(({usersData, follow, unFollow, setCurrentPage, setPageSize}: UsersPropsType) => {

    const pagesCount = Math.ceil(usersData.totalUsersCount / usersData.pageSize)

    return (
        <div className={s.users}>
            <Pagination count={pagesCount} page={usersData.currentPage} onChange={setCurrentPage}
                        perPage={usersData.pageSize} onPerPageChange={(pageSize) => setPageSize(Number(pageSize))}
                        perPageOptions={[5, 10, 20, 30, 40, 50]}/>
            {usersData.users.map(u => (
                <div className={s.user} key={u.id}>
                    <div className={s.userInfo}>
                        <NavLink className={s.linkAvatar} to={`/profile/${u.id}`}>
                            <UserAvatar size={'medium'} key={u.id} photos={u.photos.small}/>
                        </NavLink>
                        <div className={s.description}>
                            <NavLink to={`/profile/${u.id}`}>
                                <Typography className={`${s.item} ${s.name}`} as={'h5'}
                                            variant={'h5'}>{u.name}</Typography>
                            </NavLink>
                            <Typography className={`${s.item} ${s.status}`} as={'span'}
                                        variant={'subtitle2'}>{u.status}</Typography>
                        </div>
                    </div>

                    {u.followed
                        ? <Button variant={'secondary'} onClick={() => unFollow(u.id)}
                                  disabled={u.toggleFollowing}>Unfollow</Button>
                        : <Button onClick={() => follow(u.id)}
                                  disabled={u.toggleFollowing}>Follow</Button>}


                </div>
            ))}
        </div>
    )
})