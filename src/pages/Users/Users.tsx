import {UsersType} from "redux/usersReducer";
import s from "pages/Users/Users.module.scss";
import {Pagination} from "components/Pagination";
import React, {memo} from "react";
import {UserItem} from "components/UserItem";

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
                <UserItem key={u.id} id={u.id} photos={u.photos} name={u.name} status={u.status}
                          followed={u.followed} toggleFollowing={u.toggleFollowing} follow={follow}
                          unFollow={unFollow}/>
            ))}
        </div>
    )
})