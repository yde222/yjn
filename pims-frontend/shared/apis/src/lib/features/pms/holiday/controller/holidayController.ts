import appApi from "@pims-frontend/apis/lib/appApi"; 
import { HolidayListResDto } from "../response/holidayResDto"; 
import { HolidayCreateReqDto, HolidayDeleteReqDto, HolidayUpdateReqDto } from "../request/holidayReqDto"; 

// API 엔드포인트에 태그 추가 
const appTaggedApi = appApi.enhanceEndpoints({ 
  addTagTypes: ['holiday'], 
}); 

// 공휴일 관리 API 설정 
export const holidayApi = appTaggedApi.injectEndpoints({ 
  endpoints: (build) => ({ 
    // 공휴일 목록 조회 
    getHolidayList: build.query<HolidayListResDto[], { date: string }>({ 
      query: ({ date }) => ({ 
        url: `/holiday-management/list`, 
        method: 'GET', 
        params: { date }, 
      }), 
      providesTags: ['holiday'], 
    }), 

    // 공휴일 생성 
    createHoliday: build.mutation<void, HolidayCreateReqDto>({ 
      query: (data) => ({ 
        url: `/holiday-management/create`, 
        method: 'POST', 
        body: data, 
      }), 
      invalidatesTags: ['holiday'], 
    }), 

    // 공휴일 사용여부 수정 
    updateHoliday: build.mutation<void, HolidayUpdateReqDto>({ 
      query: ({ holidayManagementUid, ...data }) => ({ 
        url: `/holiday-management/update/${holidayManagementUid}`, 
        method: 'PUT', 
        body: data, 
      }), 
      invalidatesTags: ['holiday'], 
    }), 

    // 공휴일 삭제 
    deleteHoliday: build.mutation<void, HolidayDeleteReqDto>({ 
      query: (data) => ({ 
        url: `/holiday-management/delete`, 
        method: 'DELETE', 
        body: data, 
      }), 
      invalidatesTags: ['holiday'], 
    }), 
  }), 
  overrideExisting: false, 
}); 

// use* 훅을 통해 API를 사용 
export const { 
  useGetHolidayListQuery, 
  useCreateHolidayMutation, 
  useUpdateHolidayMutation, 
  useDeleteHolidayMutation, 
} = holidayApi; 

export default holidayApi;