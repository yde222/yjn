import { Button } from '@pims-frontend/ui/components/ui/button';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@pims-frontend/ui/components/ui/tooltip';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Shadcn/Tooltip',
  component: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<{}>;

export default meta;

type Story = StoryObj<typeof meta>;

//colors
export const TooltipDemo: Story = {
  args: {},
};
