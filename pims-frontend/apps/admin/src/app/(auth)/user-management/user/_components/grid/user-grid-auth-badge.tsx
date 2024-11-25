'use client'

import { Badge, BadgeProps } from '@pims-frontend/ui/components/ui/badge'
import { cn } from '@pims-frontend/ui/lib/utils'

export type UserGridAuthBadgeColors = 'teal' | 'lime' | 'white'

export type UserGridAuthBadgeProps = {
  color: UserGridAuthBadgeColors
}

export function UserGridAuthBadge(
  props: React.PropsWithChildren<UserGridAuthBadgeProps & BadgeProps>,
) {
  return (
    <Badge
      variant={'outline'}
      className={cn('text-text-normal', {
        'bg-[--teal-5]': props.color === 'teal',
        'bg-[--lime-5]': props.color === 'lime',
        'bg-white border border-border dark:text-black':
          props.color === 'white',
      })}
    >
      {props.children}
    </Badge>
  )
}
