'use client'

import { format } from '@pims-frontend/ui/components/ui/date-fns'
import {
  type MRT_ColumnDef,
  type MRT_RowData,
} from '@pims-frontend/ui/components/ui/material-react-table'
import { ParameterizedIcon } from '@pims-frontend/ui/components/ui/parameterized-icon'
import { type SelectProps } from '@pims-frontend/ui/components/ui/radix-ui'
import { GetPropsObjectType } from '@pims-frontend/ui/lib/utility-types'
import { safeParseMultiFormatAndFormat } from '@pims-frontend/ui/lib/date-fns-additional-utils'
import React from 'react'

export type ProjectGridRangePickerProps<
  TData extends MRT_RowData,
  TValue = unknown,
> = GetPropsObjectType<MRT_ColumnDef<TData, TValue>['Cell']> & {
  placeholder?: string
  onOpenChange?: SelectProps['onOpenChange']
  onValueChange?: SelectProps['onValueChange']
}

export function ProjectGridCellRangeDate<
  TData extends MRT_RowData,
  TValue = unknown,
>(props: ProjectGridRangePickerProps<TData, TValue>) {
  const staYmd = safeParseMultiFormatAndFormat(props.row.original.staYmd)
  const endYmd = safeParseMultiFormatAndFormat(props.row.original.endYmd)

  return (
    <div className="flex items-center">
      <ParameterizedIcon name="Calendar" className="h-4 w-4" />
      <div className="ml-2 flex gap-1 items-center">
        <div>{staYmd}</div>
        <ParameterizedIcon name="Minus" className="w-1.5 h-3" />
        <div>{endYmd}</div>
      </div>
    </div>
  )
}
