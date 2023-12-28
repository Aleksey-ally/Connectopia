import { ComponentPropsWithoutRef, ElementRef, forwardRef, ReactNode } from 'react'

import * as DropdownPrimitive from '@radix-ui/react-dropdown-menu'
import { motion } from 'framer-motion'

import s from 'components/Dropdown/DropdownItem/DropdownItem.module.scss'

import { dropdownAnimations } from './DropdownAnimation'

export type DropdownItemProps = {
  children: ReactNode
  onSelect?: (event: Event) => void
  className?: string
  text?: string
} & ComponentPropsWithoutRef<typeof DropdownPrimitive.Item>

export const DropdownItem = forwardRef<
  ElementRef<typeof DropdownPrimitive.Item>,
  DropdownItemProps
>(({ children, onSelect, className }, ref): JSX.Element => {
  const DropdownItemClasses = `${s.item} ${className}`

  return (
    <DropdownPrimitive.Item ref={ref} className={DropdownItemClasses} onSelect={onSelect} asChild>
      <motion.div {...dropdownAnimations.item}>{children}</motion.div>
    </DropdownPrimitive.Item>
  )
})
