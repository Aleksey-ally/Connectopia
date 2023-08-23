import axios from "axios";
import React from "react";
import AvatarUnknownUser from "../../imgs//UnknownUser.png";
import { UserType, UsersType } from "../../redux/usersReducer";
import s from "./Users.module.css";

export type UsersPropsType = {
    usersData: UsersType
    dispatchFollow: (userId: number) => void
    dispatchNewUsers: (users: UserType[]) => void
}

export type BaseResponseType<D = {}> = {
    data: D;
};

export class UsersClass extends React.Component<UsersPropsType> {

    constructor(props: UsersPropsType) {
        super(props);
        
        axios.get("https://social-network.samuraijs.com/api/1.0/users").then((res: BaseResponseType<{ items: UserType[] }>) => {
            const modifiedUsers = res.data.items.map(u => ({ ...u, location: { country: "Belarus", city: "Minsk" } }));
            this.props.dispatchNewUsers(modifiedUsers);
        });
    }

    onClickFollow = (userId: number) => {
        this.props.dispatchFollow(userId);
    }

    render() {

        return (
            <div>
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