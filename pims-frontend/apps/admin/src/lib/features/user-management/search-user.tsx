'use client'

import { InputIcon } from '@pims-frontend/ui/components/ui/input-icon'
import { useAppDispatch, useAppSelector } from '../../hooks'
import {
  userManagementActions,
  userManagementSelectors,
} from '../../../app/(auth)/user-management/user/_query/userManagementSlice'
import React from 'react'

export function SearchUser() {
  const [text, setText] = React.useState<string>('')

  const dispatch = useAppDispatch()
  const searchText = useAppSelector(
    userManagementSelectors.selectUserListSearchText,
  )

  return (
    <InputIcon
      placeholder="사용자명, 사번, 부서명, 회사명"
      startIcon="Search"
      className="min-w-96"
      value={text}
      onChange={e => {
        setText(e.target.value)
      }}
      onKeyDown={e => {
        if (e.nativeEvent.isComposing) return // 한글 잘림 방지

        if (e.key === 'Enter') {
          dispatch(userManagementActions.onUserListSearchTextChange(text))
          setText('')
        }
      }}
    />
  )
}
