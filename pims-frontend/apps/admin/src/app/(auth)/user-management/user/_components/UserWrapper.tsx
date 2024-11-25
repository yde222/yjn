'use client'

import { PasswordResetRequestDialog } from '@pims-frontend/admin/lib/features/user-management/password-reset-request-dialog'
import { PasswordResetRevealDialog } from '@pims-frontend/admin/lib/features/user-management/password-reset-reveal-dialog'
import { useAppDispatch, useAppSelector } from '@pims-frontend/admin/lib/hooks'
import {
  useGetAllUsersQuery,
  useLazyGetAllUsersQuery,
  useUpdateUserAuthorityCodeMutation,
} from '@pims-frontend/apis/lib/features/common/user/controller/UserController'
import { CommonPagination } from '@pims-frontend/ui/components/common/cmm-pagination'
import { useToast } from '@pims-frontend/ui/components/ui/use-toast'
import React from 'react'
import {
  userManagementActions,
  userManagementSelectors,
} from '../_query/userManagementSlice'
import {
  type SheetState,
  UserDetailSheet,
} from '../user-sheet/user-detail-sheet'
import { AdminUserGrid } from './grid/admin-user-grid'

const initialSheetState: SheetState = {
  isOpen: false,
  data: null,
} satisfies SheetState

const UserWrapper = () => {
  const { toast } = useToast()
  const dispatch = useAppDispatch()

  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 20,
  })

  const [updateUser] = useUpdateUserAuthorityCodeMutation()
  const { data, isFetching } = useGetAllUsersQuery({
    limit: -1,
    page: -1,
  })

  const [getUser] = useLazyGetAllUsersQuery()

  const [sheet, setSheet] = React.useState<SheetState>(initialSheetState)
  const filteredUsers = useAppSelector(
    userManagementSelectors.selectFilteredUserList,
  )

  const searchText = useAppSelector(
    userManagementSelectors.selectUserListSearchText,
  )

  return (
    <>
      <AdminUserGrid
        data={data ?? []}
        pagination={pagination}
        showProgressBars={isFetching}
        isLoading={isFetching}
        onOpenChange={row => open => {
          console.log('onOpenChange', row, open)
        }}
        onValueChange={row => value => {
          updateUser({
            userId: row.original.userId,
            authorityCode: value,
          })
            .unwrap()
            .then(() => {
              toast({
                title: '권한이 변경되었습니다.',
              })
            })
        }}
        onClickDropdownMenuItem={value => e => {
          console.log('onClickDropdownMenuItem', value, e)
        }}
        onClickResetPassword={row => e => {
          dispatch(
            userManagementActions.openResetModal({
              authorityCode: row.original.authorityCode,
              userId: row.original.userId,
              userName: row.original.userName,
              nickname: row.original.nickname,
              companyCode: row.original.companyCode,
              projects: row.original.projects,
              departmentCode: 'not set',
              roleCode: 'not set',
            }),
          )
        }}
        onClickRow={row => e => {
          setSheet(prev => ({
            ...prev,
            isOpen: !prev.isOpen,
            data: {
              authorityCode: row.original.authorityCode,
              userId: row.original.userId,
              userName: row.original.userName,
              nickname: row.original.nickname,
              companyCode: row.original.companyCode,
              projects: row.original.projects,
              departmentCode: 'not set',
              roleCode: 'not set',
            },
          }))
        }}
      />

      <CommonPagination
        dataLength={data?.length || 0}
        paginationState={[pagination, setPagination]}
      />

      <UserDetailSheet sheetState={[sheet, setSheet]} />
      <PasswordResetRequestDialog />
      <PasswordResetRevealDialog />
    </>
  )
}

export default UserWrapper
