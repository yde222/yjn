// pims-pms/src/main/java/com/skcc/pims/pms/task/dto/response/TaskResDto.java
import { TaskResDto } from './TaskResDto';

// b44b4b20bdaa9fe4c68f80fd514e12febda6424b
export type TaskTreeResDto = {
  task: TaskResDto;
  children: TaskTreeResDto[];
};
