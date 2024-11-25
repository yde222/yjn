// @ts-nocheck
'use client'

import { useAppDispatch, useAppSelector } from '@pims-frontend/admin/lib/hooks'
import {
  useGetAllCodeDetailsQuery,
  useGetCodeDetailsByCodeGroupUidWithLocaleQuery,
} from '@pims-frontend/apis/lib/features/common/code/controller/CodeController'
import {
  useGetProjectListQuery,
  useUpdateProjectStatMutation,
} from '@pims-frontend/apis/lib/features/common/project/controller/ProjectController'
import { CommonPagination } from '@pims-frontend/ui/components/common/cmm-pagination'
import { useToast } from '@pims-frontend/ui/components/ui/use-toast'
import React, { useState } from 'react'
import { AddProjectDialog } from './dialog/AddProjectDialog'
import { AdminProjectGrid } from './grid/AdminProjectGrid'

import { projectActions, projectSelectors } from '../_query/projectSlice'
import { type SheetState, ProjectDetailSheet } from './sheet/ProjectDetailSheet'

const initialSheetState: SheetState = {
  isOpen: false,
  data: null,
} satisfies SheetState

const ProjectWrapper = () => {
  const dispatch = useAppDispatch()
  const projects = useAppSelector(projectSelectors.selectProjectList)
  const searchText = useAppSelector(
    projectSelectors.selectProjectListSearchText,
  )
  const { toast } = useToast()

  const { data = [], isFetching } = useGetProjectListQuery({
    keyword: '',
  })

  const filteredData = React.useMemo(() => {
    if (!searchText) {
      return data
    }

    return data.filter(item => {
      return (
        item?.pjtNm?.includes(searchText) ||
        item?.pjtUid?.toString().includes(searchText) ||
        item?.pjtNo?.includes(searchText)
      )
    })
  }, [data, searchText])

  const [update] = useUpdateProjectStatMutation()
  useGetCodeDetailsByCodeGroupUidWithLocaleQuery({
    codeGroupUid: 4,
  })

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  })

  const [sheet, setSheet] = useState<SheetState>(initialSheetState)

  return (
    <>
      <AdminProjectGrid
        data={filteredData}
        pagination={pagination}
        showProgressBars={isFetching}
        isLoading={isFetching}
        onOpenChange={row => open => {
          console.log('onOpenChange', row, open)
        }}
        onValueChange={row => value => {
          update({ ...row.original, pgsStatCd: value }).then(() => {
            toast({
              title: `상태가 변경 저장되었습니다.`,
            })
          })
        }}
        onClickRow={row => e => {
          setSheet(prev => ({
            ...prev,
            isOpen: !prev.isOpen,
            data: row.original,
          }))
        }}
        topbarbtnClick={() => {
          dispatch(projectActions.openAddPjtModal())
        }}
      />
      <CommonPagination
        dataLength={data?.length || 0}
        paginationState={[pagination, setPagination]}
      />

      <ProjectDetailSheet sheetState={[sheet, setSheet]} />
      <AddProjectDialog />
    </>
  )
}

export default ProjectWrapper
