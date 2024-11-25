import { type TaskAssignReqDto } from './TaskAssignReqDto';

type CustomDatas = Record<string, any>;

export type RegistTaskReqDto = {
  isAdded: boolean;
  isEdited: boolean;
  isDeleted: boolean;

  taskUid: number|null;

  parentTaskUid: number|null;

  taskName: string|null;

  planStartDate: string|null; // yyyy-MM-dd 형식일 가능성 있음

  planEndDate: string|null; // yyyy-MM-dd 형식일 가능성 있음

  planDuration: number|null; // Integer

  weight: number|null; // BigDecimal

  outputName: string|null;

  linkCode: number|null; // Integer

  subProjectUid: number|null; // Integer

  //taskAssignReqDtos: TaskAssignReqDto[] | null;
} & CustomDatas;
