import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from '@pims-frontend/ui/components/ui/button';
import { Mail } from 'lucide-react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Shadcn/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: {
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
      ],
      control: { type: 'select' },
    },
    children: { control: { type: 'text' } },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    variant: 'default',
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Button',
  },
};

export const IconButton: Story = {
  render: () => (
    <Button className="gap-2">
      <Mail className="w-3 h-3" />
      <p>dsad</p>
    </Button>
  ),
};

export const IconOnly: Story = {
  render: () => (
    <Button className="gap-2">
      <Mail className="w-3 h-3" />
    </Button>
  ),
};

export const IconRounded: Story = {
  render: () => (
    <Button className="w-12 h-12 gap-2 rounded-full">
      <Mail className="w-3 h-3" />
    </Button>
  ),
};

export const underline: Story = {
  render: () => (
    <Button className="gap-2 leading-4 bg-white hover:bg-white">
      <Mail className="w-3 h-3 text-black" />
      <p className="text-black border-b-2 border-black">dsad</p>
    </Button>
  ),
};

export const ButtonGroup: Story = {
  render: () => (
    <div>
      <Button
        className="gap-2 rounded-none rounded-s-lg mr-[-1px] active:border-t-primary-foreground active:border-b-primary-foreground active:border-l-primary-foreground active:bg-accent"
        variant={'outline'}
      >
        <Mail className="w-3 h-3" />
        <p>dsad</p>
      </Button>
      <Button className="gap-2 rounded-none mr-[-1px]" variant={'outline'}>
        <Mail className="w-3 h-3" />
        <p>dsad</p>
      </Button>
      <Button className="gap-2 rounded-none mr-[-1px]" variant={'outline'}>
        <Mail className="w-3 h-3" />
        <p>dsad</p>
      </Button>
      <Button className="gap-2 rounded-none rounded-e-lg" variant={'outline'}>
        <Mail className="w-3 h-3" />
        <p>dsad</p>
      </Button>
    </div>
  ),
};
