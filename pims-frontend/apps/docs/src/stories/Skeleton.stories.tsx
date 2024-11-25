import { buttonVariants } from '@pims-frontend/ui/components/ui/button';
import { Skeleton } from '@pims-frontend/ui/components/ui/skeleton';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Shadcn/Skeleton',
  component: () => (
    <div className="flex items-center space-x-4 w-96">
      <Skeleton className="w-12 h-12 rounded-full bg-slate-300" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-slate-300" />
        <Skeleton className="h-4 w-[200px] bg-slate-300" />
      </div>
    </div>
  ),
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SkeletonUser: Story = {
  args: {},
};

export const SkeletonCardNotification: Story = {
  args: {},
  render: () => (
    <>
      <Skeleton className="flex h-64 w-[250px] flex-col gap-2 bg-slate-300 p-5">
        <div className="flex flex-col gap-2">
          <Skeleton className="w-20 h-6 bg-slate-400" />
          <Skeleton className="w-20 h-4 bg-slate-400" />
        </div>

        <Skeleton className="w-full h-16 rounred bg-slate-400 " />
        <Skeleton className="w-full h-4 bg-slate-400" />
        <Skeleton className="w-full h-4 bg-slate-400" />
        <Skeleton className="w-full h-4 bg-slate-400" />

        <Skeleton
          className={
            buttonVariants({
              variant: 'default',
              size: 'default',
            }) + ' w-full bg-slate-400'
          }
        />
      </Skeleton>
    </>
  ),
};
