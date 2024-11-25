'use client'

import { useAppDispatch, useAppSelector } from '@pims-frontend/admin/lib/hooks'
import { useRef } from 'react'
import { codeMgtActions, codeMgtSelectors } from '../_query/codeMgtSlice'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@pims-frontend/ui/components/ui/sheet'
import { Separator } from '@pims-frontend/ui/components/ui/separator'
import { Button } from '@pims-frontend/ui/components/ui/button'

const CodeDetailSheet = () => {
  const ref = useRef<HTMLFormElement>(null)

  const dispatch = useAppDispatch()

  // const { codeMgtDrawer } = useAppSelector(codeMgtSelectors.selectState)

  return (
    <Sheet
      open={false}
      onOpenChange={() => dispatch(codeMgtActions.closeCodeMgtDrawer())}
    >
      <SheetContent className="p-0 flex flex-col min-w-[640px] h-screen gap-0">
        <SheetHeader className="flex-none w-full bg-background-plain">
          <SheetTitle className="p-6">프로젝트 정보</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-16 flex-grow py-10 overflow-y-auto bg-background-plain px-9">
          <div className="flex flex-col gap-4">
            <SheetDescription>정보</SheetDescription>
            {/* <CodeForm ref={ref} /> */}
          </div>
          <div>
            <SheetDescription>투입 정보</SheetDescription>
            <div className="text-2xs px-3">
              <div className="text-sm text-muted-foreground">
                <div className="flex flex-col gap-2.5">
                  <div className="flex h-5 items-center space-x-4 text-sm">
                    <div>
                      전체 <span className="text-primary-normal">{50}</span>
                    </div>
                    <Separator orientation="vertical" />
                    <div>
                      SK <span className="text-primary-normal">{50}</span>
                    </div>
                    <Separator orientation="vertical" />
                    <div>
                      협력 <span className="text-primary-normal">{50}</span>
                    </div>
                  </div>
                  {/* <MaterialReactTable table={table} /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <SheetFooter className="p-3 flex-none bg-background-plain border-t border-t-border-normal">
          <Button
            className="bg-primary-normal"
            onClick={() => {
              ref.current?.requestSubmit()
              // dispatch(codeMgtActions.closecodeMgtDrawer())
            }}
          >
            확인
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default CodeDetailSheet
