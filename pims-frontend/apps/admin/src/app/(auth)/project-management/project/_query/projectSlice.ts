import { type ProjectResDto } from '@pims-frontend/apis/lib/features/common/project/dto/response/ProjectResDto'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type ProjectState = {
  isEditModalOpen: boolean
  editTarget: ProjectResDto | null
  addPjtModal: {
    isOpen: boolean
  }
  isAddProjectModalOpen: boolean
  projectList: {
    searchText: string
    projects: ProjectResDto[]
  }
}

const initialProjectState: ProjectState = {
  isEditModalOpen: false,
  editTarget: null,
  addPjtModal: {
    isOpen: false,
  },
  isAddProjectModalOpen: false,
  projectList: {
    searchText: '',
    projects: [],
  },
}

const projectSlice = createSlice({
  name: 'project',
  initialState: initialProjectState,
  reducers: {
    openEditModal(state, action: PayloadAction<ProjectResDto>) {
      state.isEditModalOpen = true
      state.editTarget = action.payload
    },
    closeEditModal(state) {
      state.isEditModalOpen = false
      state.editTarget = null
    },
    setModalOpen(state, action: PayloadAction<boolean>) {
      state.isEditModalOpen = action.payload
    },
    openAddPjtModal(state) {
      state.isAddProjectModalOpen = true
    },
    closeAddPjtModal(state) {
      state.isAddProjectModalOpen = false
    },
    onProjectListSearchTextChange(state, action: PayloadAction<string>) {
      state.projectList.searchText = action.payload
    },
    resetProjectListSearchText(state) {
      state.projectList.searchText = ''
    },
    setProjectList(state, action: PayloadAction<ProjectResDto[]>) {
      state.projectList.projects = action.payload
    },
  },
  selectors: {
    selectProject: (state: ProjectState) => state,
    selectProjectList: (state: ProjectState) => state.projectList.projects,
    selectProjectListSearchText: (state: ProjectState) =>
      state.projectList.searchText,
  },
})

export const projectActions = projectSlice.actions
const projectReducer = projectSlice.reducer
export const projectSelectors = projectSlice.selectors
export default projectReducer
