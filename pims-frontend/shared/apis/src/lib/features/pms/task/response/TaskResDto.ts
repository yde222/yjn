// pims-pms/src/main/java/com/skcc/pims/pms/task/dto/response/TaskTreeResDto.java
import { TaskAssignResDto } from './TaskAssignResDto';

// 2de6788cbf6c2c17cb4d6aec0514cc5c9b68390e
export type TaskResDto = {
  /* Integer */
  tskUid: number;
  /* Integer */
  parTskUid: number;
  tskNm: string;
  plnStaYmd: string;
  plnEndYmd: string;
  /** Integer  */
  plnDurNum: number;
  /** BigDecimal */
  witNum: number;
  ralStaYmd: string;
  ralEndYmd: string;
  /** BigDecimal */
  recHwyRat: number;
  stpYn: boolean;
  /* Integer */
  srtNo: number;
  /* Integer */
  subPrjUid: number;
  isEnabled: boolean;
  assignUsers: TaskAssignResDto[];

  wbsNo: string;

  parentWbsNo: string;

  /** Integer */
  depth: number;

  isTask: boolean;
  isSubproject: boolean;
};
