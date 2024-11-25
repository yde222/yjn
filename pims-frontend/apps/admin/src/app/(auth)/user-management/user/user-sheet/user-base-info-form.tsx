'use client'

import { useUpdateUserAuthorityCodeMutation } from '@pims-frontend/apis/lib/features/common/user/controller/UserController'
import { type UserDetailResDto } from '@pims-frontend/apis/lib/features/common/user/dto/response/UserDetailResDto'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@pims-frontend/ui/components/ui/form'
import { Input } from '@pims-frontend/ui/components/ui/input'
import { useForm } from '@pims-frontend/ui/components/ui/react-hook-form'
import { Combobox } from '@pims-frontend/ui/components/ui/select'
import React from 'react'
import { z } from 'zod'
import { UserDetailRoleSelect } from './user-detail-role-select'
import { useToast } from '@pims-frontend/ui/components/ui/use-toast'
import UserAuthorityFromCodeCombobox from '@pims-frontend/apis/lib/features/common/code/user-authority-from-code-combobox'

export const UserBaseInfoFormSchema = z.object({
  userId: z.string(),
  userName: z.string(),
  nickname: z.string(),
  companyCode: z.string(),
  companyName: z.string(),
  departmentCode: z.string(),
  departmentName: z.string(),
  authorityCode: z.string(),
  // projects: z.string().array(),
  role: z.string(),
  roleDescription: z.string(),
})

export type UserBaseInfo = z.infer<typeof UserBaseInfoFormSchema>

export type UserBaseInfoFormProps = {
  defaultValues: UserDetailResDto | null
}

export const UserBaseInfoForm = React.forwardRef<
  HTMLFormElement,
  UserBaseInfoFormProps
>(function WrappedUserBaseInfoForm(props, ref) {
  const { toast } = useToast()
  const [update, { isLoading, isError }] = useUpdateUserAuthorityCodeMutation()

  const form = useForm<UserBaseInfo>({
    defaultValues: props.defaultValues || {},
  })

  function onSubmit(data: UserBaseInfo) {
    update({
      userId: data.userId,
      authorityCode: data.authorityCode,
    })
      .unwrap()
      .then(() => {
        toast({
          title: '사용자 정보가 업데이트 되었습니다.',
        })
      })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        ref={ref}
        className="flex flex-col gap-2 px-9 py-4"
      >
        <FormField
          control={form.control}
          name="companyCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="w-10">사번</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="w-10">이름</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="w-10">닉네임</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="w-10">회사</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="departmentName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="w-10">부서</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex items-center gap-2 mt-2">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className="w-10">역할</FormLabel>
                <FormControl>
                  <Combobox
                    selectOptions={[
                      { value: 'non-developer', displayString: '비개발' },
                      {
                        value: 'developer',
                        displayString: '개발',
                      },
                      {
                        value: 'designer',
                        displayString: '디자인',
                      },
                    ]}
                    value={field.value}
                    onValueChange={field.onChange}
                    className="w-[200px]"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="roleDescription"
            render={({ field }) => (
              <FormItem className="space-y-0 w-full">
                <FormControl>
                  <Input defaultValue={''} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="authorityCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="w-10">권한</FormLabel>
              <FormControl>
                <UserAuthorityFromCodeCombobox
                  value={field.value}
                  onValueChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
})

UserBaseInfoForm.displayName = 'UserBaseInfoForm'
