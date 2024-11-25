import appApi from '../../../../appApi'
import {
  CommonApiRequest,
  CommonApiResponse,
  CommonApiSingleResponse,
} from '../../../../../types'
import {
  type PagePropertiesResDto,
  type PageInfoResDto,
  type PageSetupResDto,
} from '../dto/response/PageSetupResDto'

const appTaggedApi = appApi.enhanceEndpoints({
  addTagTypes: ['pj-page'],
})

const PjPageApi = appTaggedApi.injectEndpoints({
  endpoints: builder => ({
    //페이지 설정정보 조회
    getPageSetup: builder.query<
      PageSetupResDto,
      { businessAreaDetailDivisionCode?: string; menuUid: string }
    >({
      query: query => ({
        url: `/api/pms/page/setup/${query.menuUid}`,
        method: 'GET',
      }),
      providesTags: () => [{ type: 'pj-page' }],
      transformResponse: (response: CommonApiSingleResponse<PageSetupResDto>) =>
        response.data,
    }),
    //페이지 설정정보 수정
    updatePageSetup: builder.mutation<
      PageSetupResDto,
      { pageInfo: PageInfoResDto; properties: PagePropertiesResDto[] }
    >({
      query: query => ({
        url: `/api/pms/page/setup`,
        method: 'PUT',
        body: query,
      }),
      invalidatesTags: () => [{ type: 'pj-page' }],
      // transformResponse: (response: CommonApiSingleResponse<PageSetupResDto>) =>
      //   response.data,
    }),
  }),
  overrideExisting: true,
})

export default PjPageApi
export const { useGetPageSetupQuery, useUpdatePageSetupMutation } = PjPageApi
