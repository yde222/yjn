import { UserSummaryResDto } from '@pims-frontend/apis/lib/features/common/user/dto/response/UserSummaryResDto'
import {
  CodeFilled,
  Filter,
} from '../../../app/(auth)/user-management/user/_query/userManagementSlice'

export function getFilteredUser(
  users: (UserSummaryResDto & CodeFilled)[],
  searchText: string,
  filter: Filter,
) {
  if (
    filter.authority.options.filter(v => v.isSelected).length > 0 &&
    // 아래 NOT 조건은, 조건이 '모두'로 선택되면, 코드값이 없는 경우도 '모두'로 해석하여 일단 보여주게끔 하는 로직임
    !filter.authority.options.every(v => v.isSelected)
  ) {
    return users.filter(
      user =>
        (user.userId.includes(searchText) ||
          user.userName.includes(searchText) ||
          user.projects.some(project =>
            project.projectName.includes(searchText),
          ) ||
          user.companyName?.includes(searchText) ||
          user.authorityName?.includes(searchText)) &&
        filter.authority.options.filter(
          option => option.isSelected && user.authorityCode === option.value,
        ).length > 0,
    )
  }
  return users.filter(
    user =>
      user.userId.includes(searchText) ||
      user.userName.includes(searchText) ||
      user.projects.some(project => project.projectName.includes(searchText)) ||
      user.companyName?.includes(searchText) ||
      user.authorityName?.includes(searchText),
  )
}
