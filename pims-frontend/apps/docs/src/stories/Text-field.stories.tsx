import { Input } from '@pims-frontend/ui/components/ui/input';

import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Mail } from 'lucide-react';
import { CompoundInput } from '../demo/text-field';

const meta = {
  title: 'Shadcn/Textfield',
  component: () => (
    <CompoundInput id="email" type="email" placeholder="이메일을 입력하세요">
      <CompoundInput.Label>이메일</CompoundInput.Label>
      <CompoundInput.Icon icon={Mail} />
    </CompoundInput>
  ),
  parameters: {
    layout: 'centered',
  },

  args: {
    type: 'text',
    onChange: fn(),
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: [
        'file',
        'password',
        'text',
        'checkbox',
        'radio',
        ' date',
        'datetime-local',
        'email',
        'hidden',
        'image',
        'month',
        'number',
        'range',
        'reset',
        'search',
        'submit',
        'tel',
        'time',
        'url',
        'week',
      ],
    },
  },
} satisfies Meta<typeof Input>;
export default meta;

type Story = StoryObj<typeof meta>;

export const TextField: Story = {
  render: () => (
    <div className="space-y-4">
      <CompoundInput
        id="email"
        type="email"
        variant={'default'}
        placeholder="이메일을 입력하세요"
      >
        <CompoundInput.Label>이메일</CompoundInput.Label>
        <CompoundInput.Icon icon={Mail} />
      </CompoundInput>
    </div>
  ),
};

export const TextFieldError: Story = {
  render: () => (
    <div className="space-y-4">
      <CompoundInput
        id="email"
        type="email"
        variant={'distructive'}
        placeholder="이메일을 입력하세요"
      >
        <CompoundInput.Label>이메일</CompoundInput.Label>
        <CompoundInput.Icon icon={Mail} />
      </CompoundInput>
    </div>
  ),
};
