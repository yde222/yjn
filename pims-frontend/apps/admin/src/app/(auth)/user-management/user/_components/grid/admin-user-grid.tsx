'use client'

import { SearchUser } from '@pims-frontend/admin/lib/features/user-management/search-user'
import { UserGridFilter } from '@pims-frontend/admin/lib/features/user-management/user-grid-filter'
import { Button } from '@pims-frontend/ui/components/ui/button'
import {
  MaterialReactTable,
  type MRT_Row,
  type MRT_RowData,
  MRT_TableState,
  useMaterialReactTable,
} from '@pims-frontend/ui/components/ui/material-react-table'
import { ParameterizedIcon } from '@pims-frontend/ui/components/ui/parameterized-icon'
import { Separator } from '@pims-frontend/ui/components/ui/separator'
import { TooltipProvider } from '@pims-frontend/ui/components/ui/tooltip'
import React from 'react'
import { useColumns } from './use-columns'
import { UserGridAuthSelectProps } from './user-grid-cell-auth-select'
import { type UserGridFilterDropdownButtonProps } from './user-grid-filter-dropdown-button'

export type AdminUserGridProps<RowData extends MRT_RowData> = {
  data: RowData[]
  onClickRow?: (
    row: MRT_Row<RowData>,
  ) => React.MouseEventHandler<HTMLTableRowElement>
  onClickResetPassword?: (
    row: MRT_Row<RowData>,
  ) => React.MouseEventHandler<HTMLButtonElement>
  onClickDropdownMenuItem?: UserGridFilterDropdownButtonProps['onClickDropdownMenuItem']
  onOpenChange?: (
    row: MRT_Row<RowData>,
  ) => UserGridAuthSelectProps<RowData>['onOpenChange']
  onValueChange?: (
    row: MRT_Row<RowData>,
  ) => UserGridAuthSelectProps<RowData>['onValueChange']
  pagination: MRT_TableState<RowData>['pagination']
} & Partial<
  Pick<MRT_TableState<RowData>, 'isLoading' | 'isSaving' | 'showProgressBars'>
>

export function AdminUserGrid<RowData extends MRT_RowData>({
  data,
  onClickRow,
  onClickResetPassword,
  onOpenChange,
  onClickDropdownMenuItem,
  onValueChange,
  isLoading,
  isSaving,
  showProgressBars,
  pagination,
}: AdminUserGridProps<RowData>) {
  const [columns] = useColumns({
    onOpenChange,
    onValueChange,
    onClickResetPassword,
  })

  const table = useMaterialReactTable({
    columns,
    data,
    muiTableProps: {
      sx: theme => ({
        borderRadius: theme.shape.borderRadius,
      }),
    },

    enableTopToolbar: true,
    renderTopToolbar: props => (
      <div className="">
        <div className="flex flex-row px-4 py-2">
          <SearchUser />
        </div>
        <Separator orientation="horizontal" />
        <div className="flex flex-row justify-start px-4 py-2">
          <div className="flex flex-col gap-3">
            <UserGridFilter />
            <p className="text-xs font-medium">
              전체{' '}
              <span className="text-[--violet-10]">
                {props.table.getRowCount()}
              </span>
            </p>
          </div>
        </div>
      </div>
    ),

    enableColumnActions: false,
    muiTableHeadCellProps: {
      sx: {
        '&:first-of-type': {
          borderLeft: 0,
          borderRight: '1px solid hsl(var(--border))',
          borderBottom: '1px solid hsl(var(--border))',
          borderTop: '1px solid hsl(var(--border))',
        },
        '&:last-of-type': {
          borderLeft: '1px solid hsl(var(--border))',
          borderRight: 0,
          borderBottom: '1px solid hsl(var(--border))',
          borderTop: '1px solid hsl(var(--border))',
        },
        border: '1px solid hsl(var(--border))',
        paddingLeft: 2,
        paddingRight: 2,
      },
    },
    icons: {
      SyncAltIcon: () => <ParameterizedIcon name="ChevronsUpDown" />,
      ArrowDownwardIcon: () => <ParameterizedIcon name="ChevronDown" />,
    },
    enableRowSelection: false,

    muiTableBodyRowProps: ({ row }) => ({
      onClick: onClickRow?.(row),
      sx: { cursor: 'pointer' },
    }),

    muiTableBodyCellProps: {
      sx: {
        '&:first-of-type': {
          borderLeft: 0,
          borderRight: '1px solid hsl(var(--border))',
          borderBottom: '1px solid hsl(var(--border))',
          borderTop: '1px solid hsl(var(--border))',
        },
        '&:last-of-type': {
          borderLeft: '1px solid hsl(var(--border))',
          borderRight: 0,
          borderBottom: '1px solid hsl(var(--border))',
          borderTop: '1px solid hsl(var(--border))',
        },
        border: '1px solid hsl(var(--border))',
        padding: 0.5,
        paddingLeft: 2,
        paddingRight: 2,
      },
    },

    enableBottomToolbar: true,
    renderBottomToolbar: props => (
      <div className="flex flex-row justify-start gap-2.5 px-4 py-2">
        <Button variant="ghost" size="icon" disabled>
          <ParameterizedIcon name="ListVideo" />
        </Button>
        <Button variant="ghost" size="icon" disabled>
          <ParameterizedIcon name="WrapText" />
        </Button>
        <Button variant="ghost" size="icon" disabled>
          <ParameterizedIcon name="WrapText" className="rotate-180" />
        </Button>
        <Button variant="ghost" size="icon">
          <ParameterizedIcon name="PanelTopDashed" />
        </Button>
        <Button variant="ghost" size="icon">
          <ParameterizedIcon name="PanelBottomDashed" />
        </Button>
      </div>
    ),

    localization: {
      sortByColumnAsc: '오름차순 정렬',
      sortByColumnDesc: '내림차순 정렬',
      sortedByColumnAsc: '오름차순 정렬됨',
      sortedByColumnDesc: '내림차순 정렬됨',
    },

    state: {
      isLoading: isLoading || false,
      isSaving: isSaving || false,
      showProgressBars: isLoading || false,
      pagination,
    },

    initialState: {
      density: 'compact',
      columnOrder: [
        'userId',
        'userName',
        'companyName',
        'subProjects',
        'authorityCode',
        'resetPassword',
      ],
    },
  })

  return (
    <TooltipProvider>
      <MaterialReactTable table={table} />
    </TooltipProvider>
  )
}
