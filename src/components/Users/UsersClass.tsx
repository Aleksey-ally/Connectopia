import axios from "axios";
import React, { ChangeEvent } from "react";
import AvatarUnknownUser from "../../imgs//UnknownUser.png";
import { UserType, UsersType } from "redux/usersReducer";
import s from "./Users.module.css";

export type UsersPropsType = {
    usersData: UsersType
    dispatchFollow: (userId: number) => void
    dispatchNewUsers: (users: UserType[]) => void
    dispatchNewCurrentPage: (currentPage: number) => void
}

export type BaseResponseType<D = {}> = {
    data: D;
};

type UsersResponseType = {
    items: UserType[]
    totalCount: number
}

export class UsersClass extends React.Component<UsersPropsType> {

    componentDidMount(): void {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.usersData.pageSize}&page=${this.props.usersData.currentPage}`).then((res: BaseResponseType<UsersResponseType>) => {
            this.props.dispatchNewUsers(res.data.items.map(u => ({ ...u, location: { country: "Belarus", city: "Minsk" } })));
            this.props.usersData.totalUsersCount = res.data.totalCount
        });
    }

    onClickFollow = (userId: number) => {
        this.props.dispatchFollow(userId);
    }


    render() {

        const pagesCount = Math.ceil(this.props.usersData.totalUsersCount / this.props.usersData.pageSize)
        const pages: number[] = []

        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }

        const onClickPageHandler = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
            this.props.dispatchNewCurrentPage(+e.currentTarget.innerHTML)
        }

        return (
            <div>
                <div>
                    {pages.map(p =>
                        <span className={this.props.usersData.currentPage === p ? s.selectedPage : ""} onClick={onClickPageHandler}>
                            {p}
                        </span>
                    )}
                </div>
                {this.props.usersData.users.map(u => (
                    <div key={u.id}>
                        <span>
                            <div>
                                <img className={s.userAvatar} src={u.photos.small == null ? AvatarUnknownUser : u.photos.small} alt="#" />
                            </div>
                            <div>
                                <button onClick={() => this.onClickFollow(u.id)}>{u.followed ? "Follow" : "Unfollow"}</button>
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
        );
    }
}