import {ComponentPropsWithoutRef, ElementType, ForwardedRef, forwardRef} from 'react'

import s from './Button.module.scss'

export type ButtonProps<T extends ElementType = 'button'> = {
    as?: T
    variant?: 'primary' | 'secondary' | 'tertiary' | 'link'
    fullWidth?: boolean
} & ComponentPropsWithoutRef<T>

export const Button = forwardRef(<T extends ElementType = 'button'>(
    props: ButtonProps<T>,
    ref: ForwardedRef<HTMLButtonElement>
) => {
    const {variant = 'primary', fullWidth, className = '', as: Component = 'button', ...rest} = props

    return (
        <Component
            className={`${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className}`}
            {...rest}
            ref={ref}
        />
    )
})
