import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LayoutState = {
  currentBreakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
};

const initialLayoutState: LayoutState = {};

const layoutSlice = createSlice({
  name: 'layout',
  initialState: initialLayoutState,
  reducers: {
    changeLayout(
      state,
      action: PayloadAction<Pick<LayoutState, 'currentBreakpoint'>>,
    ) {
      state.currentBreakpoint = action.payload.currentBreakpoint;
    },
  },
});

export const layoutActions = layoutSlice.actions;
const layoutReducer = layoutSlice.reducer;
export default layoutReducer;
