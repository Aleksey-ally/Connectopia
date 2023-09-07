import AvatarUnknownUser from "imgs/UnknownUser.png";
import s from './UserAvatar.module.css'

type Props = {
    photos: string | null | undefined
}

export const UserAvatar = ({ photos }: Props) => {
    return <div>
        <img className={s.userAvatar}
            src={photos || AvatarUnknownUser} alt="User avatar" />
    </div>
}