import {
  Alert,
  AlertTitle,
  AlertDescription,
} from '@pims-frontend/ui/components/ui/alert';
import { Meta, StoryObj } from '@storybook/react';
// import { VariantProps } from 'class-variance-authority';

import { Terminal } from 'lucide-react';

// type TypeCustomAlertProps = {} & VariantProps<typeof alertVariants>;

const meta = {
  title: 'Shadcn/Alert',
  args: {
    variant: 'default',
  },
  render: ({ variant }) => (
    <Alert variant={variant}>
      <Terminal className="w-4 h-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  ),
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive'],
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

//Colors
export const AlertDefaultDemo: Story = {
  args: {
    variant: 'default',
  },
  render: ({ variant }) => (
    <Alert variant={variant}>
      <Terminal className="w-4 h-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  ),
};
export const AlertDestructiveDemo: Story = {
  args: {
    variant: 'destructive',
  },
  render: ({ variant }) => (
    <Alert variant={variant}>
      <Terminal className="w-4 h-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  ),
};
