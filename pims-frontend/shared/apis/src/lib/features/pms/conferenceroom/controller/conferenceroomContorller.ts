import appApi from "@pims-frontend/apis/lib/appApi";

import {ConferenceRoomDetailResDto, 
        ConferenceRoomListResDto, 
        ConferenceRoomNameListResDto 
    } from "../response/conferenceroomResDto";

    import {ConferenceRoomCreateReqDto, 
        ConferenceRoomDeleteReqDto, 
        ConferenceRoomUpdateReqDto 
    } from "../request/conferenceroomReqDto";


// API 엔드포인트에 태그 추가
const appTaggedApi = appApi.enhanceEndpoints({
  addTagTypes: ['conferenceRoom'],
});

// Conference Room API 설정
export const conferenceRoomApi = appTaggedApi.injectEndpoints({
  endpoints: (build) => ({
    // 회의실 목록 조회
    getConferenceRoomList: build.query<ConferenceRoomListResDto[], void>({
      query: () => (
        { url: `/conference-room-management/list`, method: 'GET' }),
      providesTags: ['conferenceRoom'],
    }),

    // 회의실명 목록 조회
    getConferenceRoomNameList: build.query<ConferenceRoomNameListResDto[], { projectUid: number }>({
      query: ({ projectUid }) => (
        { url: `/conference-room-management/list/${projectUid}`, method: 'GET' }),
      providesTags: ['conferenceRoom'],
    }),

    // 회의실 등록
    createConferenceRoom: build.mutation<void, ConferenceRoomCreateReqDto>({
      query: (data) => (
        { url: `/conference-room-management/create`, method: 'POST', body: data }),
      invalidatesTags: ['conferenceRoom'],
    }),

    // 회의실 수정
    updateConferenceRoom: build.mutation<void, { conferenceRoomManagementUid: number, data: ConferenceRoomUpdateReqDto }>({
      query: ({ conferenceRoomManagementUid, data }) => (
        { 
        url: `/conference-room-management/update/${conferenceRoomManagementUid}`, method: 'PUT', body: data 
      }),
      invalidatesTags: ['conferenceRoom'],
    }),

    // 회의실 상세 조회
    getConferenceRoomDetail: build.query<ConferenceRoomDetailResDto, number>({
      query: (conferenceRoomManagementUid) => (
        { url: `/conference-room-management/${conferenceRoomManagementUid}`, method: 'GET' }),
      providesTags: (result, error, conferenceRoomManagementUid) => [{ type: 'conferenceRoom', id: conferenceRoomManagementUid }],
    }),

    // 회의실 삭제
    deleteConferenceRoom: build.mutation<void, ConferenceRoomDeleteReqDto>({
      query: (data) => (
        { url: `/conference-room-management/delete`, method: 'DELETE', body: data }),
      invalidatesTags: ['conferenceRoom'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetConferenceRoomListQuery,
  useGetConferenceRoomNameListQuery,
  useCreateConferenceRoomMutation,
  useUpdateConferenceRoomMutation,
  useGetConferenceRoomDetailQuery,
  useDeleteConferenceRoomMutation,
} = conferenceRoomApi;

export default conferenceRoomApi;