import { Button } from '../ui/button';
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from '../ui/alert-dialog';

export type CommonAlertDialogProps = {
  isOpenState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  title: string;
  description?: string;
  onCancel?: React.MouseEventHandler<HTMLButtonElement>;
  onConfirm?: React.MouseEventHandler<HTMLButtonElement>;
};

export function CommonAlertDialog(props: CommonAlertDialogProps) {
  const [isOpen, setIsOpen] = props.isOpenState;
  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{props.title}</AlertDialogTitle>
          {props.description && (
            <AlertDialogDescription>{props.description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          {props.onCancel && (
            <AlertDialogCancel onClick={props.onCancel}>
              Cancel
            </AlertDialogCancel>
          )}
          {props.onConfirm && (
            <AlertDialogAction onClick={props.onConfirm}>
              Continue
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
