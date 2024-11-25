'use client'

import { Button } from '@pims-frontend/ui/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@pims-frontend/ui/components/ui/dropdown-menu'
import { ParameterizedIcon } from '@pims-frontend/ui/components/ui/parameterized-icon'
import { type UserGridSelectOption } from '../../user-grid-select-option'
import { UserGridAuthBadge } from './user-grid-auth-badge'

export type UserGridFilterDropdownButtonProps = {
  selectOptions: UserGridSelectOption[]
  onClickDropdownMenuItem?: (
    value: UserGridSelectOption['value'],
  ) => React.MouseEventHandler<HTMLDivElement>
  buttonText: string
  subTriggerText: string
}

export function UserGridFilterDropdownButton(
  props: React.PropsWithChildren<UserGridFilterDropdownButtonProps>,
) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'}>
          <ParameterizedIcon name="Filter" className="w-4 h-4 mr-2" />
          {props.buttonText}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" side="right">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            {props.subTriggerText}
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {props.selectOptions.map(option => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={props?.onClickDropdownMenuItem?.(option.value)}
                >
                  <UserGridAuthBadge color={option.color}>
                    {option.displayString}
                  </UserGridAuthBadge>
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
