import AvatarUnknownUser from "../../imgs//UnknownUser.png";
import { UsersType } from "redux/usersReducer";
import s from "./Users.module.css";
import { Routes } from "react-router-dom";
import { NavLink } from "react-router-dom";

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
                        <span  className={`${s.page} ${usersData.currentPage === p ? s.selectedPage : ""}`}
                            onClick={() => onClickPageHandler(p)}>
                            {p}
                        </span>
                    )}
                    <span className={`${s.page} ${usersData.currentPage === pagesCount ? s.selectedPage : ""}`} onClick={() => onClickPageHandler(pagesCount)}>...{pagesCount}</span>
                </div>
                {usersData.users.map(u => (
                    <div key={u.id}>
                        <span>
                            <div>
                                <NavLink to={'/profile/' + u.id}>
                                    <img className={s.userAvatar}
                                        src={u.photos.small == null ? AvatarUnknownUser : u.photos.small} alt="#" />
                                </NavLink>
                            </div>
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