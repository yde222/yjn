import { Meta, StoryObj } from '@storybook/react';
import Link from 'next/link';
import {
  Badge,
  BadgeProps,
  BadgeStatus,
  badgeVariants,
} from '@pims-frontend/ui/components/ui/badge';

import { X } from 'lucide-react';
//meta
const meta = {
  title: 'Shadcn/Badge',
  render: (args) => <Badge {...args}>{args.children}</Badge>,
  tags: ['autodocs'],
  args: {
    variant: 'default',
    children: 'badgeCn',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'secondary', 'outline', 'destructive'],
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<BadgeProps>;

export default meta;

type Story = StoryObj<typeof meta>;

//colors
export const Default: Story = {
  args: {
    variant: 'default',
  },
};
export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};
export const Outline: Story = {
  args: {
    variant: 'outline',
  },
};
export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },
};

export const StatusOnlineMiddle: Story = {
  render: () => (
    <BadgeStatus
      size="md"
      badgestatus="green"
      background="default"
      className="gap-1 rounded-sm bg-[#fff] text-black border-2 border-[#DAD9D6]"
    >
      STATUS
    </BadgeStatus>
  ),
};

export const StatusOnlineLarge: Story = {
  render: () => (
    <BadgeStatus
      size="lg"
      badgestatus="green"
      background="default"
      className="gap-1 rounded-sm bg-[#fff] text-black border-2 border-[#DAD9D6]"
    >
      STATUS
    </BadgeStatus>
  ),
};

export const mutiSelectBadge: Story = {
  render: () => (
    <Badge className="flex items-center gap-1 rounded-sm">
      <p className="text-[13px]">label</p> <X className="w-3 h-3" />
    </Badge>
  ),
};
