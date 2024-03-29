import * as CheckboxRadix from '@radix-ui/react-checkbox'

import s from 'components/Checkbox/Checkbox.module.scss'

import {CheckMark} from 'assets/icons'
import {Typography} from "components/Typography";
import {ElementRef, forwardRef, ReactNode} from "react";

export type CheckboxProps = {
    className?: string
    label?: string | ReactNode
    checked?: boolean
    onValueChange?: (checked: boolean) => void
    disabled?: boolean
    required?: boolean
}

export const Checkbox = forwardRef<ElementRef<typeof CheckboxRadix.Root>, CheckboxProps>((
    {
        className = '',
        label,
        checked,
        onValueChange,
        disabled,
        required
    }, ref) => {
    const classNames = {
        label: `${s.label} ${disabled ? s.labelDisabled : ''}`,
        checkBox: `${s.default} ${!checked ? s.uncheck : ''} ${className}`,
    }

    return (
        <Typography className={classNames.label} as={'label'} variant={'body2'}>
            <CheckboxRadix.Root
                ref={ref}
                className={classNames.checkBox}
                checked={checked}
                onCheckedChange={onValueChange}
                disabled={disabled}
                required={required}
            >
                <CheckboxRadix.Indicator>
                    {checked && <CheckMark disabled={disabled}/>}
                </CheckboxRadix.Indicator>
            </CheckboxRadix.Root>
            {label}
        </Typography>
    )
})
