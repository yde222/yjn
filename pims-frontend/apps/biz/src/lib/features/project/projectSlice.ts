import { type ProjectResDto } from '@pims-frontend/apis/lib/features/pms/project/dto/response/ProjectResDto'
import { type MyprojectResDto } from '@pims-frontend/apis/lib/features/pms/project/dto/response/MyprojectResDto'
import {
  createSelector,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'

export type ProjectState = {
  combobox: {
    isOpen: boolean
    value: number
    target: MyprojectResDto | null
    options: MyprojectResDto[]
  }
}

const initialProjectState: ProjectState = {
  combobox: {
    isOpen: false,
    value: 0,
    target: null,
    options: [], // NOTE: Hard-coded
  },
}

const projectSlice = createSlice({
  name: 'project',
  initialState: initialProjectState,
  reducers: {
    toggleCombobox: (state, action) => {
      state.combobox.isOpen = !state.combobox.isOpen
      state.combobox.value = action.payload
    },
    closeCombobox: state => {
      state.combobox.isOpen = false
    },
    openCombobox: (state, action) => {
      state.combobox.isOpen = true
      state.combobox.target = action.payload
    },
    selectProject: (
      state,
      action: PayloadAction<Pick<ProjectState['combobox'], 'target' | 'value'>>,
    ) => {
      state.combobox.target = action.payload.target
      state.combobox.value = action.payload.value
    },
    getInitialProject: (state, action: PayloadAction<MyprojectResDto[]>) => {
      const firstProject = action.payload[0]
      if (firstProject) {
        state.combobox.options = action.payload
        state.combobox.target = firstProject
        state.combobox.value = firstProject.projectUid
      }
    },
    getUsersProjects(state, action: PayloadAction<MyprojectResDto[]>) {
      state.combobox.options = action.payload
    },
  },
  selectors: {
    selectProject: (state: ProjectState) => state,
    selectProjectCombobox: createSelector(
      [(state: ProjectState) => state.combobox],
      combobox => {
        return {
          ...combobox,
          // NOTE: 이렇게 !로 assertion하는것은 좋지 않고, Server Side에서 값이 채워지는것을 확실히 해야함
          target: combobox.target!,
        }
      },
    ),
  },
})

export const projectActions = projectSlice.actions
const projectReducer = projectSlice.reducer
export const projectSelectors = projectSlice.selectors
export default projectReducer
