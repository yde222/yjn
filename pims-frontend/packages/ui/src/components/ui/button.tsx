import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@pims-frontend/ui/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm gap-2 font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-interaction-disable',
  {
    variants: {
      variant: {
        default:
          'bg-primary-normal text-primary-foreground hover:bg-primary-normal/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        bordered:
          'border border-primary-normal bg-background text-primary-normal hover:bg-primary-normal/90',
        secondary: 'bg-fill-subtle-2 text-black hover:bg-fill-subtle-2/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        text: 'text-primary-normal p-0 text-2xs hover:bg-accent',
        link: 'text-primary underline-offset-4 hover:underline',
        juyoung: 'bg-primary-accent text-black hover:bg-primary-accent/80',
        ghostjuyoung: 'hover:bg-primary-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-10 px-4 py-2',
        xs: 'px-2 py-1.5',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
