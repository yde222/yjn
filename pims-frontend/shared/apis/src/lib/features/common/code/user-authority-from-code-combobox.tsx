'use client'

import { UserGridAuthBadge } from '@pims-frontend/ui/components/ui/badge'
import { SelectProps } from '@pims-frontend/ui/components/ui/radix-ui'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@pims-frontend/ui/components/ui/select'
import { useGetAllCodeDetailsQuery } from './controller/CodeManagementController'

export type UserGridAuthSelectProps = {
  value: string
  placeholder?: string
  onOpenChange?: SelectProps['onOpenChange']
  onValueChange?: SelectProps['onValueChange']
}

const UserAuthorityFromCodeCombobox = (props: UserGridAuthSelectProps) => {
  const { data: options } = useGetAllCodeDetailsQuery(
    {
      codeGroupUid: 1,
    },
    {
      selectFromResult: ({ data = [] }) => ({
        data: data.map(item => {
          const def = {
            value: item.codeUid,
            displayString: item.codeValue,
          }

          // NOTE: DB 데이터에 따라 하드코딩되어있으므로 추후 다른 방법을 찾을 것
          if (item.codeUid.toString() === '010') {
            return { ...def, color: 'lime' as const }
          }

          // NOTE: DB 데이터에 따라 하드코딩되어있으므로 추후 다른 방법을 찾을 것
          if (item.codeUid.toString() === '011') {
            return { ...def, color: 'teal' as const }
          }

          return {
            ...def,
            color: 'white' as const,
          }
        }),
      }),
    },
  )

  return (
    <Select
      value={props.value}
      onOpenChange={props.onOpenChange}
      onValueChange={props.onValueChange}
    >
      <SelectTrigger
        className="border-none bg-transparent px-0 py-0"
        onClick={e => {
          e.stopPropagation()
        }}
      >
        <SelectValue placeholder={props.placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map(option => (
            <SelectItem key={option.value} value={option.value.toString()}>
              <UserGridAuthBadge color={option.color}>
                {option.displayString}
              </UserGridAuthBadge>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default UserAuthorityFromCodeCombobox
