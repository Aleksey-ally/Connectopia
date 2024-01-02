import AvatarUnknownUser from "imgs/UnknownUser.png";
import s from './UserAvatar.module.css'
import {ComponentPropsWithoutRef, ElementRef, forwardRef} from "react";

type Props = {
    photos?: string | null
    size:'medium' | 'small'
} & ComponentPropsWithoutRef<'img'>

export const UserAvatar = forwardRef<ElementRef<'img'>, Props>(
    ({ photos, size, className ='', ...rest }, ref) => {
    return <>
        <img ref={ref}  className={`${s.avatar} ${s[size]} ${className}`} {...rest}
            src={photos || AvatarUnknownUser} alt="User avatar" />
    </>
})