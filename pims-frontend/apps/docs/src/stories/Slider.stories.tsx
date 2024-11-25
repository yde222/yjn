import { Slider } from '@pims-frontend/ui/components/ui/slider';
import { cn } from '@pims-frontend/ui/lib/utils';
import { Meta, StoryObj } from '@storybook/react';

type SliderProps = React.ComponentProps<typeof Slider>;

const meta = {
  title: 'Shadcn/Slider',
  component: (props) => (
    <Slider
      defaultValue={[50]}
      max={100}
      step={1}
      className={cn('w-[60%]', props.className)}
      {...props}
    />
  ),

  tags: ['autodocs'],
} satisfies Meta<SliderProps>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
