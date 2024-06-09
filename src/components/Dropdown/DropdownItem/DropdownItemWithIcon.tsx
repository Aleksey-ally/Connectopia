import {ComponentPropsWithoutRef, ElementRef, forwardRef, ReactNode} from 'react'

import * as DropdownPrimitive from '@radix-ui/react-dropdown-menu'
import {motion} from 'framer-motion'

import {dropdownAnimations} from './DropdownAnimation'
import s from './DropdownItem.module.scss'
import {DropdownItemProps} from './DropdownItem'
import {Typography} from 'components/Typography/Typography'

export type DropdownItemWithIconProps = Omit<DropdownItemProps, 'children'> & {
    icon: ReactNode
    text: string
} & ComponentPropsWithoutRef<typeof DropdownPrimitive.Item>
export const DropdownItemWithIcon = forwardRef<
    ElementRef<typeof DropdownPrimitive.Item>,
    DropdownItemWithIconProps
>(({icon, text, onSelect, className = '', ...props}, ref): JSX.Element => {
    return (
        <DropdownPrimitive.Item ref={ref} className={`${s.item} ${className}`} asChild {...props}>
            <motion.div {...dropdownAnimations.item}>
                <div className={s.itemIcon}>{icon}</div>
                <Typography className={s.text} variant="caption">{text}</Typography>
            </motion.div>
        </DropdownPrimitive.Item>
    )
})
