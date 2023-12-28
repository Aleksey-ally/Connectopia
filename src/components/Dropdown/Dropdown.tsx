import { ComponentPropsWithoutRef, ElementRef, forwardRef, ReactNode, useState } from 'react'

import * as DropdownPrimitive from '@radix-ui/react-dropdown-menu'
import { AnimatePresence, motion } from 'framer-motion'

import s from 'components/Dropdown/Dropdown.module.scss'

export type DropdownProps = {
  children: ReactNode
  trigger?: ReactNode
  align?: 'start' | 'center' | 'end'
  className?: string
} & ComponentPropsWithoutRef<typeof DropdownPrimitive.Content>

export const Dropdown = forwardRef<ElementRef<typeof DropdownPrimitive.Content>, DropdownProps>(
  ({ children, trigger, align = 'end', className }, ref): JSX.Element => {
    const [open, setOpen] = useState(false)

    return (
      <DropdownPrimitive.Root open={open} onOpenChange={setOpen} modal={false}>
        <DropdownPrimitive.Trigger className={s.trigger} asChild>
          {trigger ?? <button></button>}
        </DropdownPrimitive.Trigger>
        <AnimatePresence>
          {open && (
            <DropdownPrimitive.Portal>
              <DropdownPrimitive.Content
                ref={ref}
                className={`${s.content} ${className || ''}`}
                align={align}
                onClick={event => event.stopPropagation()}
                asChild
                forceMount
              >
                <motion.div animate={open ? 'open' : 'closed'}>
                  <div>{children}</div>
                  <DropdownPrimitive.Arrow className={s.arrow} />
                </motion.div>
              </DropdownPrimitive.Content>
            </DropdownPrimitive.Portal>
          )}
        </AnimatePresence>
      </DropdownPrimitive.Root>
    )
  }
)
