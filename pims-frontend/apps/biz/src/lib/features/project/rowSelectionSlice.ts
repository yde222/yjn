import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RowSelectionState {
  selectedRows: Record<string, boolean>; // 선택된 행들을 userId로 관리
  selectedUserDetails: { usrId: string; pjtUsrUid: string; usrNm: string }[];
}

const initialState: RowSelectionState = {
  selectedRows: {}, // 선택된 행들을 저장할 상태
  selectedUserDetails: [],
};

const rowSelectionSlice = createSlice({
  name: 'rowSelection',
  initialState,
  reducers: {
    updateSelectedRows: (
      state,
      action: PayloadAction<RowSelectionState['selectedRows']>,
    ) => {
      return {
        ...state,
        selectedRows: action.payload,
      };
    },
    updateSelectedRowDetails: (
      state,
      action: PayloadAction<RowSelectionState['selectedUserDetails']>,
    ) => {
      return {
        ...state,
        selectedUserDetails: action.payload,
      };
    },
  },
  selectors: {
    selectSelectedRows: (state: RowSelectionState) => state,
    // selectSelectedDetails: (state: RowSelectionState)=>state
  },
});

export const rowSelectionActions = rowSelectionSlice.actions;
const rowSelectionReducer = rowSelectionSlice.reducer;

export const rowSelectionSelector = rowSelectionSlice.selectors;
export default rowSelectionReducer;
