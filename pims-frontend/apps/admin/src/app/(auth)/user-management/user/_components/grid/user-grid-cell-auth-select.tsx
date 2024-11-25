'use client'

import { type SelectProps } from '@pims-frontend/ui/components/ui/@radix-ui/react-select'
import {
  type MRT_ColumnDef,
  type MRT_RowData,
} from '@pims-frontend/ui/components/ui/material-react-table'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@pims-frontend/ui/components/ui/select'
import { GetPropsObjectType } from '@pims-frontend/ui/lib/utility-types'
import React from 'react'
import { type UserGridSelectOption } from '../../user-grid-select-option'
import { UserGridAuthBadge } from './user-grid-auth-badge'

export type UserGridAuthSelectProps<
  TData extends MRT_RowData,
  TValue = unknown,
> = GetPropsObjectType<MRT_ColumnDef<TData, TValue>['Cell']> & {
  selectOptions: UserGridSelectOption[]
  placeholder?: string
  onOpenChange?: SelectProps['onOpenChange']
  onValueChange?: SelectProps['onValueChange']
}

export function UserGridCellAuthSelect<
  TData extends MRT_RowData,
  TValue = unknown,
>(props: UserGridAuthSelectProps<TData, TValue>) {
  const handleClickSelectTrigger: React.MouseEventHandler<HTMLButtonElement> =
    React.useCallback(e => {
      e.stopPropagation()
    }, [])

  return (
    <Select
      value={props.cell.getValue() as string}
      onOpenChange={props.onOpenChange}
      onValueChange={props.onValueChange}
    >
      <SelectTrigger
        className="border-none bg-transparent px-0 py-0"
        onClick={handleClickSelectTrigger}
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
