import { Label } from '@pims-frontend/ui/components/ui/label';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Shadcn/Label',
  args: {
    children: 'PIMS',
  },
  component: (args) => <Label {...args}>{args.children}</Label>,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<React.ComponentPropsWithRef<'label'>>;

export default meta;

type Story = StoryObj<typeof meta>;

//render componente
export const LabelDemo: Story = {
  args: {},
};
