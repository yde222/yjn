import { CreateSubGroupReqDto } from '@pims-frontend/apis/lib/features/pms/project/dto/request/CreateSubGroupReqDto'
import { type SubProjectListResDto } from '@pims-frontend/apis/lib/features/pms/project/dto/response/SubProjectResDto'
import { createSlice } from '@reduxjs/toolkit'

export type BasicInfoState = {
  subPjtDrawer: {
    isSubPjtDrawerOpen: boolean
    selSubPjtUid: number | null
  }
  subGrpDrawer: {
    isSubGrpDrawerOpen: boolean
    selSubGrpUid: number | null
    changedSubProject: SubProjectListResDto[] | null
  }
  isSubPjtDialogOpen: boolean
  isSubPjtWitDialogOpen: boolean

  delSubPjtDialog: {
    isDelSubPjtDialogOpen: boolean
    selSubPjt: SubProjectListResDto[] | null
  }

  subGrpDialog: {
    isSubGrpDialogOpen: boolean
    conFirmSubGrpDialogOpen: boolean
    subGrpData: CreateSubGroupReqDto[] | null
    isEmptySubGrpPjt: boolean
  }

  isSubGrpUse: boolean
  isResetSubGrpDialogOpen: boolean
}

const initialbasicInfoState: BasicInfoState = {
  subPjtDrawer: {
    isSubPjtDrawerOpen: false,
    selSubPjtUid: null,
  },
  subGrpDrawer: {
    isSubGrpDrawerOpen: false,
    selSubGrpUid: null,
    changedSubProject: null,
  },
  isSubPjtDialogOpen: false,
  isSubPjtWitDialogOpen: false,

  delSubPjtDialog: {
    isDelSubPjtDialogOpen: false,
    selSubPjt: null,
  },

  subGrpDialog: {
    isSubGrpDialogOpen: false,
    conFirmSubGrpDialogOpen: false,
    subGrpData: [],
    isEmptySubGrpPjt: false,
  },

  //서브그룹 사용여부
  isSubGrpUse: false,
  isResetSubGrpDialogOpen: false,
}

const basicInfoSlice = createSlice({
  name: 'basicInfo',
  initialState: initialbasicInfoState,
  reducers: {
    // 서브프로젝트Drawer
    openSubPjtDrawer(state, action) {
      state.subPjtDrawer.isSubPjtDrawerOpen = true
      state.subPjtDrawer.selSubPjtUid = action.payload
    },
    closeSubPjtDrawer(state) {
      state.subPjtDrawer.isSubPjtDrawerOpen = false
      state.subPjtDrawer.selSubPjtUid = null
    },

    // 서브그룹Drawer
    openSubGrpDrawer(state, action) {
      state.subGrpDrawer.isSubGrpDrawerOpen = true
      state.subGrpDrawer.selSubGrpUid = action.payload
    },
    closeSubGrpDrawer(state) {
      state.subGrpDrawer.isSubGrpDrawerOpen = false
      state.subGrpDrawer.selSubGrpUid = null
    },

    //서브프로젝트 등록Dialog
    openAddSubPjtDialog(state) {
      state.isSubPjtDialogOpen = true
    },
    closeAddSubPjtDialog(state) {
      state.isSubPjtDialogOpen = false
    },

    // 서브그룹 등록Dialog
    openAddSubGrpDialog(state) {
      state.subGrpDialog.isSubGrpDialogOpen = true
    },
    closeAddSubGrpDialog(state) {
      state.subGrpDialog.isSubGrpDialogOpen = false
    },

    openConfirmSubGrpDialog(state, action) {
      state.subGrpDialog.conFirmSubGrpDialogOpen = true
      state.subGrpDialog.subGrpData = action.payload.data
      state.subGrpDialog.isEmptySubGrpPjt = action.payload.isEmpty
    },
    closeConfirmSubGrpDialog(state) {
      state.subGrpDialog.conFirmSubGrpDialogOpen = false
      state.subGrpDialog.subGrpData = null
      state.subGrpDialog.isEmptySubGrpPjt = false
    },

    openSubPjtWitDialog(state) {
      state.isSubPjtWitDialogOpen = true
    },
    closeSubPjtWitDialog(state) {
      state.isSubPjtWitDialogOpen = false
    },

    openDelSubPjtDialog(state, action) {
      state.delSubPjtDialog.isDelSubPjtDialogOpen = true
      state.delSubPjtDialog.selSubPjt = action.payload
    },
    closeDelSubPjtDialog(state) {
      state.delSubPjtDialog.isDelSubPjtDialogOpen = false
      state.delSubPjtDialog.selSubPjt = null
    },

    openResetSubGrpDialog(state) {
      state.isResetSubGrpDialogOpen = true
    },
    closeResetSubGrpDialog(state) {
      state.isResetSubGrpDialogOpen = false
    },

    isSubGrpUse(state, action) {
      state.isSubGrpUse = action.payload
    },
  },
  selectors: {
    selectState: (state: BasicInfoState) => state,
    selectSubPjtDrawer: (state: BasicInfoState) => state.subPjtDrawer,
    selectSubGrpDrawer: (state: BasicInfoState) => state.subGrpDrawer,
  },
})

export const basicInfoActions = basicInfoSlice.actions
const basicInfoReducer = basicInfoSlice.reducer
export const basicInfoSelectors = basicInfoSlice.selectors
export default basicInfoReducer
