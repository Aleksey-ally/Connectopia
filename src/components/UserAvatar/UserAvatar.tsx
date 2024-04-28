import AvatarUnknownUser from "imgs/UnknownUser.png";
import s from './UserAvatar.module.css'
import {ComponentPropsWithoutRef, ElementRef, forwardRef, memo} from "react";

type Props = {
    photos?: string | null
    size: 'medium' | 'small' | 'large'
} & ComponentPropsWithoutRef<'img'>

export const UserAvatar = memo(forwardRef<ElementRef<'img'>, Props>(
    ({photos, size, className = '', children, ...rest}, ref) => {
        return <div className={className}>
            <img ref={ref} className={`${s.avatar} ${s[size]}`} {...rest}
                 src={photos || AvatarUnknownUser} alt="User avatar"/>
            {children}
        </div>
    }))