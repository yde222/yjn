// pims-pms/src/main/java/com/skcc/pims/pms/task/dto/response/TaskAssignResDto.java
// 2de6788cbf6c2c17cb4d6aec0514cc5c9b68390e
export type TaskAssignResDto = {
  /** integer */
  taskAssignUid: number;
  /** integer */
  userUid: number;
  userId: string | undefined;
  realStartDate: string| undefined;
  realEndDate: string | undefined;
  /** decimal */
  recordHeadwayRatio: number | undefined;
  isEnabled: boolean| undefined;
  /** integer */
  taskUid: number;
};