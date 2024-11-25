// src/api/workFlowApi.ts

import appApi from '@pims-frontend/apis/lib/appApi'
import {
  CommonApiResponse,
  CommonApiSingleResponse,
} from '@pims-frontend/apis/types'
import {
  CreateFlowChartReqDto,
  CreateWorkFlowFlowReqDto,
  CreateWorkFlowReqDto,
  CreateWorkFlowStepCategoryReqDto,
  CreateWorkFlowStepReqDto,
  ProjectUserListReq,
  UpdateWorkFlowFlowReqDto,
  UpdateWorkFlowStepCategoryReqDto,
  UpdateWorkFlowStepMoveReqDto,
  UpdateWorkFlowStepReqDto,
  WorkFlowReqDto,
  WorkFlowRuleColumnList,
} from '../request/workFlowReqDto'
import {
  DetailWorkFlowFlowResDto,
  DetailWorkFlowResDto,
  DetailWorkFlowStepResDto,
  FlowSetupResponse,
  ProjectUserListRes,
  WorkFlow,
  WorkFlowListResDto,
  WorkFlowStepCategoryListResDto,
  WorkFlowStepListResDto,
} from '../response/workFlowResDto'
import {
  Rule,
  RuleFormData,
} from '../../../../../../../../apps/biz/src/app/(auth)/basic-info/workflow-management/_model/type'

const appTaggedApi = appApi.enhanceEndpoints({
  addTagTypes: [
    'WorkFlow',
    'WorkFlowStepCategory',
    'WorkFlowDetail',
    'WorkFlowRule',
    'WorkFlowPageSetup',
  ],
})

export const workFlowApi = appTaggedApi.injectEndpoints({
  endpoints: build => ({
    // =====================================
    // 1. 워크플로 관리 (Workflow Management)
    // =====================================

    // 워크플로 리스트 조회
    getWorkFlowList: build.query<
      WorkFlowListResDto,
      { pjtUid: number; menuUid: number; keyword: string }
    >({
      query: ({ pjtUid, menuUid, keyword }) => ({
        url: `/api/pms/work-flow/${pjtUid}/${menuUid}/list?keyword=${keyword}`,
        method: 'GET',
      }),
      transformResponse: (
        response: CommonApiSingleResponse<WorkFlowListResDto>,
      ) => response.data,
      providesTags: (result, error, { pjtUid, menuUid }) =>
        result
          ? [
              ...result.pageInfos.flatMap(page =>
                page.workFlows.map(workFlow => ({
                  type: 'WorkFlow' as const,
                  id: workFlow.workFlowUid,
                })),
              ),
              { type: 'WorkFlow', id: 'LIST' },
            ]
          : [{ type: 'WorkFlow', id: 'LIST' }],
    }),
    // 워크플로 복제
    putWorkFlowCopy: build.mutation<
      any,
      { workFlowUid: number; pageInformationUid: number }
    >({
      query: ({ workFlowUid, pageInformationUid }) => ({
        url: `/api/pms/work-flow/copy`,
        method: 'PUT',
        body: {
          workFlowUid,
          pageInformationUid,
        },
      }),
      invalidatesTags: (result, error, { pageInformationUid }) => [
        { type: 'WorkFlow' },
        // { type: 'WorkFlowDetail', id: pageInformationUid },
      ],
    }),

    // 워크플로 등록
    createWorkFlow: build.mutation<
      CommonApiResponse<CreateWorkFlowReqDto>,
      CreateWorkFlowReqDto
    >({
      query: body => ({
        url: '/api/pms/work-flow/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'WorkFlow', id: 'LIST' }],
    }),

    // 워크플로 수정
    updateWorkFlow: build.mutation<
      WorkFlowListResDto,
      { wfwUid: number; data: any }
    >({
      query: ({ wfwUid, data }) => ({
        url: `/api/pms/work-flow/update/${wfwUid}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { wfwUid }) => [
        { type: 'WorkFlow', id: wfwUid },
      ],
    }),

    // 워크플로 삭제
    deleteWorkFlow: build.mutation<
      CommonApiResponse<WorkFlowListResDto>,
      number
    >({
      query: wfwUid => ({
        url: `/api/pms/work-flow/delete/${wfwUid}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, wfwUid) => [
        { type: 'WorkFlow', id: wfwUid },
        { type: 'WorkFlow', id: 'LIST' },
        { type: 'WorkFlowPageSetup' },
      ],
    }),

    // 워크플로 메뉴 이동
    moveWorkFlow: build.mutation<
      WorkFlowListResDto,
      WorkFlowReqDto.MoveWorkFlow
    >({
      query: body => ({
        url: '/api/pms/work-flow/move',
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'WorkFlow', id: 'LIST' }],
    }),

    // 플로차트 상세조회
    getFlowChart: build.query<DetailWorkFlowResDto, { wfwUid: number }>({
      query: props => ({
        url: `/api/pms/work-flow/detail/${props.wfwUid}`,
        method: 'GET',
      }),
      providesTags: (result, error, props) => [
        { type: 'WorkFlow', id: props.wfwUid },
        { type: 'WorkFlowPageSetup' },
        { type: 'WorkFlowStepCategory' },
      ],
      transformResponse: (
        response: CommonApiSingleResponse<DetailWorkFlowResDto>,
      ) => response.data,
    }),

    // 페이지에 해당하는 워크플로 목록조회
    getWorkFlowInPageList: build.query<
      WorkFlow[],
      { pageInformationUid: number }
    >({
      query: props => ({
        url: `/api/pms/work-flow/list/${props.pageInformationUid}`,
        method: 'GET',
      }),
      providesTags: ['WorkFlowPageSetup'],
      transformResponse: (response: CommonApiResponse<WorkFlow>) =>
        response.data,
    }),

    // =====================================
    // 2. 플로차트 관리 (Flow Chart Management)
    // =====================================

    // 워크플로 플로차트 등록
    createFlowChart: build.mutation<
      CommonApiResponse<CreateFlowChartReqDto>,
      CreateFlowChartReqDto
    >({
      query: body => ({
        url: '/api/pms/work-flow/create/flow-chart',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'WorkFlow', id: 'LIST' }],
    }),

    // 워크플로 플로 상세조회
    getWorkFlowFlowDetail: build.query<DetailWorkFlowFlowResDto, string>({
      query: wfwFlwUid => ({
        url: `/api/pms/work-flow/detail/flow/${wfwFlwUid}`,
        method: 'GET',
      }),
      providesTags: (result, error, wfwFlwUid) => [
        { type: 'WorkFlowDetail', id: wfwFlwUid },
      ],
      transformResponse: (
        response: CommonApiSingleResponse<DetailWorkFlowFlowResDto>,
      ) => response.data,
    }),

    // 워크플로 플로 삭제
    deleteWorkFlowFlow: build.mutation<CommonApiResponse<number>, number>({
      query: wfwFlwUid => ({
        url: `/api/pms/work-flow/flow/${wfwFlwUid}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, wfwFlwUid) => [
        { type: 'WorkFlow' },
        { type: 'WorkFlowDetail', id: wfwFlwUid },
      ],
    }),

    // 워크플로 플로 생성
    createWorkFlowFlow: build.mutation<
      CommonApiResponse<CreateWorkFlowFlowReqDto>,
      CreateWorkFlowFlowReqDto
    >({
      query: body => ({
        url: '/api/pms/work-flow/flow/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, { workFlowUid }) => [
        { type: 'WorkFlow' },
      ],
    }),

    // 워크플로 플로 수정
    updateWorkFlowFlow: build.mutation<
      CommonApiResponse<UpdateWorkFlowFlowReqDto>,
      UpdateWorkFlowFlowReqDto
    >({
      query: body => ({
        url: '/api/pms/work-flow/flow/',
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, { workFlowFlowUid }) => [
        { type: 'WorkFlow' },
        { type: 'WorkFlowDetail', id: workFlowFlowUid },
      ],
    }),

    // =====================================
    // 3. 스텝 분류 관리 (Step Category Management)
    // =====================================

    // 워크플로 스텝분류 생성
    createWorkFlowStepCategory: build.mutation<
      CommonApiResponse<CreateWorkFlowStepCategoryReqDto>,
      CreateWorkFlowStepCategoryReqDto
    >({
      query: body => {
        const data = {
          workFlowStepCategoryDesc: body.workFlowStepCategoryDesc,
          workFlowStepCategoryIconValue: body.workFlowStepCategoryIcon,
          workFlowStepCategoryName: body.workFlowStepCategoryName,
          workFlowUid: body.workFlowUid,
        }
        console.log(data)
        return {
          url: '/api/pms/work-flow/step-category/create',
          method: 'POST',
          body: data,
        }
      },
      invalidatesTags: (result, error, { workFlowUid }) => [
        { type: 'WorkFlowStepCategory', id: 'LIST' },
        { type: 'WorkFlowDetail' },
        { type: 'WorkFlow', id: workFlowUid },
      ],
    }),

    // 워크플로 스텝분류 리스트 조회
    getWorkFlowStepCategoryList: build.query<
      CommonApiResponse<WorkFlowStepCategoryListResDto>,
      number
    >({
      query: wfwUid => ({
        url: `/api/pms/work-flow/${wfwUid}/step-category/list`,
        method: 'GET',
      }),
      providesTags: (result, error, wfwUid) => [
        { type: 'WorkFlowStepCategory', id: 'LIST' },
        { type: 'WorkFlow', id: wfwUid },
      ],
    }),

    // 워크플로 스텝분류 상세조회
    getWorkFlowStepCategoryDetail: build.query<
      WorkFlowStepCategoryListResDto,
      number
    >({
      query: wfwStpCatUid => ({
        url: `/api/pms/work-flow/step-category/${wfwStpCatUid}`,
        method: 'GET',
      }),
      providesTags: (result, error, wfwStpCatUid) => [
        { type: 'WorkFlowStepCategory', id: wfwStpCatUid },
      ],
    }),

    // 워크플로 스텝분류 수정
    updateWorkFlowStepCategory: build.mutation<
      CommonApiResponse<UpdateWorkFlowStepCategoryReqDto>,
      UpdateWorkFlowStepCategoryReqDto
    >({
      query: body => {
        console.log('body', body)
        const data = {
          workFlowStepCategoryDesc: body.workFlowStepCategoryDesc,
          workFlowStepCategoryIconValue: body.workFlowStepCategoryIcon,
          workFlowStepCategoryName: body.workFlowStepCategoryName,
          workFlowStepCategoryUid: body.workFlowStepCategoryUid,
        }
        return {
          url: '/api/pms/work-flow/step-category/',
          method: 'PUT',
          body: data,
        }
      },
      invalidatesTags: (result, error, { workFlowStepCategoryUid }) => [
        { type: 'WorkFlowStepCategory', id: 'LIST' },
        { type: 'WorkFlowDetail' },
        { type: 'WorkFlow' },
        { type: 'WorkFlowStepCategory' },
      ],
    }),

    // 워크플로 스텝분류 삭제
    deleteWorkFlowStepCategory: build.mutation<
      CommonApiResponse<number[]>,
      { workFlowStepCategoryUidList: number[] }
    >({
      query: body => ({
        url: `/api/pms/work-flow/delete/step-category`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: (result, error, { workFlowStepCategoryUidList }) => [
        { type: 'WorkFlowStepCategory', id: 'LIST' },
        { type: 'WorkFlowDetail' },
        { type: 'WorkFlow' },
        { type: 'WorkFlowStepCategory' },
      ],
    }),

    // =====================================
    // 4. 스텝 관리 (Step Management)
    // =====================================

    // 워크플로 스텝 리스트 조회
    getWorkFlowStepList: build.query<WorkFlowStepListResDto[], number>({
      query: wfwUid => ({
        url: `/api/pms/work-flow/step/${wfwUid}/list`,
        method: 'GET',
      }),
      providesTags: (result, error, wfwUid) => [{ type: 'WorkFlowDetail' }],
      transformResponse: (
        response: CommonApiResponse<WorkFlowStepListResDto>,
      ) => response.data,
    }),

    // 워크플로 스텝 생성
    createWorkFlowStep: build.mutation<
      CommonApiResponse<CreateWorkFlowStepReqDto>,
      CreateWorkFlowStepReqDto
    >({
      query: body => ({
        url: '/api/pms/work-flow/step/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, { workFlowUid }) => [
        { type: 'WorkFlow' },
      ],
    }),

    // 워크플로 스텝 상세조회
    getWorkFlowStepDetail: build.query<DetailWorkFlowStepResDto, number>({
      query: wfwStpUid => ({
        url: `/api/pms/work-flow/detail/step/${wfwStpUid}`,
        method: 'GET',
      }),
      providesTags: (result, error, wfwStpUid) => [
        { type: 'WorkFlow' },
        { type: 'WorkFlowDetail' },
        { type: 'WorkFlowRule', id: wfwStpUid },
      ],
      transformResponse: (
        response: CommonApiSingleResponse<DetailWorkFlowStepResDto>,
      ) => response.data,
    }),

    // 워크플로 스텝 수정
    updateWorkFlowStep: build.mutation<
      CommonApiResponse<UpdateWorkFlowStepReqDto>,
      UpdateWorkFlowStepReqDto
    >({
      query: body => ({
        url: '/api/pms/work-flow/step',
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, { workFlowStepUid }) => [
        { type: 'WorkFlow' },
        { type: 'WorkFlowDetail', id: workFlowStepUid },
      ],
    }),

    // 워크플로 스텝 움직임 수정
    updateWorkFlowMoveStep: build.mutation<
      CommonApiResponse<UpdateWorkFlowStepMoveReqDto>,
      UpdateWorkFlowStepMoveReqDto
    >({
      query: body => ({
        url: '/api/pms/work-flow/step/move',
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, { workFlowStepUid }) => [
        { type: 'WorkFlowDetail', id: workFlowStepUid },
      ],
    }),

    // 워크플로 스텝 삭제
    deleteWorkFlowStep: build.mutation<CommonApiResponse<number>, number>({
      query: wfwStpUid => ({
        url: `/api/pms/work-flow/step/${wfwStpUid}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, wfwStpUid) => [
        { type: 'WorkFlow' },
        { type: 'WorkFlowDetail', id: wfwStpUid },
      ],
    }),

    // =====================================
    // 5. 규칙 관리 (Workflow Rules Management)
    // =====================================

    // 규칙 사용자 리스트 조회
    getWorkFlowProjectUserList: build.query<
      ProjectUserListRes,
      ProjectUserListReq
    >({
      query: props => ({
        url: `/api/pms/${props.pjtUid}/project/users/list/id`,
        method: 'GET',
      }),
      providesTags: [{ type: 'WorkFlowRule', id: 'USER_LIST' }],
      transformResponse: (
        response: CommonApiSingleResponse<ProjectUserListRes>,
      ) => response.data,
    }),

    // 플로 규칙 생성
    createWorkFlowRule: build.mutation<
      CommonApiSingleResponse<ProjectUserListRes>,
      RuleFormData
    >({
      query: props => ({
        url: `/api/pms/work-flow/flow-setup/create`,
        method: 'POST',
        body: props,
      }),
      invalidatesTags: (result, error, { flowSetupDivisionCode }) => [
        { type: 'WorkFlowDetail', id: flowSetupDivisionCode },
        { type: 'WorkFlowRule', id: 'RULES' },
      ],
    }),

    // 플로 규칙리스트 조회
    getWorkFlowRule: build.query<Rule[], string>({
      query: wfwFlwUid => ({
        url: `/api/pms/work-flow/flow-setup/${wfwFlwUid}`,
        method: 'GET',
      }),
      providesTags: [{ type: 'WorkFlowRule', id: 'RULES' }],
      transformResponse: (response: CommonApiResponse<Rule>) => response.data,
    }),

    // 워크플로 규칙 대상 컬럼 리스트 조회
    getWorkFlowRuleColumnList: build.query<
      WorkFlowRuleColumnList[],
      { pgeIfmUid: number; prpTypCd: string }
    >({
      query: props => ({
        url: `/api/pms/work-flow/setup-column/list/${props.pgeIfmUid}?prpTypCd=${props.prpTypCd}`,
        method: 'GET',
      }),

      transformResponse: (
        response: CommonApiResponse<WorkFlowRuleColumnList>,
      ) => response.data,
    }),

    deleteWorkFlowRule: build.mutation<any, { wfwFlwSupUid: number }>({
      query: props => ({
        url: `/api/pms/work-flow/flow-setup/${props.wfwFlwSupUid}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, wfwFlwSupUid) => [
        { type: 'WorkFlowRule' },
      ],
    }),
  }),

  overrideExisting: false,
})

export default workFlowApi

// =====================================
// Exported Hooks by Group
// =====================================

// 워크플로 관리 Hooks
export const {
  usePutWorkFlowCopyMutation,
  useGetWorkFlowListQuery,
  useCreateWorkFlowMutation,
  useUpdateWorkFlowMutation,
  useDeleteWorkFlowMutation,
  useMoveWorkFlowMutation,
  useGetFlowChartQuery,
  useGetWorkFlowInPageListQuery,

  // 플로차트 관리 Hooks
  useCreateFlowChartMutation,
  useGetWorkFlowFlowDetailQuery,
  useDeleteWorkFlowFlowMutation,
  useCreateWorkFlowFlowMutation,
  useUpdateWorkFlowFlowMutation,

  // 스텝 분류 관리 Hooks
  useCreateWorkFlowStepCategoryMutation,
  useGetWorkFlowStepCategoryListQuery,
  useGetWorkFlowStepCategoryDetailQuery,
  useUpdateWorkFlowStepCategoryMutation,
  useDeleteWorkFlowStepCategoryMutation,

  // 스텝 관리 Hooks
  useCreateWorkFlowStepMutation,
  useGetWorkFlowStepDetailQuery,
  useGetWorkFlowStepListQuery,
  useUpdateWorkFlowStepMutation,
  useUpdateWorkFlowMoveStepMutation,
  useDeleteWorkFlowStepMutation,

  // 규칙 관리 Hooks
  useGetWorkFlowProjectUserListQuery,
  useCreateWorkFlowRuleMutation,
  useGetWorkFlowRuleQuery,
  useGetWorkFlowRuleColumnListQuery,
  useDeleteWorkFlowRuleMutation,
} = workFlowApi
