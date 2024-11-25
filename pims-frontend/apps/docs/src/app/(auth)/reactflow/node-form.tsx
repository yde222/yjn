import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@pims-frontend/ui/components/ui/form';
import { Input } from '@pims-frontend/ui/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@pims-frontend/ui/components/ui/select';
import { Node } from '@xyflow/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { TurboNodeData } from './nodes/node-type';

const nodeFormSchema = z.object({
  name: z.string().min(1).max(50),
  type: z.string().min(1).max(50),
  desc: z.string(),
});

export type NodeFormProps = {
  detail: Node<TurboNodeData> & {
    clicked: 'node';
    click_name: string;
    click_desc: string;
  };
};

export function NodeForm(props: NodeFormProps) {
  const nodeForm = useForm<z.infer<typeof nodeFormSchema>>({
    resolver: zodResolver(nodeFormSchema),
    defaultValues: {
      name: props.detail?.data?.title,
      type: props.detail?.type || '',
      desc: props.detail?.data.desc || '',
    },
  });

  function onNodeFormSubmit(values: z.infer<typeof nodeFormSchema>) {
    nodeForm.reset();
    console.log(values);
  }

  return (
    <>
      <Form {...nodeForm}>
        <form
          onSubmit={nodeForm.handleSubmit(onNodeFormSubmit)}
          className="grid gap-4 py-4"
        >
          <FormField
            control={nodeForm.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="">Name</FormLabel>
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
            control={nodeForm.control}
            name="type"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="">Type</FormLabel>
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
                    <SelectItem value="input">시작</SelectItem>
                    <SelectItem value="default">진행</SelectItem>
                    <SelectItem value="output">종료</SelectItem>
                    <SelectItem value="any">Any Type</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={nodeForm.control}
            name="desc"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="">Desc</FormLabel>
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
        </form>
      </Form>
    </>
  );
}
