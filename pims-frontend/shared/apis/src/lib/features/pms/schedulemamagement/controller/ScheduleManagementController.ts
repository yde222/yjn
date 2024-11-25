// 파일명: scheduleManagementController.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  CommonApiResponse,
  CommonApiSingleResponse,
} from '@pims-frontend/apis/types'
import {
  ScheduleCreateReqDto,
  ScheduleUpdateReqDto,
  ScheduleNotifyReqDto,
  ScheduleRepeatReqDto,
  ScheduleParticipantReqDto,
  ScheduleStatusUpdateReqDto,
  ScheduleAttachmentReqDto,
} from '../request/ScheduleManagementReqDto'

import {
  ScheduleDetailResDto,
  ScheduleListResDto,
} from '../response/ScheduleManagementResDto'

const scheduleApi = createApi({
  reducerPath: 'scheduleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pims-skcc.com/api/pms/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token // Assuming you store the token in `auth`
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),

  tagTypes: ['Schedule'],
  endpoints: builder => ({
    createSchedule: builder.mutation<
      ScheduleDetailResDto,
      ScheduleCreateReqDto
    >({
      query: newSchedule => ({
        url: '/schedule-management/create',
        method: 'POST',
        body: newSchedule,
      }),
      invalidatesTags: [{ type: 'Schedule', id: 'LIST' }],
    }),

    getScheduleDetail: builder.query<ScheduleDetailResDto, number>({
      query: scheduleManagementUid =>
        `/schedule-management/detail/${scheduleManagementUid}`,
      transformResponse: (
        response: CommonApiSingleResponse<ScheduleDetailResDto>,
      ) => response.data,
    }),

    updateSchedule: builder.mutation<
      ScheduleDetailResDto,
      ScheduleUpdateReqDto
    >({
      query: ({ scheduleManagementUid, ...updateData }) => ({
        url: `/schedule-management/update/${scheduleManagementUid}`,
        method: 'PUT',
        body: updateData,
      }),
      invalidatesTags: [{ type: 'Schedule', id: 'LIST' }],
    }),

    deleteSchedule: builder.mutation<void, number>({
      query: scheduleManagementUid => ({
        url: `/schedule-management/delete/${scheduleManagementUid}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Schedule', id: 'LIST' }],
    }),

    getScheduleList: builder.query<
      ScheduleListResDto, // ScheduleManagementListResDto는 schedules를 포함한 객체
      void
    >({
      query: () => '/schedule-management/list',
      transformResponse: (
        response: CommonApiSingleResponse<ScheduleListResDto>, // ScheduleManagementListResDto로 변경
      ) => response.data, // ScheduleManagementListResDto로부터 데이터를 반환
      providesTags: [{ type: 'Schedule', id: 'LIST' }],
    }),

    notifySchedule: builder.mutation<
      void,
      { scheduleManagementUid: number; notificationData: ScheduleNotifyReqDto }
    >({
      query: ({ scheduleManagementUid, notificationData }) => ({
        url: `/schedule-management/notify/${scheduleManagementUid}`,
        method: 'POST',
        body: notificationData,
      }),
      invalidatesTags: [{ type: 'Schedule', id: 'LIST' }],
    }),

    // 2. 반복 일정 설정
    repeatSchedule: builder.mutation<
      void,
      { scheduleManagementUid: number; repeatData: ScheduleRepeatReqDto }
    >({
      query: ({ scheduleManagementUid, repeatData }) => ({
        url: `/schedule-management/repeat/${scheduleManagementUid}`,
        method: 'POST',
        body: repeatData,
      }),
      invalidatesTags: [{ type: 'Schedule', id: 'LIST' }],
    }),

    // 3. 일정 참가자 관리
    manageParticipants: builder.mutation<
      void,
      { scheduleManagementUid: number; participants: ScheduleParticipantReqDto }
    >({
      query: ({ scheduleManagementUid, participants }) => ({
        url: `/schedule-management/participants/${scheduleManagementUid}`,
        method: 'POST',
        body: participants,
      }),
      invalidatesTags: [{ type: 'Schedule', id: 'LIST' }],
    }),

    // 5. 이벤트 상태 관리
    updateScheduleStatus: builder.mutation<
      void,
      { scheduleManagementUid: number; statusData: ScheduleStatusUpdateReqDto }
    >({
      query: ({ scheduleManagementUid, statusData }) => ({
        url: `/schedule-management/status/${scheduleManagementUid}`,
        method: 'PUT',
        body: statusData,
      }),
      invalidatesTags: [{ type: 'Schedule', id: 'LIST' }],
    }),

    // 6. 파일 첨부 관리
    manageAttachments: builder.mutation<
      void,
      {
        scheduleManagementUid: number
        attachmentData: ScheduleAttachmentReqDto
      }
    >({
      query: ({ scheduleManagementUid, attachmentData }) => ({
        url: `/schedule-management/attachments/${scheduleManagementUid}`,
        method: 'POST',
        body: attachmentData,
      }),
      invalidatesTags: [{ type: 'Schedule', id: 'LIST' }],
    }),
  }),
})

export const {
  useCreateScheduleMutation,
  useGetScheduleDetailQuery,
  useUpdateScheduleMutation,
  useDeleteScheduleMutation,
  useGetScheduleListQuery,
  useNotifyScheduleMutation,
  useRepeatScheduleMutation,
  useManageParticipantsMutation,
  useUpdateScheduleStatusMutation,
  useManageAttachmentsMutation,
} = scheduleApi

export default scheduleApi
