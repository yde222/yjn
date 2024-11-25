import { Meta, StoryObj } from '@storybook/react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@pims-frontend/ui/components/ui/alert-dialog';

const meta = {
  title: 'Shadcn/Alert-Dialog',
  component: () => {
    return (
      <>
        <AlertDialog>
          <AlertDialogTrigger data-testid="trigger">Open</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle data-testid="title">
                Are you absolutely sure?
              </AlertDialogTitle>
              <AlertDialogDescription data-testid="description">
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel data-testid="cancel">Cancel</AlertDialogCancel>
              <AlertDialogAction data-testid="Action" className="bg-[#4E4E49]">
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<{}>;

export default meta;

type Story = StoryObj<{}>;

export const AlertDialogDemo: Story = {
  args: {},
};
