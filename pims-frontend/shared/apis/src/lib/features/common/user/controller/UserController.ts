import adminApi from '@pims-frontend/apis/lib/adminApi'
import {
  CommonApiSingleResponse,
  type CommonApiResponse,
} from '@pims-frontend/apis/types/index'
import { UserReqDto } from '../dto/request/UserReqDto'
import { UserDetailResDto } from '../dto/response/UserDetailResDto'
import { UserSummaryResDto } from '../dto/response/UserSummaryResDto'

const appTaggedApi = adminApi.enhanceEndpoints({
  addTagTypes: ['user', 'user-history'],
})

type UserIdPathVariable = {
  userId: string
}

const userApi = appTaggedApi.injectEndpoints({
  endpoints: builder => ({
    getAllUsers: builder.query<UserSummaryResDto[], unknown>({
      query: () => ({
        url: `/api/common/admin/users/all`,
        method: 'GET',
      }),
      providesTags: () => [{ type: 'user' }],
      transformResponse: (response: CommonApiResponse<UserSummaryResDto>) =>
        response.data,
    }),
    /**
     *
     */
    getUserInfo: builder.query<UserDetailResDto, UserIdPathVariable>({
      query: query => ({
        url: `/api/common/admin/users/${query.userId}`,
        method: 'GET',
      }),
      providesTags: result =>
        result
          ? [
              {
                type: 'user' as const,
                id: result.userId,
              },
            ]
          : [],
      transformResponse: (
        response: CommonApiSingleResponse<UserDetailResDto>,
      ) => response.data,
    }),
    getUsersSearch: builder.query<UserDetailResDto[], string>({
      query: search => ({
        url: `/api/common/admin/users/all`, // TODO: 백엔드에서 url 정해지면 수정할 것
        method: 'GET',
      }),
      providesTags: result =>
        result
          ? result.map(({ userId }) => ({
              type: 'user' as const,
              id: userId,
            }))
          : [],
      transformResponse: (response: CommonApiResponse<UserDetailResDto>) =>
        response.data,
    }),
    getAllUserHistory: builder.query<any[], unknown>({
      // TODO: 백엔드에서 타입 정해지면 any, unknown 수정할 것
      query: () => ({
        url: `/api/common/admin/users/mock/history`, // TODO: 백엔드에서 url 정해지면 수정할 것
        method: 'GET',
      }),
      transformResponse: (response: CommonApiResponse<any>) => response.data,
      providesTags: ['user-history'],
    }),
    updateUserAuthorityCode: builder.mutation<
      UserDetailResDto,
      UserIdPathVariable & UserReqDto
    >({
      query: ({ userId, ...body }) => ({
        url: `/api/common/admin/users/${userId}/authority`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: () => [{ type: 'user' }],
    }),
    deleteUserInfo: builder.mutation<UserDetailResDto, UserIdPathVariable>({
      query: query => ({
        url: `/api/common/admin/users/${query.userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, req) => [
        {
          type: 'user',
          id: req.userId,
        },
        { type: 'user', id: 'PARTIAL-LIST' },
      ],
    }),
  }),
})

export default userApi
export const {
  useGetAllUsersQuery,
  useGetAllUserHistoryQuery,
  useGetUsersSearchQuery,
  useLazyGetUsersSearchQuery,
  useUpdateUserAuthorityCodeMutation,
  useDeleteUserInfoMutation,
  useLazyGetAllUserHistoryQuery,
  useLazyGetAllUsersQuery,
  useGetUserInfoQuery,
  useLazyGetUserInfoQuery,
} = userApi
