import { createSlice } from '@reduxjs/toolkit'

export type codeMgtState = {
  isNewDialogOpen: boolean
  codeMgtDrawer: {
    iscodeMgtDrawerOpen: boolean
    selprojectId: TGrid
  }
}

const initialcodeMgtState: codeMgtState = {
  isNewDialogOpen: false,
  codeMgtDrawer: {
    iscodeMgtDrawerOpen: false,
    selprojectId: null,
  },
}

const codeMgtSlice = createSlice({
  name: 'codeMgt',
  initialState: initialcodeMgtState,
  reducers: {
    openNewDialog(state) {
      state.isNewDialogOpen = true
    },
    closeNewDialog(state) {
      state.isNewDialogOpen = false
    },
    openCodeMgtDrawer(state, action) {
      state.codeMgtDrawer.iscodeMgtDrawerOpen = true
      state.codeMgtDrawer.selprojectId = action.payload
    },
    closeCodeMgtDrawer(state) {
      state.codeMgtDrawer.iscodeMgtDrawerOpen = false
      state.codeMgtDrawer.selprojectId = null
    },
  },
  selectors: {
    selectState: (state: codeMgtState) => state,
  },
})

export const codeMgtActions = codeMgtSlice.actions
const codeMgtReducer = codeMgtSlice.reducer
export const codeMgtSelectors = codeMgtSlice.selectors
export default codeMgtReducer
