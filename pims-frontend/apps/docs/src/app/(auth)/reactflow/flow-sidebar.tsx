'use client';

import { Button } from '@pims-frontend/ui/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@pims-frontend/ui/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@pims-frontend/ui/components/ui/form';

import { zodResolver } from '@hookform/resolvers/zod';
import { generateRandomId } from '@pims-frontend/docs/utils/generateId';
import { Input } from '@pims-frontend/ui/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@pims-frontend/ui/components/ui/select';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1).max(50),
  type: z.string().min(1).max(50),
  desc: z.string(),
});

export function FlowSidebar() {
  const [open, setOpen] = React.useState(false);
  const [leftItem, setLeftItem] = useState([
    {
      id: '1',
      name: 'OPEN',
      desc: '설명1',
      type: 'input',
      color: '#ff5f99',
    },
    {
      id: '2',
      name: 'Assigned',
      desc: '설명2',
      type: '진행',
    },
    {
      id: '3',
      name: '중간2',
      desc: '설명3',
      type: '진행',
    },
    {
      id: '4',
      name: 'Closed',
      desc: '종료 상태',
      type: 'output',
    },
    {
      id: '5',
      name: 'Deffered',
      desc: '연기 처리',
      type: 'output',
    },
  ]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      desc: '',
      type: '',
    },
  });

  const onDragStart = (
    event: any,
    nodeType: string,
    nodeId: string,
    nodeName: string,
    nodeDesc: string,
  ) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('application/nodeId', nodeId);
    event.dataTransfer.setData('application/nodeName', nodeName);
    event.dataTransfer.setData('application/nodeDesc', nodeDesc);
    event.dataTransfer.effectAllowed = 'move';
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    leftItem.push({ ...values, id: generateRandomId() });
    form.reset();
    setOpen(false);
    console.log(values);
  }

  return (
    <>
      <aside className="relative border-r-2 border-gray-400 px-2 py-4 w-1/5">
        <div className="mb-3">List</div>
        {leftItem.length > 0 &&
          leftItem.map((li, i) => {
            const color = li.color;
            const desc = li.desc;
            let prop = '';
            let propClass =
              'h-[30px] border flex justify-center items-center cursor-grab mb-2.5 p-1 rounded-sm border-solid';

            if (li.type === 'input') {
              prop = 'input';
              propClass += ' border-[#0041d0;]';
            } else if (li.type === 'output') {
              prop = 'output';
              propClass += ' border-[#ff0072]';
            } else if (li.type === 'any') {
              prop = 'any';
              propClass += ' border-[#6500d0]';
            } else {
              prop = 'default';
              propClass += ' border-[#f3f3f3]';
            }

            return (
              <div
                id={li.id}
                key={li.id}
                className={propClass}
                onDragStart={(event) =>
                  onDragStart(
                    event,
                    prop,
                    event.currentTarget.id,
                    event.currentTarget.innerText,
                    desc,
                  )
                }
                draggable
              >
                {li.name}
              </div>
            );
          })}
        <Button
          className="absolute bottom-3"
          variant="outline"
          onClick={() => setOpen(true)}
        >
          ADD
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-4 py-4"
            >
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>상태 추가</DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="상태명을 입력하세요"
                          {...field}
                          className="col-span-3"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="타입을 선택하세요" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="input">할 일 상태</SelectItem>
                          <SelectItem value="default">진행 중 상태</SelectItem>
                          <SelectItem value="output">완료 상태</SelectItem>
                          <SelectItem value="any">Any Type</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="desc"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Desc</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="설명을 입력하세요"
                          {...field}
                          className="col-span-3"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>

                  <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                    Submit
                  </Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Form>
        </Dialog>
      </aside>
    </>
  );
}
