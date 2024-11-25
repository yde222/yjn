import { Meta, StoryObj } from '@storybook/react';
import { DatePickerDemo } from '../demo/datepicker-demo';

//meta
const meta = {
  title: 'Shadcn/Datepicker',
  component: DatePickerDemo,
  parameters: {},
} satisfies Meta<typeof DatePickerDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DatePicker: Story = {
  args: {},
};
