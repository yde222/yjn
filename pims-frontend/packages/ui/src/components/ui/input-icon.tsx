import * as React from 'react';

import { cn } from '@pims-frontend/ui/lib/utils';
import { ParameterizedIcon } from './parameterized-icon';
import { icons } from 'lucide-react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: keyof typeof icons;
  endIcon?: keyof typeof icons;
}

const InputIcon = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon, endIcon, ...props }, ref) => {
    const StartIcon = startIcon;
    const EndIcon = endIcon;

    return (
      <div className=" relative">
        <input
          type={type}
          className={cn(
            'peer flex h-10 w-full rounded-md border border-input bg-background py-2 px-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
            startIcon ? 'pl-8' : '',
            endIcon ? 'pr-8' : '',
            className,
          )}
          ref={ref}
          {...props}
        />
        {StartIcon && (
          <ParameterizedIcon
            className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 peer-focus:text-gray-900 dark:text-gray-100 dark:peer-focus:text-gray-300"
            name={StartIcon}
          />
        )}
        {EndIcon && (
          <ParameterizedIcon
            className="absolute right-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 peer-focus:text-gray-900 dark:text-gray-100 dark:peer-focus:text-gray-300"
            name={EndIcon}
          />
        )}
      </div>
    );
  },
);
InputIcon.displayName = 'InputIcon';

export { InputIcon };
