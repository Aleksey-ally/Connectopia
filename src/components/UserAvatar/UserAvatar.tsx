import AvatarUnknownUser from "imgs/UnknownUser.png";
import s from './UserAvatar.module.css'
import {ComponentPropsWithoutRef} from "react";

type Props = {
    photos?: string | null
    size:'medium' | 'small'
} & ComponentPropsWithoutRef<'img'>

export const UserAvatar = ({ photos, size, className ='', ...rest }: Props) => {
    return <>
        <img  className={`${s.avatar} ${s[size]} ${className}`} {...rest}
            src={photos || AvatarUnknownUser} alt="User avatar" />
    </>
}