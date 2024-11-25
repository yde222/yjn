import adminApi from '@pims-frontend/apis/lib/adminApi'
import {
  CommonApiSingleResponse,
  type CommonApiResponse,
} from '@pims-frontend/apis/types/index'
import { type CodeGroupResDto } from '../dto/response/CodeGroupResDto'
import { type CodeResDto } from '../dto/response/CodeResDto'
import { PCodeResDto } from '../dto/response/PCodeResDto'

const appTaggedApi = adminApi.enhanceEndpoints({
  addTagTypes: ['code', 'code-group'],
})

const codeApi = appTaggedApi.injectEndpoints({
  endpoints: builder => ({
    /** Admin 채널 코드 그룹 조회 */
    getAdminCodeGroups: builder.query<CodeGroupResDto[], unknown>({
      query: () => ({
        url: '/api/common/codes/groups/admin',
        method: 'GET',
      }),
      providesTags: () => [{ type: 'code-group' }],
      transformResponse: (response: CommonApiResponse<CodeGroupResDto>) =>
        response.data,
    }),
    /** Project 채널 코드 그룹 조회 */
    getProjectCodeGroups: builder.query<CodeResDto[], { projectUid: number }>({
      query: ({ projectUid }) => ({
        url: `/api/common/${projectUid}/codes/groups/project`,
        method: 'GET',
      }),
      providesTags: () => [{ type: 'code-group' }],
      transformResponse: (response: CommonApiResponse<CodeResDto>) =>
        response.data,
    }),
    /** 코드 상세 조회 */
    getCodeDetailsByCodeGroupUidWithLocale: builder.query<
      PCodeResDto[],
      { codeGroupUid: number }
    >({
      query: ({ codeGroupUid }) => ({
        url: `/api/common/codes/groups/${codeGroupUid}/codes`,
        method: 'GET',
      }),
      providesTags: () => [{ type: 'code' }],
      transformResponse: (response: CommonApiSingleResponse<PCodeResDto[]>) =>
        response.data,
    }),
  }),
})

export default codeApi
export const { useGetCodeDetailsByCodeGroupUidWithLocaleQuery } = codeApi
