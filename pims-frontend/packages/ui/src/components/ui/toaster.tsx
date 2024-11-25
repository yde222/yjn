'use client'

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@pims-frontend/ui/components/ui/toast'
import { useToast } from './use-toast'
import { ParameterizedIcon, ParameterizedIconProps } from './parameterized-icon'

export function Toaster() {
  const { toasts } = useToast()
  return (
    <ToastProvider duration={1000}>
      {toasts.map(function ({
        id,
        status,
        title,
        description,
        action,
        ...props
      }) {
        let iconName = '' as Partial<ParameterizedIconProps['name']>
        let iconColor = ''
        let borderColor = ''
        if (status === 'success') {
          iconName = 'CircleCheck'
          iconColor = 'text-status-positive'
          borderColor = 'border-status-positive'
        }
        if (status === 'warning') {
          iconName = 'TriangleAlert'
          iconColor = 'text-status-cautionary'
          borderColor = 'border-status-cautionary'
        }
        if (status === 'error') {
          iconName = 'CircleAlert'
          iconColor = 'text-status-destructive'
          borderColor = 'border-status-destructive'
        }

        return (
          <Toast key={id} {...props} className={borderColor}>
            <div className="flex justify-between gap-4">
              <div className="flex gap-1.5">
                {iconName && (
                  <ParameterizedIcon
                    name={iconName}
                    size={20}
                    className={iconColor}
                  />
                )}
                <div className="flex flex-col gap-2">
                  {title && <ToastTitle>{title}</ToastTitle>}
                  {description && (
                    <ToastDescription>{description}</ToastDescription>
                  )}
                </div>
              </div>
              {action}
            </div>
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
