import { Label } from '@pims-frontend/ui/components/ui/label';
import { Switch } from '@pims-frontend/ui/components/ui/switch';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Shadcn/Switch',
  component: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<{}>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SwitchDemo: Story = {
  args: {},
};
