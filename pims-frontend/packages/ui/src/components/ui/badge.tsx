import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@pims-frontend/ui/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

// export type BadgeStatusProps = React.HTMLAttributes<HTMLDivElement> & {
//   badgestatus?: 'green' | 'yellow' | 'purple' | 'red'
//   size: 'lg' | 'md' | 'sm'
//   children: React.ReactNode
//   background: 'default' | 'blue' | 'violet' | 'amber' | 'gray'
// }

// const statusColors = {
//   green: 'bg-[#46A758]',
//   yellow: 'bg-[#FFC53D]',
//   purple: 'bg-[#6E56CF]',
//   red: 'bg-[#E54666]',
// }

// const backgroundTheme = {
//   default: 'border-[#DAD9D6]',
//   blue: 'bg-accent-blue border-[rgba(226, 232, 240, 0.00)] text-[#113264]',
//   violet: 'bg-accent-violet text-[#2F265F]',
//   amber: 'bg-accent-amber border-[rgba(226, 232, 240, 0.00)] text-[#4F3422]',
//   gray: 'bg-accent-gray',
//   orange: 'bg-accent-orange',
// }

// function BadgeStatus({
//   badgestatus,
//   size,
//   background,
//   children,
//   className,
// }: BadgeStatusProps) {
//   return (
//     <div
//       className={cn(
//         'inline-flex justify-center items-center rounded-lg border bg-card text-card-foreground gap-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 min-w-8 min-h-8',
//         size === 'lg' && 'px-2 py-1.5',
//         size === 'md' && 'px-2 py-1',
//         size === 'sm' && 'px-2 py-1.5',
//         backgroundTheme[background],
//         className,
//       )}
//     >
//       {badgestatus && (
//         <span
//           className={cn('h-1.5 w-1.5 rounded-full', statusColors[badgestatus])}
//         />
//       )}
//       {children}
//     </div>
//   )
// }

const badgeStatusVariants = cva(
  'inline-flex justify-center items-center rounded-lg border border-input text-card-foreground gap-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 min-w-8 min-h-8',
  {
    variants: {
      variant: {
        default: 'border-input bg-background',
        violet: 'bg-bgcustom-violet text-textcustom-violet',
        amber: 'bg-bgcustom-amber text-textcustom-amber',
        orange: 'bg-bgcustom-orange text-textcustom-orange',
        crimson: 'bg-bgcustom-crimson text-textcustom-crimson',
        teal: 'bg-bgcustom-teal text-textcustom-teal',
        lime: 'bg-bgcustom-lime text-textcustom-lime',
        blue: 'bg-bgcustom-blue text-textcustom-blue',
        sand: 'bg-bgcustom-sand text-textcustom-sand',
      },
      size: {
        lg: 'px-2 py-1.5',
        md: 'px-2 py-1',
        sm: 'px-1.5 py-0.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
)

export interface BadgeStatusProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeStatusVariants> {}

const BadgeStatus = React.forwardRef<HTMLDivElement, BadgeStatusProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeStatusVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </div>
    )
  },
)
BadgeStatus.displayName = 'BadgeStatus'

function BadgeForFilter({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        'border-transparent bg-[#E1D9FF] text-[#2F265F] cursor-pointer',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

type ColorEnum =
  | 'DEFAULT'
  | 'CRIMSON'
  | 'AMBER'
  | 'BLUE'
  | 'LIME'
  | 'ORANGE'
  | 'SAND'
  | 'TEAL'
  | 'VIOLET'
  | 'GREEN'
  | 'RED'
  | 'YELLOW'
  | 'PRIMARY'

export interface BadgeWithDotProps
  extends React.HTMLAttributes<HTMLDivElement> {
  dotColor: ColorEnum
  size: 'lg' | 'md' | 'sm'
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

const BadgeWithDot = React.forwardRef<HTMLDivElement, BadgeWithDotProps>(
  (
    { dotColor = 'DEFAULT', size, children, onClick, className, ...props },
    ref,
  ) => {
    const filteredDotColor = ['RED', 'GREEN', 'YELLOW', 'PRIMARY'].includes(
      dotColor,
    )
      ? dotColor
      : 'DEFAULT'

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center gap-2 border rounded-md w-fit transition-colors',
          { 'px-2 py-1.5 text-xs': size === 'lg' },
          { 'px-2 py-1 text-2xs': size === 'md' },
          { 'px-1.5 py-0.5 text-2xs': size === 'sm' },
          className,
        )}
        onClick={onClick}
        {...props}
      >
        {/* Dot 표시 */}
        <div
          className={cn('w-1.5 h-1.5 rounded-full', {
            'bg-status-positive': filteredDotColor === 'GREEN',
            'bg-status-destructive': filteredDotColor === 'RED',
            'bg-status-cautionary': filteredDotColor === 'YELLOW',
            'bg-primary-normal': filteredDotColor === 'PRIMARY',
            'bg-primary': filteredDotColor === 'DEFAULT',
          })}
        />
        {/* 라벨 */}
        <span>{children}</span>
      </div>
    )
  },
)

BadgeWithDot.displayName = 'BadgeWithDot'

export type UserGridAuthBadgeColors = 'teal' | 'lime' | string

export type UserGridAuthBadgeProps = {
  color: UserGridAuthBadgeColors
}

function UserGridAuthBadge(
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

export {
  Badge,
  badgeVariants,
  BadgeStatus,
  badgeStatusVariants,
  BadgeForFilter,
  BadgeWithDot,
  UserGridAuthBadge,
}
