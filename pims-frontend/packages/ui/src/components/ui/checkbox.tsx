'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import * as React from 'react';

import { cn } from '@pims-frontend/ui/lib/utils';
import { DetailText } from '../common/cmm-typography';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary-normal data-[state=checked]:text-primary-foreground',
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-current')}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

const CheckboxWithLabel = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    label: string;
  }
>(({ label, ...props }, ref) => (
  <div className="flex flex-row items-center gap-2 flex-1">
    <Checkbox ref={ref} id={props.id} {...props} />
    <label
      htmlFor={props.id}
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1"
    >
      {label}
    </label>
  </div>
));

const CheckboxWithLabelAndCount = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    label: string;
    count: number;
  }
>(({ label, count, ...props }, ref) => (
  <div className="flex flex-row items-center justify-between">
    <CheckboxWithLabel ref={ref} label={label} {...props} />
    <DetailText>{count}</DetailText>
  </div>
));

const CheckboxWithBadgeAndDot = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    label: string;
    count: number;
    dotColor: string;
  }
>(({ label, count, dotColor, ...props }, ref) => (
  <div className="flex flex-row items-center justify-between">
    <div className="flex flex-row items-center gap-2 flex-1">
      <Checkbox ref={ref} id={props.id} {...props} />
      <label
        htmlFor={props.id}
        className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-full"
      >
        <div className="flex flex-row items-center gap-2 border rounded-md px-2 py-1.5 w-fit">
          <div
            className={cn('w-1.5 h-1.5 rounded-full', {
              'bg-status-positive': dotColor === 'positive',
              'bg-status-destructive': dotColor === 'destructive',
              'bg-status-cautionary': dotColor === 'cautionary',
              'bg-primary-normal': dotColor === 'primary-normal',
            })}
          />
          <span className="text-sm font-medium leading-none">{label}</span>
        </div>
      </label>
    </div>
    <div className="flex items-center gap-1">
      <DetailText>{count}</DetailText>
    </div>
  </div>
));

export {
  Checkbox,
  CheckboxWithLabel,
  CheckboxWithLabelAndCount,
  CheckboxWithBadgeAndDot,
};
