import appApi from '@pims-frontend/apis/lib/appApi'

import {
  CommonApiResponse,
  CommonApiSingleResponse,
} from '@pims-frontend/apis/types'
import {
  BizProjectUpdateUserReqDto,
  BizProjectUserDetailResDto,
  BizUserList,
  // type BizUserList,
  type ExtendedBizProjectUserResDto,
  type pjtUidProps,
} from '../request/ProjectUserReqDto'
import { ProjectUserIdListResDto } from '../response/ProjectUserResDto'
import { ProjectUserDetailResDto } from '../response/ProjectUserDetailResDto'

const appTaggedApi = appApi.enhanceEndpoints({
  addTagTypes: [
    'duplicateId',
    'duplicateUsrNik',
    'project-user-list',
    'delete-project-user',
    'project-user-detail',
    'add-project-user-list',
    'project-users',
  ],
})

const projectUserApi = appTaggedApi.injectEndpoints({
  endpoints: builder => ({
    getCheckId: builder.query<
      ExtendedBizProjectUserResDto,
      { pjtUid: number; usrId: string }
    >({
      query: query => ({
        url: `/api/pms/${query.pjtUid}/project/users/checkConfirm/id/${query.usrId}`,
        method: 'GET',
      }),
      providesTags: () => [{ type: 'duplicateId' }],
    }),
    getCheckUsrNik: builder.query<
      ExtendedBizProjectUserResDto,
      { pjtUid: number; usrNik: string }
    >({
      query: query => ({
        url: `/api/pms/${query.pjtUid}/project/users/checkConfirm/nick/${query.usrNik}`,
        method: 'GET',
      }),
      providesTags: () => [{ type: 'duplicateUsrNik' }],
    }),

    addProjectUser: builder.mutation<
      ExtendedBizProjectUserResDto,
      ExtendedBizProjectUserResDto
    >({
      query: ({ ...body }) => {
        const { pjtUid, ...newObject } = body
        console.log('newObject', newObject)
        return {
          url: `/api/pms/${pjtUid}/project/users/add`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Content-Type을 명시적으로 설정
          },
          body: JSON.stringify(newObject),
        }
      },
      invalidatesTags: [{ type: 'project-user-list' }],
    }),

    deleteProjectUser: builder.mutation<
      string[],
      { usrId: string[]; pjtUid: number }
    >({
      query: query => {
        return {
          url: `/api/pms/${query.pjtUid}/project/users/delete`,
          method: 'DELETE',
          body: {
            pjtUid: query.pjtUid,
            pjtUsrUid: query.usrId,
          },
        }
      },
      invalidatesTags: [{ type: 'project-user-list' }],
    }),

    getProjectUserList: builder.query<BizUserList[], pjtUidProps>({
      query: query => ({
        url: `/api/pms/${query.pjtUid}/project/users/list`,
        method: 'GET',
      }),
      providesTags: () => [{ type: 'project-user-list' }],
      transformResponse: (response: CommonApiResponse<BizUserList>) =>
        response.data,
    }),

    getProjectUserDetail: builder.query<
      ProjectUserDetailResDto,
      { pjtUsrUid: number; pjtUid: number }
    >({
      query: query => ({
        url: `/api/pms/${query.pjtUid}/project/users/${query.pjtUsrUid}/detail`,
        method: 'GET',
      }),
      transformResponse: (
        response: CommonApiSingleResponse<BizProjectUserDetailResDto>,
      ) => response.data,
    }),

    updateProjectUserInfo: builder.mutation<
      BizProjectUserDetailResDto,
      BizProjectUpdateUserReqDto
    >({
      query: ({ ...props }) => {
        const {
          pjtUid,
          pjtUsrUid,
          subPjtUid,
          authority,
          rolCd,
          usrNm,
          usrId,
          prev,
          ...rest
        } = props
        return {
          url: `/api/pms/${pjtUid}/project/users/${pjtUsrUid}/update`,
          method: 'PUT',
          body: rest,
        }
      },
      invalidatesTags: () => [{ type: 'project-user-detail' }],
    }),

    getProjectUsers: builder.query<ProjectUserIdListResDto[], pjtUidProps>({
      query: query => ({
        url: `/api/pms/${query.pjtUid}/project/users/list/id`,
        method: 'GET',
      }),
      providesTags: () => [{ type: 'project-users' }],
      transformResponse: (
        response: CommonApiResponse<ProjectUserIdListResDto>,
      ) => response.data,
    }),
  }),
})

export default projectUserApi
export const {
  useLazyGetCheckIdQuery,
  useLazyGetCheckUsrNikQuery,
  useAddProjectUserMutation,
  useDeleteProjectUserMutation,
  useGetProjectUserListQuery,
  useGetProjectUserDetailQuery,
  useUpdateProjectUserInfoMutation,
  useGetProjectUsersQuery,
} = projectUserApi
