import AvatarUnknownUser from "assets/imgs/UnknownUser.png";
import s from 'components/Avatar/Avatar.module.scss'
import {ComponentPropsWithoutRef, ElementRef, forwardRef, memo} from "react";

type Props = {
    photo?: string | null
    size: 'medium' | 'small' | 'large'
    alt?: string
} & ComponentPropsWithoutRef<'img'>

export const Avatar = memo(forwardRef<ElementRef<'img'>, Props>(
    ({photo, size, alt, className = '', children, ...rest}, ref) => {
        return <>
            <img ref={ref} className={`${s.avatar} ${s[size]} ${className}`} {...rest}
                 src={photo || AvatarUnknownUser} alt={alt ? alt : "Avatar"}/>
            {children}
        </>
    }))