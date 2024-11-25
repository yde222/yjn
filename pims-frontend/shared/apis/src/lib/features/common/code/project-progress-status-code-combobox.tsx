'use client'

import {
  Combobox,
  type ComboboxProps,
} from '@pims-frontend/ui/components/ui/select'
import { useGetAllCodeDetailsQuery } from './controller/CodeManagementController'
import { transformProjectProgressStatusCode } from './project-progress-status-code'

export function ProjectProgressStatusCodeCombobox(
  props: Omit<ComboboxProps, 'selectOptions'>,
) {
  const { selectOptions, isLoading, refetch } = useGetAllCodeDetailsQuery(
    {
      codeGroupId: '4',
    },
    {
      selectFromResult: ({ data = [], isLoading }) => ({
        selectOptions: transformProjectProgressStatusCode(data),
        isLoading,
      }),
    },
  )

  return (
    <Combobox
      {...props}
      onOpenChange={open => {
        if (open) {
          refetch()
        }
        props.onOpenChange?.(open)
      }}
      isLoading={isLoading}
      selectOptions={selectOptions}
    />
  )
}
