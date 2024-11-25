'use client';

import { Button } from '@pims-frontend/ui/components/ui/button';
import { useToast } from './use-Toast';

type ToastProps = {
  title?: string;
  description?: string;
  variant?: 'destructive' | 'default';
};
export function ToastDemo({
  description,
  title,
  variant = 'default',
}: ToastProps) {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title,
          description,
          variant,
        });
      }}
    >
      shadcn
    </Button>
  );
}
