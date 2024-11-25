'use client'

import { fetchMockProject } from '@pims-frontend/biz/app/mock-fetch'
import {
  projectActions,
  projectSelectors,
} from '@pims-frontend/biz/lib/features/project/projectSlice'
import { useAppDispatch, useAppSelector } from '@pims-frontend/biz/lib/hooks'
import { Button } from '@pims-frontend/ui/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@pims-frontend/ui/components/ui/command'
import { ParameterizedIcon } from '@pims-frontend/ui/components/ui/parameterized-icon'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@pims-frontend/ui/components/ui/popover'
import { cn } from '@pims-frontend/ui/lib/utils'
import React, { useState } from 'react'

export function SelectProjectCombobox() {
  const { isOpen, target, value, options } = useAppSelector(
    projectSelectors.selectProjectCombobox,
  )

  const userInfo = useAppSelector(state => state.userInfo)

  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (userInfo?.myProjectList) {
      dispatch(projectActions.getInitialProject(userInfo?.myProjectList))
      const defaultProject = userInfo?.myProjectList?.find(
        // TODO 실제 사용자 lastProjectNo 받아서 넣어줄것
        project => project.projectUid === 17,
      )
      dispatch(
        projectActions.selectProject({
          target: defaultProject,
          value: defaultProject?.projectUid,
        }),
      )
    }
  }, [dispatch, userInfo])

  const triggerRef = React.useRef<HTMLButtonElement>(null)

  return (
    <div className="px-3">
      <Popover
        open={isOpen}
        onOpenChange={open => {
          dispatch(projectActions.toggleCombobox(open))
        }}
      >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            aria-label="프로젝트를 선택하세요"
            className={cn('w-full justify-between')}
            ref={triggerRef}
          >
            {target?.projectName}
            <ParameterizedIcon name="ChevronDown" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={'min-w-fit p-0'}
          style={{
            width: triggerRef.current?.offsetWidth,
          }}
        >
          <Command>
            <CommandInput placeholder="프로젝트 검색..." />
            <CommandList>
              <CommandEmpty>프로젝트를 찾을 수 없습니다.</CommandEmpty>
              <CommandGroup key={target?.projectName}>
                {options.map(project => (
                  <CommandItem
                    key={project.projectUid}
                    onSelect={() => {
                      dispatch(
                        projectActions.selectProject({
                          target: project,
                          value: project.projectUid,
                        }),
                      )
                      dispatch(projectActions.closeCombobox())
                    }}
                    className="text-sm"
                  >
                    {project.projectName}
                    <ParameterizedIcon
                      name="Check"
                      className={cn(
                        'ml-auto h-4 w-4',
                        project.projectUid === value
                          ? 'opacity-100'
                          : 'opacity-0',
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
