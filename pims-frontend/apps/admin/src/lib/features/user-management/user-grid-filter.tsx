'use client'

import {
  ListDescription,
  ListTitle,
  TextXsMedium,
} from '@pims-frontend/ui/components/common/cmm-typography'
import { Button } from '@pims-frontend/ui/components/ui/button'
import { CheckboxWithLabelAndCount } from '@pims-frontend/ui/components/ui/checkbox'
import { CommandDialog } from '@pims-frontend/ui/components/ui/command'
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@pims-frontend/ui/components/ui/dialog'
import { ParameterizedIcon } from '@pims-frontend/ui/components/ui/parameterized-icon'
import {
  ScrollArea,
  ScrollBar,
} from '@pims-frontend/ui/components/ui/scroll-area'
import { Separator } from '@pims-frontend/ui/components/ui/separator'
import { SheetFooter } from '@pims-frontend/ui/components/ui/sheet'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@pims-frontend/ui/components/ui/tabs'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  userManagementActions,
  userManagementSelectors,
} from '../../../app/(auth)/user-management/user/_query/userManagementSlice'

export function UserGridFilter() {
  const [isOpen, setIsOpen] = React.useState(false)
  const dispatch = useDispatch()
  const editingFilter = useSelector(userManagementSelectors.selectEditingFilter)
  const { fieldAdminUsers, memberUsers, systemAdminUsers, totalLength } =
    useSelector(userManagementSelectors.selectEditingFilterCount)

  return (
    <>
      <Button
        variant={'outline'}
        onClick={e => {
          e.preventDefault()
          setIsOpen(prev => !prev)
        }}
      >
        <ParameterizedIcon name="Filter" className="w-4 h-4 mr-2" />
        {'필터'}
      </Button>
      <CommandDialog
        open={isOpen}
        onOpenChange={open => {
          setIsOpen(open)
        }}
        dialogContentClassName="w-[557px] max-w-none"
      >
        <DialogHeader className="flex flex-row items-center py-1.5 border-b">
          <DialogTitle className="sr-only">사용자 정보 필터</DialogTitle>
          <DialogDescription className="">필터</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="" className="h-[540px] flex">
          <div className="min-w-60 border-r relative">
            <ScrollArea className="h-full p-2">
              <ListTitle>필터 목록</ListTitle>
              <TabsList className="flex flex-col h-full items-stretch bg-transparent gap-2">
                <TabsTrigger
                  key={'authority'}
                  value={'authority'}
                  className="justify-between px-4 py-2 text-left data-[state=active]:bg-muted"
                >
                  {`시스템 권한`}
                  <ParameterizedIcon name="ChevronRight" />
                </TabsTrigger>
              </TabsList>
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </div>
          <div className="p-4 bg-fill-subtle-3 w-full">
            <TabsContent
              key={'authority'}
              value={'authority'}
              className="h-full mt-0"
            >
              <ScrollArea className="h-full">
                <div className="flex flex-col w-full gap-2.5">
                  <div>
                    <div className="flex flex-row items-center justify-between">
                      <ListTitle>시스템 권한</ListTitle>
                      <Button>초기화</Button>
                    </div>
                    <ListDescription>다중 선택할 수 있어요</ListDescription>
                  </div>
                  <Separator />
                  {/**
                   * NOTE: 아래 ID와 value는 DB기준으로 하드코딩되어있으므로 나중에 꼭 고칠것.
                   */}
                  <CheckboxWithLabelAndCount
                    label={'시스템 관리자'}
                    id={'010'}
                    count={systemAdminUsers.length}
                    checked={
                      editingFilter.authority.options.find(
                        option => option.value === '010',
                      )?.isSelected
                    }
                    onCheckedChange={checked => {
                      dispatch(
                        userManagementActions.setAuthorityFilter({
                          isSelected: Boolean(checked),
                          value: '010',
                        }),
                      )
                    }}
                  />
                  <CheckboxWithLabelAndCount
                    label={'현장 관리자'}
                    id={'011'}
                    count={fieldAdminUsers.length}
                    checked={
                      editingFilter.authority.options.find(
                        option => option.value === '011',
                      )?.isSelected
                    }
                    onCheckedChange={checked => {
                      dispatch(
                        userManagementActions.setAuthorityFilter({
                          isSelected: Boolean(checked),
                          value: '011',
                        }),
                      )
                    }}
                  />
                  <CheckboxWithLabelAndCount
                    label={'Member'}
                    id={'012'}
                    count={memberUsers.length}
                    checked={
                      editingFilter.authority.options.find(
                        option => option.value === '012',
                      )?.isSelected
                    }
                    onCheckedChange={checked => {
                      dispatch(
                        userManagementActions.setAuthorityFilter({
                          isSelected: Boolean(checked),
                          value: '012',
                        }),
                      )
                    }}
                  />
                </div>
              </ScrollArea>
            </TabsContent>
          </div>
        </Tabs>
        <SheetFooter className="p-3 flex-none bg-background-plain border-t border-t-border-normal">
          <div className="flex items-center">
            <TextXsMedium>{`검색 결과`}&nbsp;</TextXsMedium>
            <TextXsMedium className="text-primary-normal">
              {totalLength}
            </TextXsMedium>
          </div>
          <div className="flex flex-row items-center gap-1 flex-1 justify-end">
            <Button
              onClick={() => {
                dispatch(userManagementActions.resetAllFilters())
              }}
              variant={'outline'}
            >
              전체 초기화
            </Button>
            <Button
              onClick={() => {
                dispatch(userManagementActions.applyFilters())
                setIsOpen(false)
              }}
            >
              필터 적용
            </Button>
          </div>
        </SheetFooter>
      </CommandDialog>
    </>
  )
}
