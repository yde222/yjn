import adminApi from '@pims-frontend/apis/lib/adminApi'
import { type CommonApiResponse } from '@pims-frontend/apis/types/index'
import { UserDetailResDto } from '../dto/response/UserDetailResDto'
import { UserSummaryResDto } from '../dto/response/UserSummaryResDto'

const appTaggedApi = adminApi.enhanceEndpoints({
  addTagTypes: ['userManagement'],
})

type UserIdPathVariable = {
  userId: string
}

const userManagementApi = appTaggedApi.injectEndpoints({
  endpoints: builder => ({
    //전체 시스템 사용자 조회
    getAllUsers: builder.query<UserSummaryResDto[], null>({
      query: () => ({
        url: `/api/common/admin/users/all`,
        method: 'GET',
      }),
      providesTags: result => [{ type: 'userManagement' }],
      transformResponse: (response: CommonApiResponse<UserSummaryResDto>) =>
        response.data,
    }),
    //시스템 사용자 상세 조회
    getUserInfo: builder.query<UserDetailResDto[], UserIdPathVariable>({
      query: query => ({
        url: `/api/common/admin/users/${query.userId}`,
        method: 'GET',
      }),
      providesTags: result => [{ type: 'userManagement' }],
      transformResponse: (response: CommonApiResponse<UserDetailResDto>) =>
        response.data,
    }),
    //시스템 사용자 권한 변경 -- 제작중
    updateUserSystemAuthority: builder.query<
      UserDetailResDto[],
      { userId: string }
    >({
      query: () => ({
        url: `/api/common/admin/users/all`,
        method: 'PUT',
      }),
    }),
  }),
})

export default userManagementApi
export const { useGetAllUsersQuery, useGetUserInfoQuery } = userManagementApi
