import appApi from '@pims-frontend/apis/lib/appApi'

import { CommonApiSingleResponse } from '@pims-frontend/apis/types'
import { AnalyzeDeleteReqDto } from '../request/AnalyzeDeleteReqDto'
import { AnalyzeDetailReqDto } from '../request/AnalyzeDetailReqDto'
import {
  AnalyzeListReqDto,
  BizAnalyzeAddReqDto,
  BizAnalyzeGridsReqDto,
} from '../request/AnalyzeReqDto'
import { WorkFlowReadReqDto } from '../request/WorkFlowReadReqDto'
import { AnalyzeDetailResDto } from '../response/AnalyzeDetailResDto'
import { AnalyzePageInfoResDto } from '../response/AnalyzePageInfoDto'
import { AnalyzeListResDto } from '../response/AnalyzeResDto'
import { WorkFlowReadResDto } from '../response/WorkFlowReadResDto'

const appTaggedApi = appApi.enhanceEndpoints({
  addTagTypes: ['analyze', 'analyzeDetail', 'duplicateId', 'pageWorkFlow'],
})

const analyzeApi = appTaggedApi.injectEndpoints({
  endpoints: builder => ({
    /* 요구사항 목록 조회 */
    getAnalyzeList: builder.query<AnalyzeListResDto, AnalyzeListReqDto>({
      query: query => ({
        url: `/api/pms/analysis-progressing/${query.menuUid}/all`,
        method: 'POST',
        body: {
          size: query.size,
          page: query.page,
          search: query.search,
        },
      }),
      providesTags: () => [{ type: 'analyze' }],
    }),
    /* 요구사항 상세  조회 */
    getAnalyzeDetail: builder.query<AnalyzeDetailResDto, AnalyzeDetailReqDto>({
      query: query => ({
        url: `/api/pms/analysis-progressing/${query.menuUid}/detail/${query.detailUid}`,
        method: 'GET',
      }),
      providesTags: () => [{ type: 'analyzeDetail' }],
      transformResponse: (
        response: CommonApiSingleResponse<AnalyzeDetailResDto>,
      ) => response.data,
    }),
    /* 요구사항 페이지정보 조회 */
    getAnalyzePageInfo: builder.query<
      AnalyzePageInfoResDto,
      BizAnalyzeGridsReqDto
    >({
      query: query => ({
        url: `/api/pms/page/${query.menuUid}`,
        method: 'GET',
      }),
      providesTags: () => [{ type: 'duplicateId' }],
    }),
    /* 요구사항 페이지 설정정보 조회 */
    getAnalyzePageSetup: builder.query<
      AnalyzeListResDto,
      BizAnalyzeGridsReqDto
    >({
      query: query => ({
        url: `/api/pms/page/setup/${query.menuUid}`,
        method: 'GET',
      }),
      providesTags: () => [{ type: 'duplicateId' }],
    }),
    /* 요구사항 단건 등록 */
    addAnalyze: builder.mutation<AnalyzeListResDto, BizAnalyzeAddReqDto>({
      query: body => ({
        url: `/api/pms/analysis-progressing/${body.menuUid}/detail`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: () => [{ type: 'analyze' }],
    }),
    /* 요구사항 단건 수정 */
    updateAnalyze: builder.mutation<AnalyzeListResDto, BizAnalyzeAddReqDto>({
      query: body => ({
        url: `/api/pms/analysis-progressing/${body.menuUid}/detail`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: () => [{ type: 'analyze' }],
    }),
    /* 요구사항 다건 삭제 */
    deleteAnalyze: builder.mutation<
      AnalyzeListResDto,
      { body: AnalyzeDeleteReqDto[]; menuUid: string }
    >({
      query: ({ body, menuUid }) => {
        return {
          url: `/api/pms/analysis-progressing/${menuUid}`,
          method: 'DELETE',
          body: body,
        }
      },
      invalidatesTags: () => [{ type: 'analyze' }],
    }),
    /* 페이지 workflow  조회 */
    getPageWorkFlow: builder.query<WorkFlowReadResDto, WorkFlowReadReqDto>({
      query: query => ({
        url: `/api/pms/work-flow/list/${query.pageInformationUid}`,
        method: 'GET',
      }),
      providesTags: () => [{ type: 'pageWorkFlow' }],
      transformResponse: (
        response: CommonApiSingleResponse<WorkFlowReadResDto>,
      ) => response.data,
    }),
    /*  */
  }),
})

export default analyzeApi
export const {
  useGetAnalyzeListQuery,
  useGetAnalyzePageInfoQuery,
  useGetAnalyzePageSetupQuery,
  useGetAnalyzeDetailQuery,
  useAddAnalyzeMutation,
  useUpdateAnalyzeMutation,
  useDeleteAnalyzeMutation,
  useGetPageWorkFlowQuery,
} = analyzeApi
