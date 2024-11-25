// pims-pms/src/main/java/com/skcc/pims/pms/task/dto/request/TaskReqDto.java-
// 2de6788cbf6c2c17cb4d6aec0514cc5c9b68390e
import { type TaskAssignReqDto } from './TaskAssignReqDto';

/** Map<String, Object> */
type CustomDatas = Record<string, any>;

export type TaskReqDto = {
  tskUid: number;
  parentTaskUid: number;
  taskName: string;
  planStartYmd: string; // yyyyMMdd
  planEndYmd: string; // yyyyMMdd
  /** Integer */
  planDuration: number; // Integer
  /* BigDecimal */
  weight: number;

  stepYn: boolean;
  /** Integer */
  sortNo: number;
  outputName: string;

  /** Integer */
  linkCode: number;
  /**Integer */
  subProjectUid: number;

  taskAssignReqDtos: TaskAssignReqDto[];
} & CustomDatas;
