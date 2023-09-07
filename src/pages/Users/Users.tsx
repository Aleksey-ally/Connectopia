import { UserAvatar } from "components/UserAvatar/UserAvatar";
import { NavLink } from "react-router-dom";
import { UsersType } from "redux/usersReducer";
import s from "./Users.module.css";

export type UsersPropsType = {
    usersData: UsersType
    onClickFollow: (userId: number) => void
    onClickPageHandler: (page: number) => void
}

export type BaseResponseType<D = {}> = {
    data: D;
};

export const Users = ({ usersData, onClickFollow, onClickPageHandler }: UsersPropsType) => {


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
                        <span className={`${s.page} ${usersData.currentPage === p ? s.selectedPage : ""}`}
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
                                <UserAvatar photos={u.photos.small} />
                            </NavLink>
                            <div>
                                <button onClick={() => onClickFollow(u.id)}>{u.followed ? "Follow" : "Unfollow"}</button>
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