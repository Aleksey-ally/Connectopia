import AvatarUnknownUser from "imgs/UnknownUser.png";
import s from './UserAvatar.module.css'

type Props = {
    photos?: string | null
    size:'medium' | 'small'
}

export const UserAvatar = ({ photos, size }: Props) => {
    return <>
        <img className={s[size]}
            src={photos || AvatarUnknownUser} alt="User avatar" />
    </>
}