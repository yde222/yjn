import adminApi from '@pims-frontend/apis/lib/adminApi'
import { type CommonApiSingleResponse } from '@pims-frontend/apis/types/index'
import { type ProjectReqDto } from '../dto/request/ProjectReqDto'
import { type CreateProjectResDto } from '../dto/response/CreateProjectResDto'
import { type ProjectResDto } from '../dto/response/ProjectResDto'
import { UpdateProjectReqDto } from '../dto/request/UpdateProjectReqDto'
import { MyprojectResDto } from '../dto/response/MyprojectResDto'

const appTaggedApi = adminApi.enhanceEndpoints({
  addTagTypes: ['project', 'projectDetail'],
})

export type ProjectPathVariable = {
  pjtUid: number
}

const projectApi = appTaggedApi.injectEndpoints({
  endpoints: builder => ({
    /** 프로젝트 등록 */
    createProject: builder.mutation<CreateProjectResDto, ProjectReqDto>({
      query: body => ({
        url: `/api/common/projects/project`,
        method: 'POST',
        body: body,
      }),
      transformResponse: (
        response: CommonApiSingleResponse<CreateProjectResDto>,
      ) => response.data,
      invalidatesTags: result => [{ type: 'project' }],
    }),
    // 프로젝트 리스트
    getProjectList: builder.query<ProjectResDto, { keyword?: string }>({
      query: query => ({
        url: `/api/common/projects/list?keyword=${query.keyword}`,
        method: 'GET',
      }),
      providesTags: () => [{ type: 'project' }],
      transformResponse: (response: CommonApiSingleResponse<ProjectResDto>) =>
        response.data,
    }),
    getProject: builder.query<ProjectResDto, ProjectPathVariable>({
      query: ({ pjtUid }) => ({
        url: `/api/common/projects/${pjtUid}`,
        method: 'GET',
      }),
      providesTags: () => [{ type: 'projectDetail' }],
      transformResponse: (response: CommonApiSingleResponse<ProjectResDto>) =>
        response.data,
    }),
    updateProject: builder.mutation<ProjectResDto, UpdateProjectReqDto>({
      query: body => ({
        url: `/api/common/projects/update`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: () => [{ type: 'project' }],
      transformResponse: (response: CommonApiSingleResponse<ProjectResDto>) =>
        response.data,
    }),
    updateProjectStat: builder.mutation<
      ProjectResDto,
      Pick<ProjectReqDto, 'pgsStatCd'> & ProjectPathVariable
    >({
      query: ({ pjtUid, pgsStatCd }) => ({
        url: `/api/common/projects/${pjtUid}/stat?pgsStatCd=${pgsStatCd}`,
        method: 'PUT',
      }),
      invalidatesTags: () => [{ type: 'project' }],
      transformResponse: (response: CommonApiSingleResponse<ProjectResDto>) =>
        response.data,
    }),
  }),
  overrideExisting: true,
})

export default projectApi
export const {
  useGetProjectListQuery,
  useCreateProjectMutation,
  useGetProjectQuery,
  useUpdateProjectMutation,
  useLazyGetProjectListQuery,
  useUpdateProjectStatMutation,
  useLazyGetProjectQuery,
  useLazyGetMyProjectListQuery,
} = projectApi
