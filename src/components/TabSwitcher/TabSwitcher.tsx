import { ReactNode } from 'react'

import * as TabsRadix from '@radix-ui/react-tabs'

import {Typography} from "components/Typography";

import s from 'components/TabSwitcher/TabSwitcher.module.scss'

type Tab = {
  title: string
  value: string
  disabled?: boolean
}

type Props = {
  tabs: Tab[]
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  children?: ReactNode
  className?: string
}

export const TabSwitcher = ({ tabs, defaultValue, value, onValueChange, children, className, ...rest }: Props) => {
  return (
    <TabsRadix.Root className={className} defaultValue={defaultValue} value={value} onValueChange={onValueChange} {...rest}>
      <TabsRadix.List className={s.list}>
        {tabs.map(t => {
          return (
            <TabsRadix.Trigger
              key={t.value}
              className={`${s.default} ${value === t.value && s.active}`}
              value={t.value}
              disabled={t.disabled}
            >
              <Typography variant="body1">{t.title}</Typography>
            </TabsRadix.Trigger>
          )
        })}
      </TabsRadix.List>
      {children}
    </TabsRadix.Root>
  )
}

type TabSwitcherContentType = {
  className?:string
  value: string
  children?: ReactNode
}

export const TabSwitcherContent = ({className, value, children}: TabSwitcherContentType) => {
  return (
    <TabsRadix.Content className={`${s.content} ${className}`} value={value}>
      {children}
    </TabsRadix.Content>
  )
}
