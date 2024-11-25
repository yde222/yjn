'use client'

import { type SelectProps } from '@pims-frontend/ui/components/ui/@radix-ui/react-select'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@pims-frontend/ui/components/ui/select'
import React from 'react'
import { UserGridAuthBadge } from '../_components/grid/user-grid-auth-badge'
import { type UserGridSelectOption } from '../user-grid-select-option'

export type UserGridAuthSelectProps = {
  value: string
  selectOptions: UserGridSelectOption[]
  placeholder?: string
  onOpenChange?: SelectProps['onOpenChange']
  onValueChange?: SelectProps['onValueChange']
  className?: string
}

export function UserDetailRoleSelect(props: UserGridAuthSelectProps) {
  const handleClickSelectTrigger: React.MouseEventHandler<HTMLButtonElement> =
    React.useCallback(e => {
      e.stopPropagation()
    }, [])

  return (
    <Select
      value={props.value}
      onOpenChange={props.onOpenChange}
      onValueChange={props.onValueChange}
    >
      <SelectTrigger
        onClick={handleClickSelectTrigger}
        className={props.className}
      >
        <SelectValue placeholder={props.placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {props.selectOptions.map(option => (
            <SelectItem key={option.value} value={option.value}>
              <UserGridAuthBadge color={option.color}>
                {option.displayString}
              </UserGridAuthBadge>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
