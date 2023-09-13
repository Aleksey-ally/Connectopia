import { UserAvatar } from "components/UserAvatar/UserAvatar";
import { NavLink } from "react-router-dom";
import { UsersType } from "redux/usersReducer";
import s from "./Users.module.css";
import axios from "axios";

export type UsersPropsType = {
    usersData: UsersType
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    onClickPageHandler: (page: number) => void
}

export const Users = ({ usersData, follow, unFollow, onClickPageHandler }: UsersPropsType) => {

    const pagesCount = Math.ceil(usersData.totalUsersCount / usersData.pageSize)
    const pages: number[] = []
    for (let i = 1; i <= 10; i++) {
        pages.push(i)
    }


    return (
        <div className={s.users}>
            <div>
                <div>
                    {pages.map(p =>
                        <span key={p} className={`${s.page} ${usersData.currentPage === p ? s.selectedPage : ""}`}
                            onClick={() => onClickPageHandler(p)}>
                            {p}
                        </span>
                    )}
                    <span className={`${s.page} ${usersData.currentPage === pagesCount ? s.selectedPage : ""}`} onClick={() => onClickPageHandler(pagesCount)}>...{pagesCount}</span>
                </div>
                {usersData.users.map(u => (
                    <div key={u.id}>
                        <span>
                            <NavLink to={'/profile/' + u.id}>
                                <UserAvatar size={'medium'} key={u.id} photos={u.photos.small} />
                            </NavLink>
                            <div>
                                {u.followed
                                    ? <button onClick={() => {
                                        axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, { withCredentials: true })
                                            .then(res => {
                                                unFollow(u.id)
                                            })
                                    }}>Unfollow</button>
                                    : <button onClick={() => {
                                        axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, null, { withCredentials: true, headers: { 'API-KEY': 'bfc1e1b1-e625-4414-a10c-6bab615df806' } })
                                            .then(res => {
                                                follow(u.id)
                                            })
                                    }}>Follow</button>}
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
                ))}
            </div>
        </div>
    )
}