'use client'

import { useAppDispatch, useAppSelector } from '@pims-frontend/biz/lib/hooks'
import {
  CommonCalendarRangeSelector,
  CommonSingleCalendarSelector,
} from '@pims-frontend/ui/components/common/cmm-calendar'
import {
  ListDescription,
  ListTitle,
  SubtleText,
} from '@pims-frontend/ui/components/common/cmm-typography'
import { Button } from '@pims-frontend/ui/components/ui/button'
import { ScrollArea } from '@pims-frontend/ui/components/ui/scroll-area'
import { Separator } from '@pims-frontend/ui/components/ui/separator'
import { TabsContent } from '@pims-frontend/ui/components/ui/tabs'
import {
  safeParseMultiFormat,
  safeParseMultiFormatAndFormat,
} from '@pims-frontend/ui/lib/date-fns-additional-utils'
import { scheduleActions, scheduleSelectors } from '../scheduleSlice'

export function DateTab() {
  const {
    range: [from, to],
    single,
  } = useAppSelector(scheduleSelectors.selectEditingFilterDates)
  const dispatch = useAppDispatch()

  return (
    <TabsContent key={'date'} value={'date'} className="h-full mt-0">
      <ScrollArea className="h-full">
        <div className="flex flex-col w-full gap-2.5">
          <div>
            <div className="flex flex-row items-center justify-between">
              <ListTitle>날짜</ListTitle>
              <Button
                onClick={e => {
                  e.preventDefault()
                  dispatch(scheduleActions.resetDateFilter())
                }}
              >
                초기화
              </Button>
            </div>
            <ListDescription>
              원하는 날짜 기준으로 검색할 수 있어요
            </ListDescription>
          </div>
          <Separator />
          <div>
            <SubtleText className="font-medium">기간 검색</SubtleText>
            <CommonCalendarRangeSelector
              range={{
                from: safeParseMultiFormat(from),
                to: safeParseMultiFormat(to),
              }}
              onChangeFrom={date => {
                const formatted = safeParseMultiFormatAndFormat(date)
                dispatch(scheduleActions.onSetDateRangeFrom(formatted))
              }}
              onChangeTo={date => {
                const formatted = safeParseMultiFormatAndFormat(date)
                dispatch(scheduleActions.onSetDateRangeTo(formatted))
              }}
            />
          </div>

          {/* <Separator />
          <div className="mt-4">
            <SubtleText className="font-medium">단일 날짜 검색</SubtleText>
            <CommonSingleCalendarSelector
              date={safeParseMultiFormat(single)}
              onChange={(date) => {
                const formatted = safeParseMultiFormatAndFormat(date);
                dispatch(scheduleActions.onSetSingleDate(formatted));
              }}
            />
          </div> */}
        </div>
      </ScrollArea>
    </TabsContent>
  )
}
