import { Meta, StoryObj } from '@storybook/react';
import { CalendarDemo } from '../demo/calendar-demo';

//meta
const meta = {
  title: 'Shadcn/Calendar',
  component: CalendarDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CalendarDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Calendar: Story = {
  args: {},
};
