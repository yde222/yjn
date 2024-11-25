import { type TaskResDto } from '@pims-frontend/apis/lib/features/pms/task/response/TaskResDto';
import {
  getIsTaskCompleted,
  getIsTaskDelayed,
  getIsTaskNormal,
  getIsTaskOverAchieved,
  getIsTaskReady,
} from './get-status-from-task';
import { type Filter } from './scheduleSlice';

export function selectSubprojects(filter: Filter, data: TaskResDto[]) {
  const isAllSelected = filter.subProjects.every((subproject) =>
    subproject.options.every((option) => option.isSelected),
  );

  return {
    isAllSelected,
    subprojects: filter.subProjects.map((subproject) => {
      const isAllSelected = subproject.options.every(
        (option) => option.isSelected,
      );

      return {
        ...subproject,
        isAllSelected,
        count: data.filter((task) =>
          subproject.options.some(
            (option) =>
              option.isSelected && String(task.subPrjUid) === option.value,
          ),
        ).length,
      };
    }),
    strippedSubprojects: filter.subProjects.flatMap((subproject) => {
      return subproject.options.filter((option) => option.isSelected);
    }),
    totalCount: data.length,
  };
}

export function selectStatus(
  { options }: Filter['status'],
  data: TaskResDto[],
) {
  const isAllSelected = options.every((option) => option.isSelected);

  return {
    isAllSelected,
    totalCount: data.length,
    options: options.map((option) => {
      if (option.value === 'status-a') {
        const normalTasks = data.filter((task) => getIsTaskNormal(task));
        return {
          ...option,
          count: normalTasks.length,
          data: normalTasks,
        };
      }

      if (option.value === 'status-b') {
        const delayedTasks = data.filter((task) => getIsTaskDelayed(task));
        return {
          ...option,
          count: delayedTasks.length,
          data: delayedTasks,
        };
      }

      if (option.value === 'status-c') {
        const readyTasks = data.filter((task) => getIsTaskReady(task));
        return {
          ...option,
          count: readyTasks.length,
          data: readyTasks,
        };
      }

      if (option.value === 'status-d') {
        const completedTasks = data.filter((task) => getIsTaskCompleted(task));
        return {
          ...option,
          count: completedTasks.length,
          data: completedTasks,
        };
      }

      if (option.value === 'status-e') {
        const overAchievedTasks = data.filter((task) =>
          getIsTaskOverAchieved(task),
        );
        return {
          ...option,
          count: overAchievedTasks.length,
          data: overAchievedTasks,
        };
      }

      return {
        ...option,
        count: data.length,
      };
    }),
  };
}
