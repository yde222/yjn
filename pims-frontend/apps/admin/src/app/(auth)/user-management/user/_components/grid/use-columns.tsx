'use client'

import { useGetAllCodeDetailsQuery } from '@pims-frontend/apis/lib/features/common/code/controller/CodeManagementController'
import { UserGridAuthBadge } from '@pims-frontend/ui/components/ui/badge'
import { Button } from '@pims-frontend/ui/components/ui/button'
import {
  MRT_ColumnDef,
  MRT_Row,
  type MRT_RowData,
} from '@pims-frontend/ui/components/ui/material-react-table'
import { ParameterizedIcon } from '@pims-frontend/ui/components/ui/parameterized-icon'
import {
  ComboboxProps,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@pims-frontend/ui/components/ui/select'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@pims-frontend/ui/components/ui/tooltip'
import React from 'react'
import { badgeColor } from '../../_constants/badgeColor'
import { useGetCodeDetailsByCodeGroupUidWithLocaleQuery } from '@pims-frontend/apis/lib/features/common/code/controller/CodeController'

type UseColumnsProps<RowData extends MRT_RowData> = {
  onOpenChange?: (row: MRT_Row<RowData>) => ComboboxProps['onOpenChange']
  onValueChange?: (row: MRT_Row<RowData>) => ComboboxProps['onValueChange']
  onClickResetPassword?: (
    row: MRT_Row<RowData>,
  ) => React.MouseEventHandler<HTMLButtonElement>
}

export function useColumns<RowData extends MRT_RowData>({
  onOpenChange,
  onValueChange,
  onClickResetPassword,
}: UseColumnsProps<RowData>) {
  const { data: companyCodes } = useGetCodeDetailsByCodeGroupUidWithLocaleQuery(
    {
      codeGroupUid: 3,
    },
  )

  const { data: authCodes } = useGetCodeDetailsByCodeGroupUidWithLocaleQuery({
    codeGroupUid: 1,
  })

  const columns = React.useMemo<MRT_ColumnDef<RowData>[]>(
    () => [
      {
        accessorKey: 'userId',
        header: '사번',
      },
      {
        accessorKey: 'userName',
        header: '사용자명',
      },
      {
        accessorKey: 'companyCode',
        header: '소속',
        Cell(props) {
          const cellValue = props.cell.getValue()
          const matchingCode =
            companyCodes &&
            companyCodes.find(code => code.codeUid === cellValue)
          return (
            <div>
              {matchingCode ? matchingCode.codeValue : 'No matching code'}
            </div>
          )
        },
      },
      {
        accessorFn: user => {
          if (user.projects.length > 1) {
            return `${user.projects?.[0]?.projectName} 외 ${user.projects.length - 1}개`
          }

          if (user.projects.length === 1) {
            return user.projects[0]?.projectName
          }

          return '프로젝트 미투입'
        },
        header: '프로젝트 투입 정보',
        Cell(props) {
          return (
            <Tooltip delayDuration={0}>
              <TooltipTrigger>{props.renderedCellValue}</TooltipTrigger>
              {props.row.original.projects.length > 1 && (
                <TooltipContent>
                  <p>
                    {props.row.original.projects
                      .map((v: { projectName: string }) => v.projectName)
                      .join(', ')}
                  </p>
                </TooltipContent>
              )}
            </Tooltip>
          )
        },
      },
      {
        accessorKey: 'authorityCode',
        header: '시스템 권한',
        // Cell(props) {
        //   return (
        //     <Select
        //       value={props.cell.getValue<string>()}
        //       onValueChange={onValueChange?.(props.row)}
        //     >
        //       <SelectTrigger
        //         className="border-none bg-transparent px-0 py-0"
        //         onClick={e => {
        //           e.stopPropagation()
        //         }}
        //       >
        //         <SelectValue />
        //       </SelectTrigger>
        //       <SelectContent>
        //         <SelectGroup>
        //           {authCodes &&
        //             authCodes.map(authCode => (
        //               <SelectItem
        //                 key={authCode.codeUid}
        //                 value={authCode.codeUid.toString()}
        //               >
        //                 <UserGridAuthBadge color="badgeColor">
        //                   {authCode.codeValue}
        //                 </UserGridAuthBadge>
        //               </SelectItem>
        //             ))}
        //         </SelectGroup>
        //       </SelectContent>
        //     </Select>
        //   )
        // },
        Cell(props) {
          const currentStatus = props.cell.getValue() as number
          return (
            <Select
              onValueChange={onValueChange?.(props.row)}
              value={currentStatus?.toString()}
            >
              <SelectTrigger className="border-0">
                <SelectValue placeholder={'상태값을 선택하세요.'} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {authCodes &&
                    authCodes.map(option => (
                      <SelectItem
                        key={option.codeUid}
                        value={option.codeUid.toString()}
                      >
                        <UserGridAuthBadge
                          color={badgeColor[option.codeUid] || ''}
                        >
                          {option.codeValue}
                        </UserGridAuthBadge>
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )
        },
        muiTableBodyCellProps: {
          sx: {
            paddingY: 0,
            border: '1px solid hsl(var(--border))',
          },
        },
      },
      {
        header: '사용자 기능',
        accessorKey: 'resetPassword',
        muiTableBodyCellProps: {
          onClick: e => {
            e.stopPropagation()
          },
        },
        Cell({ row }) {
          return (
            <Button
              variant={'outline'}
              size={'xs'}
              className="py-2"
              onClick={e => {
                e.stopPropagation()
                onClickResetPassword?.(row)(e)
              }}
            >
              <ParameterizedIcon name="RefreshCw" className="mr-2 h-4 w-4" />
              비밀번호 초기화
            </Button>
          )
        },
      },
    ],
    [onClickResetPassword, onOpenChange, onValueChange],
  )

  return [columns] as const
}
