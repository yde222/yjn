// errorSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ErrorState {
  errorCode: number | null
  errorMessage: string | null
}

const initialState: ErrorState = {
  errorCode: null,
  errorMessage: null,
}

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError(
      state,
      action: PayloadAction<{ errorCode: number; errorMessage: string }>,
    ) {
      state.errorCode = action.payload.errorCode
      state.errorMessage = action.payload.errorMessage
    },
    clearError(state) {
      state.errorCode = null
      state.errorMessage = null
    },
  },
  selectors: {
    selectState: (state: ErrorState) => state,
  },
})

export const errorActions = errorSlice.actions
export const errorSelectors = errorSlice.selectors
const errorReducer = errorSlice.reducer
export default errorReducer
