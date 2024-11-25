import adminApi from '@pims-frontend/apis/lib/adminApi'
import {
  CommonApiSingleResponse,
  type CommonApiResponse,
} from '@pims-frontend/apis/types/index'
import { type CodeGroupReqDto } from '../dto/request/CodeGroupReqDto'
import { type CodeGroupResDto } from '../dto/response/CodeGroupResDto'
import { type CodeResDto } from '../dto/response/CodeResDto'
import { CodeReqDto } from '../dto/request/CodeReqDto'
import { CodeCreateGroupReqDto } from '../dto/request/CodeCreateGroupReqDto'
import { CodeCreateReqDto } from '../dto/request/CodeCreateReqDto'

const appTaggedApi = adminApi.enhanceEndpoints({
  addTagTypes: ['codeMgt', 'codeMgt-group'],
})

const codeMgtApi = appTaggedApi.injectEndpoints({
  endpoints: builder => ({
    /** 코드 그룹 조회 */
    getAllCodeGroups: builder.query<CodeGroupResDto[], unknown>({
      query: () => ({
        url: '/api/common/admin/codes/groups/all',
        method: 'GET',
      }),
      providesTags: () => [{ type: 'codeMgt-group' }],
      transformResponse: (response: CommonApiResponse<CodeGroupResDto>) =>
        response.data,
    }),
    /** 코드 상세 조회 */
    getAllCodeDetails: builder.query<CodeResDto[], { codeGroupUid: number }>({
      query: ({ codeGroupUid }) => ({
        url: `/api/common/admin/codes/groups/${codeGroupUid}/codes`,
        method: 'GET',
      }),
      providesTags: () => [{ type: 'codeMgt' }],
      transformResponse: (response: CommonApiResponse<CodeResDto>) =>
        response.data,
    }),
    /** 코드 그룹 생성 */
    createCodeGroup: builder.mutation<CodeGroupResDto, CodeCreateGroupReqDto>({
      query: query => ({
        url: `/api/common/admin/codes/groups`,
        method: 'POST',
        body: query,
      }),
      invalidatesTags: () => [{ type: 'codeMgt-group' }],
      transformResponse: (response: CommonApiSingleResponse<CodeGroupResDto>) =>
        response.data,
    }),
    /** 코드 그룹 단건 수정 */
    updateCodeGroup: builder.mutation<CodeGroupResDto, CodeGroupReqDto>({
      query: query => {
        const { codeGroupUid, ...rest } = query
        return {
          url: `/api/common/admin/codes/groups/${query.codeGroupUid}`,
          method: 'PUT',
          body: rest,
        }
      },
      invalidatesTags: () => [{ type: 'codeMgt-group' }],
    }),
    /** 코드 그룹 삭제 */
    deleteCodeGroup: builder.mutation<CodeGroupResDto, Partial<CodeReqDto>>({
      query: ({ codeGroupUid }) => ({
        url: `/api/common/admin/codes/groups/${codeGroupUid}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => [{ type: 'codeMgt-group' }],
    }),
    /** 코드 생성 */
    createCode: builder.mutation<CodeResDto, CodeCreateReqDto>({
      query: body => {
        const { codeGroupUid, ...rest } = body
        return {
          url: `/api/common/admin/codes/groups/${body.codeGroupUid}/codes`,
          method: 'POST',
          body: rest,
        }
      },
      invalidatesTags: () => [{ type: 'codeMgt' }],
    }),
    /** 코드 단건 수정 */
    updateCode: builder.mutation<CodeResDto, CodeReqDto>({
      query: body => {
        const { codeGroupUid, codeUid, ...rest } = body
        return {
          url: `/api/common/admin/codes/groups/${body.codeGroupUid}/codes/${body.codeUid}`,
          method: 'PUT',
          body: rest,
        }
      },
      invalidatesTags: () => [{ type: 'codeMgt' }],
    }),
    /** 코드 삭제 */
    deleteCode: builder.mutation<CodeResDto, Partial<CodeReqDto>>({
      query: body => ({
        url: `/api/common/admin/codes/groups/${body.codeGroupUid}/codes/${body.codeUid}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => [{ type: 'codeMgt' }],
    }),
  }),
})

export default codeMgtApi
export const {
  useCreateCodeGroupMutation,
  useCreateCodeMutation,
  useDeleteCodeGroupMutation,
  useDeleteCodeMutation,
  useGetAllCodeDetailsQuery,
  useGetAllCodeGroupsQuery,
  useUpdateCodeGroupMutation,
  useUpdateCodeMutation,
  useLazyGetAllCodeDetailsQuery,
  useLazyGetAllCodeGroupsQuery,
} = codeMgtApi
