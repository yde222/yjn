import { TaskResDto } from '@pims-frontend/apis/lib/features/pms/task/response/TaskResDto';

/**
 * "정상" 인지 알아내는 함수
 * @param task
 */
export function getIsTaskNormal(task: TaskResDto): boolean {
  // TODO: '정상' 기준 알아내서 적용
  return true;
}

/**
 * "지연" 인지 알아내는 함수
 * @param task
 */
export function getIsTaskDelayed(task: TaskResDto): boolean {
  // TODO: '지연' 기준 알아내서 적용
  return true;
}

/**
 * "준비" 인지 알아내는 함수
 * @param task
 */
export function getIsTaskReady(task: TaskResDto): boolean {
  // TODO: '준비' 기준 알아내서 적용
  return true;
}

/**
 * "완료" 인지 알아내는 함수
 * @param task
 */
export function getIsTaskCompleted(task: TaskResDto): boolean {
  // TODO: '완료' 기준 알아내서 적용
  return true;
}

/**
 * "초과성과" 인지 알아내는 함수
 * @param task
 */
export function getIsTaskOverAchieved(task: TaskResDto): boolean {
  // TODO: '초과성과' 기준 알아내서 적용
  return true;
}
