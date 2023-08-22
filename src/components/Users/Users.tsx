import axios from "axios";
import { useEffect } from "react";
import AvatarUnknownUser from "../../imgs//UnknownUser.png";
import { UserType, UsersType } from "../../redux/usersReducer";
import s from "./Users.module.css";

export type UsersPropsType = {
    usersData: UsersType
    dispatchFollow: (userId: number) => void
    dispatchNewUsers: (users: UserType[]) => void
}

type UsersDomainType = UsersType

export type BaseResponseType<D = {}> = {
    data: D;
};

export const Users = ({ usersData, dispatchFollow, dispatchNewUsers }: UsersPropsType) => {
    useEffect(() => {
        axios.get("https://social-network.samuraijs.com/api/1.0/users").then((res: BaseResponseType<{ items: UserType[] }>) => {
            console.log(res)
            dispatchNewUsers(res.data.items.map((u) => ({ ...u, location: { country: "Belarus", city: "Minsk" } })))
        })
    }, [])

    return <div>
        {usersData.users.map(u => {
            const onClickFollow = () => {
                dispatchFollow(u.id)
            }
            return (<div key={u.id}>
                <span>
                    <div>
                        <img className={s.userAvatar} src={u.photos.small == null ? AvatarUnknownUser : u.photos.small} alt="#" />
                    </div>
                    <div>
                        <button onClick={onClickFollow}>{u.followed ? "Follow" : "Unfollow"}</button>
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

            </div>)
        }
        )
        }

    </div>
}