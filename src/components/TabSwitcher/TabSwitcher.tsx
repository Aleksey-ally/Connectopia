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
}

export const TabSwitcher = ({ tabs, defaultValue, value, onValueChange, children }: Props) => {
  return (
    <TabsRadix.Root defaultValue={defaultValue} value={value} onValueChange={onValueChange}>
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
  value: string
  children?: ReactNode
}

export const TabSwitcherContent = ({ value, children }: TabSwitcherContentType) => {
  return (
    <TabsRadix.Content className={s.content} value={value}>
      {children}
    </TabsRadix.Content>
  )
}
