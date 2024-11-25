'use client'

import { useAppDispatch, useAppSelector } from '@pims-frontend/admin/lib/hooks'
import { useRef } from 'react'
import { codeMgtActions, codeMgtSelectors } from '../_query/codeMgtSlice'
import CodeBaseAddForm from './CodeBaseAddForm'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@pims-frontend/ui/components/ui/dialog'
import { Button } from '@pims-frontend/ui/components/ui/button'

const AddCodeDialog = () => {
  const ref = useRef<HTMLFormElement>(null)
  const dispatch = useAppDispatch()
  const { isNewDialogOpen } = useAppSelector(codeMgtSelectors.selectState)

  return (
    <Dialog
      open={isNewDialogOpen}
      onOpenChange={() => {
        dispatch(codeMgtActions.closeNewDialog())
      }}
    >
      <DialogContent className=" p-0 gap-0">
        <DialogHeader className="p-6 gap-1.5">
          <DialogTitle>프로젝트 생성</DialogTitle>
          <DialogDescription className="!mt-0">
            새로운 프로젝트를 생성합니다.
          </DialogDescription>
        </DialogHeader>
        <CodeBaseAddForm defaultValues={{ pgsStatCd: '001' }} ref={ref} />
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
              dispatch(codeMgtActions.closeNewDialog())
            }}
          >
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddCodeDialog
