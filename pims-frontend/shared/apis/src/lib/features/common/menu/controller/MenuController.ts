import {
  type CommonApiResponse,
  type CommonApiSingleResponse,
} from '@pims-frontend/apis/types/index'

import { MenuResDto } from '../dto/response/MenuResDto'
import { MenuReqDto } from '../dto/request/MenuReqDto'
import { MenuCreateReqDto } from '../dto/request/MenuCreateReqDto'
import { MenuDeleteReqDto } from '../dto/request/MenuDeleteReqDto'
import { MenuUpdateReqDto } from '../dto/request/MenuUpdateReqDto'
import adminApi from '@pims-frontend/apis/lib/adminApi'
import { MultiLanguageResDto } from '../../code/dto/response/MultiLanguageResDto'
import { MenuCopyReqDto } from '../dto/request/MenuCopyReqDto'

const appTaggedApi = adminApi.enhanceEndpoints({
  addTagTypes: ['globalMenu'],
})

const globalMenuApi = appTaggedApi.injectEndpoints({
  endpoints: builder => ({
    getAllGlobalMenus: builder.query<MenuResDto, MenuReqDto>({
      query: menuReqDto => ({
        url: `/api/common/admin/menus/all`,
        method: 'GET',
        params: { menuType: menuReqDto.menuType },
      }),
      providesTags: () => [{ type: 'globalMenu' }],
      transformResponse: (response: CommonApiSingleResponse<MenuResDto>) =>
        response.data,
    }),
    createGlobalMenus: builder.mutation<unknown, MenuCreateReqDto[]>({
      // 메뉴 등록
      query: body => ({
        url: `/api/common/admin/menus`,
        method: 'POST',
        body,
      }),
      invalidatesTags: () => [{ type: 'globalMenu' }],
    }),
    updateGlobalMenus: builder.mutation<unknown, MenuUpdateReqDto>({
      // 메뉴 단건 수정
      query: query => {
        const { menuUid, ...rest } = query
        return {
          url: `/api/common/admin/menus/${query.menuUid}`,
          method: 'PUT',
          body: rest,
        }
      },
      invalidatesTags: () => [{ type: 'globalMenu' }],
    }),
    bulkUpdateGlobalMenus: builder.mutation<unknown, MenuUpdateReqDto[]>({
      // 메뉴 다건 수정
      query: body => {
        return {
          url: `/api/common/admin/menus`,
          method: 'PUT',
          body,
        }
      },
      invalidatesTags: () => [{ type: 'globalMenu' }],
    }),
    deleteGlobalMenus: builder.mutation<unknown, MenuDeleteReqDto>({
      // 메뉴 단건 삭제
      query: query => {
        const { menuUid, ...rest } = query
        return {
          url: `/api/common/admin/menus/${query.menuUid}`,
          method: 'DELETE',
          body: rest,
        }
      },
      invalidatesTags: () => [{ type: 'globalMenu' }],
    }),
    bulkDeleteGlobalMenus: builder.mutation<unknown, MenuDeleteReqDto[]>({
      // 메뉴 다건 삭제
      query: body => {
        return {
          url: `/api/common/admin/menus`,
          method: 'DELETE',
          body,
        }
      },
      invalidatesTags: () => [{ type: 'globalMenu' }],
    }),

    getEnableUseLanguage: builder.query<MultiLanguageResDto, unknown>({
      query: () => ({
        url: `/api/common/languages`,
        method: 'GET',
      }),
      providesTags: () => [{ type: 'globalMenu' }],
      transformResponse: (
        response: CommonApiSingleResponse<MultiLanguageResDto>,
      ) => response.data,
    }),

    // Admin Left 메뉴 조회
    getAdminLeftMenus: builder.query<MenuResDto, MenuReqDto>({
      query: () => ({
        url: `/api/common/menus/admin`,
        method: 'GET',
      }),
      providesTags: () => [{ type: 'globalMenu' }],
      transformResponse: (response: CommonApiSingleResponse<MenuResDto>) =>
        response.data,
    }),
    // Project Left 메뉴 조회
    // getProjectLeftMenus: builder.query<MenuResDto, MenuReqDto>({
    //   query: menuReqDto => ({
    //     url: `/api/common/admin/menus/all`,
    //     method: 'GET',
    //     params: { projectUid: menuReqDto.menuType },
    //   }),
    //   providesTags: () => [{ type: 'globalMenu' }],
    //   transformResponse: (response: CommonApiSingleResponse<MenuResDto>) =>
    //     response.data,
    // }),

    createDynamicMenus: builder.mutation<unknown, MenuCopyReqDto>({
      query: query => {
        const { projectUid, ...rest } = query
        return {
          url: `/api/common/${query.projectUid}/menus`,
          method: 'POST',
          body: rest,
        }
      },
      invalidatesTags: () => [{ type: 'globalMenu' }],
    }),
  }),
})

export default globalMenuApi
export const {
  useGetAllGlobalMenusQuery,
  useLazyGetAllGlobalMenusQuery,
  useCreateGlobalMenusMutation,
  useUpdateGlobalMenusMutation,
  useDeleteGlobalMenusMutation,
  useBulkUpdateGlobalMenusMutation,
  useBulkDeleteGlobalMenusMutation,
  useGetEnableUseLanguageQuery,
  useGetAdminLeftMenusQuery,
  useCreateDynamicMenusMutation,
  // useGetProjectLeftMenusQuery,
} = globalMenuApi
