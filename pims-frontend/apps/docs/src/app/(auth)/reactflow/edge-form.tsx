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
import { type Edge } from '@xyflow/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const edgeFormSchema = z.object({
  name: z.string().min(1).max(50),
  type: z.string().min(1).max(50),
  desc: z.string(),
});

export type EdgeFormProps = {
  detail: Edge & {
    clicked: 'edges';
    click_name: string;
    click_desc: string;
  };
};

export function EdgeForm(props: EdgeFormProps) {
  const edgeForm = useForm<z.infer<typeof edgeFormSchema>>({
    resolver: zodResolver(edgeFormSchema),
    defaultValues: {
      name: '',
      desc: '',
      type: '',
    },
  });

  function onEdgeFormSubmit(values: z.infer<typeof edgeFormSchema>) {
    edgeForm.reset();
    console.log(values);
  }

  return (
    <>
      <Form {...edgeForm}>
        <form
          onSubmit={edgeForm.handleSubmit(onEdgeFormSubmit)}
          className="grid gap-4 py-4"
        >
          <FormField
            control={edgeForm.control}
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
            control={edgeForm.control}
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
                    <SelectItem value="시작">시작</SelectItem>
                    <SelectItem value="진행">진행</SelectItem>
                    <SelectItem value="종료">종료</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={edgeForm.control}
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
      {/* <Button>트렌젝션</Button> */}
    </>
  );
}
