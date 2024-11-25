import { TaskResDto } from '@pims-frontend/apis/lib/features/pms/task/response/TaskResDto';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { buildTaskTree } from './build-task-tree';
import { safeParseMultiFormat } from '@pims-frontend/ui/lib/date-fns-additional-utils';
import { selectStatus, selectSubprojects } from './filters';

type Option = {
  label: string;
  value: string;
  isSelected: boolean;
};

type StateDate = Date | string | null | undefined;

export type Filter = Record<
  'subProjects',
  {
    subgroupName: string;
    subgroupUid: string;
    options: Option[];
  }[]
> &
  Record<
    'date',
    {
      range: [StateDate, StateDate];
      single: StateDate;
    }
  > &
  Record<'status', { options: (Option & { color: string })[] }>;

export type ScheduleState = {
  lookUp: {
    mode: 'look-up' | 'plan' | 'view-only';
    data: TaskResDto[];
    selectedTask: Record<string, boolean>;
    // NOTE: Filter의 옵션들이 실제 데이터로 백엔드로부터 오기때문에, 이 데이터를 보존해 둘 곳임
    initialFilter: Filter;
    // NOTE: 실제 필터링된 데이터를 보존해 둘 곳임
    appliedFilter: Filter;
    // NOTE: Filter 모달이 켜졌을 때 쓰는 상태임
    editingFilter: Filter;
    searchText: string;
  };
};

const initialFilter = {
  // NOTE: 실제 서브프로젝트 데이터로 대체할 것
  subProjects: [
    {
      subgroupName: '서브그룹A',
      subgroupUid: 'subgroup-a',
      options: [
        {
          label: '서브프로젝트명 A',
          value: 'a-A',
          isSelected: true,
        },
        {
          label: '서브프로젝트명 B',
          value: 'a-B',
          isSelected: true,
        },
      ],
    },
    {
      subgroupName: '서브그룹B',
      subgroupUid: 'subgroup-b',
      options: [
        {
          label: '서브프로젝트명 C',
          value: 'b-C',
          isSelected: true,
        },
        {
          label: '서브프로젝트명 E',
          value: 'b-E',
          isSelected: true,
        },
      ],
    },
    {
      subgroupName: '서브그룹C',
      subgroupUid: 'subgroup-c',
      options: [
        {
          label: '서브프로젝트명 D',
          value: 'c-D',
          isSelected: true,
        },
      ],
    },
  ],
  date: {
    range: [null, null],
    single: null,
  },
  status: {
    // NOTE: 실제 상태 데이터로 대체할 것
    options: [
      {
        label: '정상',
        value: 'status-a', // NOTE: (DB기준)cod_id가 여기 들어가는게 좋음
        isSelected: true,
        color: 'positive',
      },
      {
        label: '지연',
        value: 'status-b',
        isSelected: true,
        color: 'destructive',
      },
      {
        label: '준비',
        value: 'status-c',
        isSelected: true,
        color: 'cautionary',
      },
      {
        label: '완료',
        value: 'status-d',
        isSelected: true,
        color: 'primary-normal',
      },
      {
        label: '초과성과',
        value: 'status-e',
        isSelected: true,
        color: 'primary-normal',
      },
    ],
  },
} satisfies Filter;

const initialScheduleState: ScheduleState = {
  lookUp: {
    mode: 'look-up',
    data: [],
    selectedTask: {},
    initialFilter,
    appliedFilter: initialFilter,
    editingFilter: initialFilter,
    searchText: '',
  },
};

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: initialScheduleState,
  reducers: {
    resetState: () => initialScheduleState,
    changeMode: (
      state,
      action: PayloadAction<Pick<ScheduleState['lookUp'], 'mode'>>,
    ) => {
      state.lookUp.mode = action.payload.mode;
    },
    setScheduleTaskData: (
      state,
      action: PayloadAction<ScheduleState['lookUp']['data']>,
    ) => {
      state.lookUp.data = action.payload;
    },
    setSelectedTasks: (
      state,
      action: PayloadAction<Record<string, boolean>>,
    ) => {
      state.lookUp.selectedTask = action.payload;
    },
    setSearchText: (
      state,
      action: PayloadAction<ScheduleState['lookUp']['searchText']>,
    ) => {
      state.lookUp.searchText = action.payload;
    },
    resetSearchText: (state) => {
      state.lookUp.searchText = '';
    },
    setInitialFilterFromBackend: (state, action: PayloadAction<Filter>) => {
      state.lookUp.initialFilter = action.payload;
      state.lookUp.appliedFilter = action.payload;
      state.lookUp.editingFilter = action.payload;
    },
    resetAllEditingFilter: (state) => {
      state.lookUp.editingFilter = state.lookUp.appliedFilter;
    },
    applyEditingFilter: (state) => {
      state.lookUp.appliedFilter = state.lookUp.editingFilter;
    },
    resetSubprojectFilter: (state) => {
      state.lookUp.editingFilter.subProjects =
        state.lookUp.appliedFilter.subProjects;
    },
    onCheckAllSubprojects: (state, action: PayloadAction<boolean>) => {
      state.lookUp.editingFilter.subProjects.forEach((subgroup) => {
        subgroup.options.forEach((option) => {
          option.isSelected = action.payload;
        });
      });
    },
    onCheckAllSubgroup: (
      state,
      action: PayloadAction<{ subgroupUid: string; value: boolean }>,
    ) => {
      const subgroup = state.lookUp.editingFilter.subProjects.find(
        (subgroup) => subgroup.subgroupUid === action.payload.subgroupUid,
      );

      if (!subgroup) {
        return;
      }

      subgroup.options.forEach((option) => {
        option.isSelected = action.payload.value;
      });
    },
    onCheckSubproject: (
      state,
      action: PayloadAction<{ subgroupUid: string; value: string }>,
    ) => {
      const subgroup = state.lookUp.editingFilter.subProjects.find(
        (subgroup) => subgroup.subgroupUid === action.payload.subgroupUid,
      );

      if (!subgroup) {
        return;
      }

      const option = subgroup.options.find(
        (option) => option.value === action.payload.value,
      );

      if (!option) {
        return;
      }

      option.isSelected = !option.isSelected;
    },
    onUncheckedSubproject: (
      state,
      action: PayloadAction<{ value: string }>,
    ) => {
      const option = state.lookUp.editingFilter.subProjects
        .flatMap((subgroup) => subgroup.options)
        .find((option) => option.value === action.payload.value);

      if (!option) {
        return;
      }

      option.isSelected = false;
    },
    onUncheckedSubprojectFromApplied: (
      state,
      action: PayloadAction<{ value: string }>,
    ) => {
      const option = state.lookUp.appliedFilter.subProjects
        .flatMap((subgroup) => subgroup.options)
        .find((option) => option.value === action.payload.value);

      if (!option) {
        return;
      }

      option.isSelected = false;
    },
    resetDateFilter: (state) => {
      state.lookUp.editingFilter.date = state.lookUp.appliedFilter.date;
    },
    onSetDateRange: (state, action: PayloadAction<[StateDate, StateDate]>) => {
      state.lookUp.editingFilter.date.range = action.payload;
    },
    onSetDateRangeFrom: (state, action: PayloadAction<StateDate>) => {
      state.lookUp.editingFilter.date.range[0] = action.payload;
    },
    onSetDateRangeTo: (state, action: PayloadAction<StateDate>) => {
      state.lookUp.editingFilter.date.range[1] = action.payload;
    },
    onUnsetDateRange: (state) => {
      state.lookUp.editingFilter.date.range = [null, null];
    },
    onSetSingleDate: (state, action: PayloadAction<StateDate>) => {
      state.lookUp.editingFilter.date.single = action.payload;
    },
    onUnsetSingleDate: (state) => {
      state.lookUp.editingFilter.date.single = null;
    },
    resetStatus: (state) => {
      state.lookUp.editingFilter.status = state.lookUp.appliedFilter.status;
    },
    onCheckAllStatus: (state, action: PayloadAction<boolean>) => {
      state.lookUp.editingFilter.status.options.forEach(
        (option) => (option.isSelected = action.payload),
      );
    },
    onCheckStatus: (
      state,
      action: PayloadAction<Pick<Option, 'isSelected' | 'value'>>,
    ) => {
      const option = state.lookUp.editingFilter.status.options.find(
        (option) => option.value === action.payload.value,
      );

      if (!option) {
        return;
      }

      option.isSelected = action.payload.isSelected;
    },
    onUncheckStatus: (state, action: PayloadAction<Pick<Option, 'value'>>) => {
      const option = state.lookUp.editingFilter.status.options.find(
        (option) => option.value === action.payload.value,
      );

      if (!option) {
        return;
      }

      option.isSelected = false;
    },
  },
  selectors: {
    selectSchedule: (state: ScheduleState) => state,
    selectLookUp: (state: ScheduleState) => {
      return {
        ...state.lookUp,
        selectedTaskCount: Object.keys(state.lookUp.selectedTask).length,
      };
    },
    selectScheduleData: (state: ScheduleState) => state.lookUp.data,
    selectMemoizedTreeData: createSelector(
      [
        (state: ScheduleState) => state.lookUp.data,
        (state: ScheduleState) => state.lookUp.searchText,
      ],
      (data, searchText) => {
        return buildTaskTree(data, searchText);
      },
    ),
    selectEditingFilterSubProjects: createSelector(
      [
        (state: ScheduleState) => state.lookUp.editingFilter,
        (state: ScheduleState) => state.lookUp.data,
      ],
      selectSubprojects,
    ),
    selectAppliedFilterSubProjects: createSelector(
      [
        (state: ScheduleState) => state.lookUp.appliedFilter,
        (state: ScheduleState) => state.lookUp.data,
      ],
      selectSubprojects,
    ),
    selectAppliedFilterStatus: createSelector(
      [
        (state: ScheduleState) => state.lookUp.appliedFilter.status,
        (state: ScheduleState) => state.lookUp.data,
      ],
      (filter, data) => {
        const isAllSelected = filter.options.every(
          (option) => option.isSelected,
        );

        return {
          isAllSelected,
          totalCount: data.length,
          options: filter.options.map((option) => {
            if (option.value === 'status-a') {
              return {
                ...option,
              };
            }
          }),
        };
      },
    ),

    selectEditingFilterDates: (state: ScheduleState) =>
      state.lookUp.editingFilter.date,
    selectEditingFilterStatus: createSelector(
      [
        (state: ScheduleState) => state.lookUp.editingFilter.status,
        (state: ScheduleState) => state.lookUp.data,
      ],
      selectStatus,
    ),
    selectEditingFilterTotalCount: createSelector(
      [
        (state: ScheduleState) => state.lookUp.editingFilter,
        (state: ScheduleState) => state.lookUp.data,
      ],
      (filter, data) => {
        const filteredData = data.filter((task) => {
          const subproject = filter.subProjects.flatMap((subgroup) =>
            subgroup.options.map((option) => option.value),
          );
          // TODO: Date 검색기준: 현재(9/18 오후2시) 기획확인중
          const isPlanStartInRange =
            safeParseMultiFormat(task.plnStaYmd) >=
            safeParseMultiFormat(filter.date.range[0]);
          const isPlanEndInRange =
            safeParseMultiFormat(task.plnEndYmd) <=
            safeParseMultiFormat(filter.date.range[1]);
          const isPlanInRange = isPlanStartInRange && isPlanEndInRange;

          // TODO: Status 검색기준 알아내서 적용
          const status = filter.status.options
            .filter((option) => option.isSelected)
            .map((option) => option.value);

          return subproject.includes(String(task.subPrjUid)) && isPlanInRange;
        });

        return filteredData.length;
      },
    ),
  },
});

export const scheduleActions = scheduleSlice.actions;
const scheduleReducer = scheduleSlice.reducer;
export const scheduleSelectors = scheduleSlice.selectors;
export default scheduleReducer;
