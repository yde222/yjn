import { type UserDetailResDto } from '@pims-frontend/apis/lib/features/common/user/dto/response/UserDetailResDto'
import { type UserSummaryResDto } from '@pims-frontend/apis/lib/features/common/user/dto/response/UserSummaryResDto'
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getFilteredUser } from '../../../../../lib/features/user-management/filter'

type Option = {
  label: string
  value: string
  isSelected: boolean
}

export type Filter = Record<
  'authority',
  {
    options: Option[]
  }
>

export type CodeFilled = {
  companyName?: string
  departmentName?: string
  authorityName?: string
}

type UserMgtState = {
  resetModal: {
    step: number
    isOpen: boolean
    resetTarget: (UserSummaryResDto & CodeFilled) | null
    generatedPassword: string | null
  }
  userList: {
    searchText: string
    appliedFilter: Filter
    editingFilter: Filter
    users: (UserSummaryResDto & CodeFilled)[]
  }
}

const initialUserMgtState: UserMgtState = {
  resetModal: {
    step: -1,
    isOpen: false,
    resetTarget: null,
    generatedPassword: null,
  },
  userList: {
    searchText: '',
    editingFilter: {
      authority: {
        options: [],
      },
    },

    appliedFilter: {
      authority: {
        options: [],
      },
    },

    users: [],
  },
}

const userManagementSlice = createSlice({
  name: 'userMgt',
  initialState: initialUserMgtState,
  reducers: {
    openResetModal(state, action: PayloadAction<UserDetailResDto>) {
      state.resetModal.isOpen = true
      state.resetModal.resetTarget = {
        authorityCode: action.payload.authorityCode,

        nickname: action.payload.nickname,
        userId: action.payload.userId,
        userName: action.payload.userName,
        companyCode: action.payload.companyCode,
        projects: [],
      }
      state.resetModal.step = 1
    },
    nextStepResetModal(state) {
      state.resetModal.step = 2
      state.resetModal.generatedPassword = [...Array(10)]
        .map(() => (~~(Math.random() * 36)).toString(36))
        .join('')
    },

    closeResetModal(state) {
      state.resetModal.isOpen = false
      state.resetModal.resetTarget = null
      state.resetModal.step = -1
    },
    onUserListSearchTextChange(state, action: PayloadAction<string>) {
      state.userList.searchText = action.payload
    },
    resetUserListSearchText(state) {
      state.userList.searchText = ''
    },
    setUserList(
      state,
      action: PayloadAction<(UserSummaryResDto & CodeFilled)[]>,
    ) {
      state.userList.users = action.payload
    },
    resetAllFilters(state) {
      state.userList.editingFilter = state.userList.appliedFilter
    },
    resetAuthorityFilter(state) {
      state.userList.editingFilter.authority =
        state.userList.appliedFilter.authority
    },
    setAuthorityOptions(state, action: PayloadAction<Option[]>) {
      state.userList.editingFilter.authority.options = action.payload
      state.userList.appliedFilter.authority.options = action.payload
    },
    setAuthorityFilter(
      state,
      action: PayloadAction<Pick<Option, 'isSelected' | 'value'>>,
    ) {
      state.userList.editingFilter.authority.options =
        state.userList.editingFilter.authority?.options.map(option => {
          if (option.value === action.payload.value) {
            return {
              ...option,
              isSelected: action.payload.isSelected,
            }
          }
          return option
        })
    },
    applyFilters(state) {
      state.userList.appliedFilter = state.userList.editingFilter
    },
  },
  selectors: {
    selectUserMgt: (state: UserMgtState) => state,
    selectResetModal: (state: UserMgtState) => state.resetModal,
    selectUserList: (state: UserMgtState) => state.userList.users,
    selectUserListSearchText: (state: UserMgtState) =>
      state.userList.searchText,
    selectAppliedFilter: (state: UserMgtState) => state.userList.appliedFilter,
    selectEditingFilter: (state: UserMgtState) => state.userList.editingFilter,
    selectFilteredUserList: createSelector(
      (state: UserMgtState) => state.userList.users,
      (state: UserMgtState) => state.userList.searchText,
      (state: UserMgtState) => state.userList.appliedFilter,
      getFilteredUser,
    ),
    selectEditingFilterCount: createSelector(
      (state: UserMgtState) => state.userList.users,
      (state: UserMgtState) => state.userList.editingFilter,
      (users, filter) => {
        const systemAdminUsers = users.filter(user =>
          user.authorityCode?.includes('010'),
        )
        const fieldAdminUsers = users.filter(user =>
          user.authorityCode?.includes('011'),
        )
        const memberUsers = users.filter(user =>
          user.authorityCode?.includes('012'),
        )
        const totalLength = users.filter(user => {
          return filter.authority?.options
            .filter(option => option.isSelected)
            .some(option => user.authorityCode?.includes(option.value))
        }).length
        return {
          systemAdminUsers: systemAdminUsers,
          fieldAdminUsers: fieldAdminUsers,
          memberUsers: memberUsers,
          totalLength: totalLength,
        }
      },
    ),
  },
})

export const userManagementActions = userManagementSlice.actions
const userManagementReducer = userManagementSlice.reducer
export const userManagementSelectors = userManagementSlice.selectors
export default userManagementReducer
