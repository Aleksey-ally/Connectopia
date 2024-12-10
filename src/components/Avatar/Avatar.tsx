import AvatarUnknownUser from "assets/imgs/UnknownUser.png";
import s from 'components/Avatar/Avatar.module.scss'
import {ComponentPropsWithoutRef, ElementRef, forwardRef, memo} from "react";

type Props = {
    photos?: string | null
    size: 'medium' | 'small' | 'large'
    alt?: string
} & ComponentPropsWithoutRef<'img'>

export const Avatar = memo(forwardRef<ElementRef<'img'>, Props>(
    ({photos, size, alt, className = '', children, ...rest}, ref) => {
        return <div className={className}>
            <img ref={ref} className={`${s.avatar} ${s[size]}`} {...rest}
                 src={photos || AvatarUnknownUser} alt={alt ? alt : "Avatar"}/>
            {children}
        </div>
    }))