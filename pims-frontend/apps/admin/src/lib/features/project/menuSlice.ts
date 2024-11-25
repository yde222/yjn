import { type MenuResDto } from '@pims-frontend/apis/lib/features/common/menu/dto/response/MenuResDto'
import {
  createSelector,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'

export type GlobalMenuState = {
  combobox: {
    isOpen: boolean
    value: string
    target: MenuResDto | null
    options: MenuResDto[]
  }
}

const initialGlobalMenuState: GlobalMenuState = {
  combobox: {
    isOpen: false,
    value: '',
    target: null,
    options: [], // NOTE: Hard-coded
  },
}

const globalMenuSlice = createSlice({
  name: 'menu',
  initialState: initialGlobalMenuState,
  reducers: {},
  selectors: {
    selectGlobalMenu: (state: GlobalMenuState) => state,
    selectProjectCombobox: createSelector(
      [(state: GlobalMenuState) => state.combobox],
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

export const globalMenuActions = globalMenuSlice.actions
const globalMenuReducer = globalMenuSlice.reducer
// export const globalMenuSelectors = globalMenuSlice.selectors
export default globalMenuReducer
