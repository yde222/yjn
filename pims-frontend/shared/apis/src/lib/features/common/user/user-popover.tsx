'use client'

import { Button } from '@pims-frontend/ui/components/ui/button'
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@pims-frontend/ui/components/ui/command'
import { ParameterizedIcon } from '@pims-frontend/ui/components/ui/parameterized-icon'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@pims-frontend/ui/components/ui/popover'
import { cn } from '@pims-frontend/ui/lib/utils'
import { useLazyGetUsersSearchQuery } from './controller/UserController'
import React from 'react'
import { useGetAllUsersQuery } from './controller/UserManagementController'

export type UserPopopverProps = {
  onSelect: (value: string) => void
  standard: string
  placeholder: string
  defaultValue?: string
  loadOnMount?: boolean
}

export function UserPopover(props: React.PropsWithChildren<UserPopopverProps>) {
  const ref = React.useRef<HTMLButtonElement>(null)
  const { data: userList, isFetching } = useGetAllUsersQuery(null)

  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Popover
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(prev => !prev)
      }}
    >
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          variant="outline"
          role="combobox"
          className={cn(
            'w-full justify-between !mt-0',
            !props.standard && 'text-muted-foreground',
          )}
        >
          {props.standard
            ? userList &&
              userList.find(option => option.userId === props.standard)
                ?.userName
            : props.placeholder}
          {isFetching && (
            <ParameterizedIcon
              name="LoaderCircle"
              className="ml-2 h-4 w-4 shrink-0 animate-spin"
            />
          )}
          <ParameterizedIcon
            name="ChevronDown"
            className="ml-2 h-4 w-4 shrink-0 opacity-50"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        style={{
          width: ref.current?.offsetWidth,
        }}
        className="p-0"
      >
        <Command>
          <CommandInput placeholder="사용자를 검색하세요." />
          <CommandList>
            <CommandEmpty>검색결과가 없습니다.</CommandEmpty>
            <CommandGroup>
              {userList &&
                userList.map(option => (
                  <CommandItem
                    value={option.userName}
                    key={option.userId}
                    onSelect={value => {
                      setIsOpen(false)
                      return props.onSelect(option.userId)
                    }}
                  >
                    <ParameterizedIcon
                      name="Check"
                      className={cn(
                        'mr-2 h-4 w-4',
                        option.userId === props.standard
                          ? 'opacity-100'
                          : 'opacity-0',
                      )}
                    />
                    {`${option.userName} (${option.companyCode})`}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
