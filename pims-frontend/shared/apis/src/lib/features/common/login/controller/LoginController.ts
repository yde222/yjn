import adminApi from '@pims-frontend/apis/lib/adminApi'
import appApi from '@pims-frontend/apis/lib/appApi'

import { CommonApiSingleResponse } from '@pims-frontend/apis/types/index'
import { LoginReqDto } from '../dto/request/LoginReqDto'
import { LoginResDto } from '../dto/response/LoginResDto'
import { UserInfoResDto } from '../dto/response/UserInfoResDto'
import { MyprojectResDto } from '../../project/dto/response/MyprojectResDto'

const appTaggedApi = adminApi.enhanceEndpoints({
  addTagTypes: ['login'],
})

const appTaggedApi2 = appApi.enhanceEndpoints({
  addTagTypes: [],
})

const loginApi = appTaggedApi.injectEndpoints({
  endpoints: builder => ({
    /**
     *
     */
    // 로그인하여 토큰을 받아온다.
    login: builder.mutation<LoginResDto, LoginReqDto>({
      query: body => ({
        url: `/api/common/users/login`,
        method: 'POST',
        body: body,
      }),

      invalidatesTags: result => [{ type: 'login' }],
    }),
    // 기본적인 사용자 정보를 받아온다.
    getUserInfo: builder.query<UserInfoResDto, unknown>({
      query: query => ({
        url: `/api/common/admin/users/${query.userId}`,
        method: 'GET',
      }),
      transformResponse: (response: CommonApiSingleResponse<UserInfoResDto>) =>
        response.data,
      // invalidatesTags: result => [{ type: 'login' }],
    }),
  }),
})

const loginApi2 = appTaggedApi2.injectEndpoints({
  endpoints: builder => ({
    getMyProjectList: builder.query<MyprojectResDto, unknown>({
      query: query => ({
        url: `/api/pms/null/project/users/my-project/${query.userId}`,
        method: 'GET',
      }),
      transformResponse: (response: CommonApiSingleResponse<MyprojectResDto>) =>
        response.data,
      // invalidatesTags: result => [{ type: 'login' }],
    }),
  }),
})

export default { loginApi, loginApi2 }
export const { useLoginMutation, useLazyGetUserInfoQuery } = loginApi
export const { useLazyGetMyProjectListQuery } = loginApi2
