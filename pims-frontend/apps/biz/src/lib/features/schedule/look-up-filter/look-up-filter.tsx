'use client'

import {
  ListTitle,
  TextXsMedium,
} from '@pims-frontend/ui/components/common/cmm-typography'
import { BadgeForFilter } from '@pims-frontend/ui/components/ui/badge'
import { Button } from '@pims-frontend/ui/components/ui/button'
import { BadgeWithDot } from '@pims-frontend/ui/components/ui/badge'
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
import { SheetFooter } from '@pims-frontend/ui/components/ui/sheet'
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@pims-frontend/ui/components/ui/tabs'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { scheduleActions, scheduleSelectors } from '../scheduleSlice'
import { DateTab } from './date-tab'
import { StatusTab } from './status-tab'
import { EditingSubprojectBadges } from './editing-subproject-badges'
import { SubprojectTab } from './subproject-tab'

export function LookUpFilter() {
  const [isOpen, setIsOpen] = React.useState(false)
  const dispatch = useAppDispatch()
  const { range, single } = useAppSelector(
    scheduleSelectors.selectEditingFilterDates,
  )
  const { options, isAllSelected: isAllStatusSelected } = useAppSelector(
    scheduleSelectors.selectEditingFilterStatus,
  )
  const totalCount = useAppSelector(
    scheduleSelectors.selectEditingFilterTotalCount,
  )

  return (
    <>
      <Button
        variant="outline"
        onClick={e => {
          e.preventDefault()
          setIsOpen(prev => !prev)
        }}
      >
        <ParameterizedIcon name="Filter" />
        필터
      </Button>
      <CommandDialog
        open={isOpen}
        onOpenChange={open => {
          setIsOpen(open)
        }}
        dialogContentClassName="w-[557px] max-w-none"
      >
        <DialogHeader className="flex flex-row items-center py-1.5 border-b">
          <DialogTitle className="sr-only">일정관리 필터</DialogTitle>
          <DialogDescription className="">필터</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="" className="h-[540px] flex">
          <div className="min-w-60 border-r relative">
            <ScrollArea className="h-full p-2">
              <ListTitle>필터 목록</ListTitle>
              <TabsList className="flex flex-col h-full items-stretch bg-transparent gap-2">
                <TabsTrigger
                  key={'subproject'}
                  value={'subproject'}
                  className="flex flex-col items-start px-4 py-2 text-left data-[state=active]:bg-muted"
                >
                  <div className="flex flex-row w-full justify-between">
                    {`서브프로젝트`}
                    <ParameterizedIcon name="ChevronRight" />
                  </div>
                  <div className="flex flex-col gap-1 items-start">
                    <EditingSubprojectBadges />
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  key={'date'}
                  value={'date'}
                  className="flex flex-col items-start px-4 py-2 text-left data-[state=active]:bg-muted"
                >
                  <div className="flex flex-row w-full justify-between">
                    {`날짜`}
                    <ParameterizedIcon name="ChevronRight" />
                  </div>
                  <div className="flex flex-col gap-1 items-start">
                    {range[0] && range[1] && (
                      <BadgeForFilter
                        onClick={e => {
                          e.stopPropagation()
                          e.preventDefault()
                          dispatch(scheduleActions.onUnsetDateRange())
                        }}
                      >
                        {`${range[0]} ~ ${range[1]}   X`}
                      </BadgeForFilter>
                    )}
                    {single && (
                      <BadgeForFilter
                        onClick={e => {
                          e.stopPropagation()
                          e.preventDefault()
                          dispatch(scheduleActions.onUnsetSingleDate())
                        }}
                      >
                        {`${single}   X`}
                      </BadgeForFilter>
                    )}
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  key={'status'}
                  value={'status'}
                  className="flex flex-col items-start px-4 py-2 text-left data-[state=active]:bg-muted"
                >
                  <div className="flex flex-row w-full justify-between">
                    {`상태`}
                    <ParameterizedIcon name="ChevronRight" />
                  </div>
                  <div className="flex flex-row gap-1 items-start flex-wrap">
                    {isAllStatusSelected && (
                      <BadgeForFilter>{`전체`}</BadgeForFilter>
                    )}
                    {!isAllStatusSelected &&
                      options
                        .filter(v => v.isSelected)
                        .map(option => (
                          <BadgeWithDot
                            key={option.value}
                            onClick={e => {
                              e.stopPropagation()
                              e.preventDefault()
                              dispatch(
                                scheduleActions.onUncheckStatus({
                                  value: option.value,
                                }),
                              )
                            }}
                            label={`${option.label} X`}
                            dotColor={option.color}
                          />
                        ))}
                  </div>
                </TabsTrigger>
              </TabsList>
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </div>
          <div className="p-4 bg-fill-subtle-3 w-full">
            <SubprojectTab />
            <DateTab />
            <StatusTab />
          </div>
        </Tabs>
        <SheetFooter className="p-3 flex-none bg-background-plain border-t border-t-border-normal">
          <div className="flex items-center">
            <TextXsMedium>{`검색 결과`}&nbsp;</TextXsMedium>
            <TextXsMedium className="text-primary-normal">
              {totalCount}
            </TextXsMedium>
          </div>
          <div className="flex flex-row items-center gap-1 flex-1 justify-end">
            <Button
              onClick={() => {
                dispatch(scheduleActions.resetAllEditingFilter())
              }}
              variant={'outline'}
            >
              전체 초기화
            </Button>
            <Button
              onClick={() => {
                dispatch(scheduleActions.applyEditingFilter())
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
