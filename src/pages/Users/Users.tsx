import { UserAvatar } from "components/UserAvatar/UserAvatar";
import { NavLink } from "react-router-dom";
import { UsersType } from "redux/usersReducer";
import s from "./Users.module.css";
import {Pagination} from "components/Pagination/Pagination";

export type UsersPropsType = {
    usersData: UsersType
    follow: (userID: number) => void
    unFollow: (userID: number) => void
    onClickPageHandler: (page: number) => void
    setItemsPerPage:(pageSize:number) => void
}

export const Users = ({ usersData, follow, unFollow, onClickPageHandler, setItemsPerPage }: UsersPropsType) => {

    const pagesCount = Math.ceil(usersData.totalUsersCount / usersData.pageSize)

    return (
        <div className={s.users}>
            <div>
                <Pagination count={pagesCount} page={usersData.currentPage} onChange={onClickPageHandler} perPage={usersData.pageSize} onPerPageChange={(pageSize)=>setItemsPerPage(Number(pageSize))} perPageOptions={[5, 10, 20, 30, 40, 50]} />
                {usersData.users.map(u => (
                    <div key={u.id}>
                        <span>
                            <NavLink to={'/profile/' + u.id}>
                                <UserAvatar size={'medium'} key={u.id} photos={u.photos.small} />
                            </NavLink>
                            <div>
                                {u.followed
                                    ? <button onClick={() => unFollow(u.id)} disabled={u.toggleFollowing}>Unfollow</button>
                                    : <button onClick={() => follow(u.id)} disabled={u.toggleFollowing}>Follow</button>}
                            </div>
                        </span>
                        <span>
                            <span>
                                <div>{u.name}</div>
                                <div>{u.status}</div>
                            </span>
                            <span>
                                <div>{u.location.country}</div>
                                <div>{u.location.city}</div>
                            </span>
                        </span>
                    </div>
                ))
                }
            </div >
        </div >
    )
}