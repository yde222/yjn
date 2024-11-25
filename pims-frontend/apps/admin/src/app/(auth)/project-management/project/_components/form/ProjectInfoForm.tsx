'use client'

import { useGetCodeDetailsByCodeGroupUidWithLocaleQuery } from '@pims-frontend/apis/lib/features/common/code/controller/CodeController'
import { useUpdateProjectMutation } from '@pims-frontend/apis/lib/features/common/project/controller/ProjectController'
import { ProjectResDto } from '@pims-frontend/apis/lib/features/common/project/dto/response/ProjectResDto'
import { UserPopover } from '@pims-frontend/apis/lib/features/common/user/user-popover'
import { DateRange } from '@pims-frontend/ui/components/common/day-picker/react-day-picker'
import { BadgeWithDot } from '@pims-frontend/ui/components/ui/badge'
import { Button } from '@pims-frontend/ui/components/ui/button'
import { Calendar } from '@pims-frontend/ui/components/ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@pims-frontend/ui/components/ui/form'
import { Input } from '@pims-frontend/ui/components/ui/input'
import { ParameterizedIcon } from '@pims-frontend/ui/components/ui/parameterized-icon'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@pims-frontend/ui/components/ui/popover'
import { useForm } from '@pims-frontend/ui/components/ui/react-hook-form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@pims-frontend/ui/components/ui/select'
import { useToast } from '@pims-frontend/ui/components/ui/use-toast'
import {
  safeParseMultiFormat,
  safeParseMultiFormatAndFormat,
} from '@pims-frontend/ui/lib/date-fns-additional-utils'
import { cn } from '@pims-frontend/ui/lib/utils'
import React from 'react'
import { z } from 'zod'

export const ProjectInfoFormSchema = z.object({
  pjtUid: z.number(),
  pjtNo: z.string(),
  pjtNm: z.string(),
  pgsStatCd: z.number(),
  pjtMngRId: z.string(),
  range: z.object({
    from: z.coerce.date(),
    to: z.coerce.date(),
  }),
})

export type ProjectBaseInfo = z.infer<typeof ProjectInfoFormSchema>

export type ProjectInfoFormProps = {
  defaultValues: ProjectResDto | null
}

export const ProjectInfoForm = React.forwardRef<
  HTMLFormElement,
  ProjectInfoFormProps
>(function WrappedProjectInfoForm(props, ref) {
  const { data: statusCodeList } =
    useGetCodeDetailsByCodeGroupUidWithLocaleQuery({
      codeGroupUid: 4,
    })
  const [update, { isLoading, isError }] = useUpdateProjectMutation()
  const { toast } = useToast()

  //FIXME 사용자, 부서코드
  const form = useForm<ProjectBaseInfo>({
    defaultValues: {
      ...props.defaultValues,
      range: {
        from: safeParseMultiFormat(props.defaultValues?.staYmd),
        to: safeParseMultiFormat(props.defaultValues?.endYmd),
      },
    } as any,
    reValidateMode: 'onChange',
  })

  function onSubmit(data: ProjectBaseInfo) {
    //const { success } = ProjectInfoFormSchema.safeParse(data)
    const { range, pjtNm, ...rest } = data
    // const staYmd = safeParseMultiFormatAndFormat(range.from, 'yyyyMMdd')
    // const endYmd = safeParseMultiFormatAndFormat(range.to, 'yyyyMMdd')

    // if (!success) {
    //   return toast({
    //     title: '폼 검증에 실패했습니다.',
    //     variant: 'destructive',
    //   })
    // }
    const postData = {
      pjtUid: data.pjtUid,
      pgsStatCd: rest.pgsStatCd,
      pjtMngRId: rest.pjtMngRId,
      pjtNo: rest.pjtNo,
      rpnDepCd: '001',
      isTplEnabled: false,
    }
    update({
      ...postData,
    }).then(result => {
      if (isError) {
        return toast({
          title: '프로젝트 정보 수정에 실패했습니다.',
          variant: 'destructive',
        })
      }
      toast({
        title: '프로젝트 정보가 수정되었습니다.',
      })
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        ref={ref}
        className="flex flex-col gap-3.5"
      >
        <FormField
          control={form.control}
          name="pjtNo"
          rules={{
            required: '프로젝트 번호를 입력하세요.',
            maxLength: {
              value: 20,
              message: '프로젝트 번호는 20자 이내로 입력하세요.',
            },
          }}
          render={({ field }) => (
            <FormItem className="space-y-0 gap-1.5">
              <FormLabel className="w-[88px]">NO</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pgsStatCd"
          render={({ field }) => (
            <FormItem className="space-y-0 gap-1.5">
              <FormLabel className="w-[88px]">상태</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value.toString()}
                >
                  <SelectTrigger className="!mt-0">
                    <SelectValue placeholder={'상태값을 선택하세요.'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {statusCodeList &&
                        statusCodeList.map(option => (
                          <SelectItem
                            key={option.codeUid}
                            value={option.codeUid.toString()}
                          >
                            <BadgeWithDot
                              key={option.codeUid}
                              dotColor={option.codeColor}
                              size="md"
                            >
                              {option.codeValue}
                            </BadgeWithDot>
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pjtNm"
          render={({ field }) => (
            <FormItem className="space-y-0 gap-1.5">
              <FormLabel className="w-[88px]">이름</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="range"
          render={({ field }) => (
            <FormItem className="space-y-0 gap-1.5">
              <FormLabel className="w-[88px]">기간</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        id="date"
                        variant={'outline'}
                        className={cn(
                          'w-full justify-start disabled:bg-interaction-disable',
                          { 'text-muted-foreground': !field.value },
                        )}
                        disabled
                      >
                        <ParameterizedIcon
                          name="Calendar"
                          className="mr-2 h-4 w-4"
                        />
                        {field.value?.from &&
                          safeParseMultiFormatAndFormat(field.value?.from)}
                        {field.value?.from && ' - '}
                        {field.value?.to &&
                          safeParseMultiFormatAndFormat(field.value.to)}
                        {!field.value?.from && <span>날짜를 선택하세요.</span>}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={field.value?.from}
                      selected={field.value}
                      onSelect={(range: DateRange | undefined) => {
                        if (range) {
                          field.onChange({
                            from: safeParseMultiFormatAndFormat(range?.from),
                            to: safeParseMultiFormatAndFormat(range?.to),
                          })
                        }
                      }}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pjtNo"
          render={({ field }) => (
            <FormItem className="space-y-0 gap-1.5">
              <FormLabel className="w-[88px]">참조</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pjtMngRId"
          render={({ field }) => (
            <FormItem className="space-y-0 gap-1.5">
              <FormLabel className="w-[88px]">PM</FormLabel>
              <FormControl>
                <UserPopover
                  placeholder={`관리자를 선택하세요.`}
                  standard={field.value}
                  defaultValue={field.value}
                  loadOnMount
                  onSelect={value => {
                    form.setValue('pjtMngRId', value)
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
})

ProjectInfoForm.displayName = 'ProjectInfoForm'
