'use client'

import { Button } from '@pims-frontend/ui/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@pims-frontend/ui/components/ui/dialog'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../../lib/hooks'
import { projectActions, projectSelectors } from '../../_query/projectSlice'
import ProjectAddForm from '../form/ProjectAddForm'

export function AddProjectDialog() {
  const ref = React.useRef<HTMLFormElement>(null)
  const dispatch = useAppDispatch()

  const { isAddProjectModalOpen } = useAppSelector(
    projectSelectors.selectProject,
  )

  return (
    <Dialog
      open={isAddProjectModalOpen}
      onOpenChange={() => {
        dispatch(projectActions.closeAddPjtModal())
      }}
    >
      <DialogContent className=" p-0 gap-0">
        <DialogHeader className="p-6 gap-1.5">
          <DialogTitle>프로젝트 생성</DialogTitle>
          <DialogDescription className="!mt-0">
            새로운 프로젝트를 생성합니다.
          </DialogDescription>
        </DialogHeader>
        <ProjectAddForm defaultValues={{ pgsStatCd: 1 }} ref={ref} />
        <DialogFooter className="justify-between pt-3 px-6 pb-6">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              닫기
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant={'default'}
            onClick={() => {
              ref.current?.requestSubmit()
              dispatch(projectActions.closeAddPjtModal())
            }}
          >
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
