// 파일명: ScheduleManagementReqDto.ts

// 일정 생성 요청 DTO
export interface ScheduleCreateReqDto {
  title: string
  start: string // Ensure this is a string if using ISO 8601
  end: string // Same here
  projectUid: number // Required: project UID
  eventName: string // Required: event name
  eventType: string // Required: event type
  eventTypeCode: number // Required: event type code
  startTime: string // Required: start time in ISO 8601 format
  endTime: string // Required: end time in ISO 8601 format
  notification: string // Required: notification settings
  isAllDay: boolean // Required: indicates if it's an all-day event
  color?: string // Optional: color of the event
  attachedFiles?: string[] // Optional: array of attached files
  projectUsers?: Array<{
    // Optional: array of users involved in the event
    userId: string
    nickName: string
  }>
  alarmSetupTimeNum: number // Required: notification setup time in minutes
  alarmSetupTypeCode: number // Required: notification type code
  isAllDayEvent: boolean // Required: indicates if it's an all-day event
  isRepeatEvent: boolean // Required: indicates if it's a repeating event
  repeatSettings?: {
    // Optional: details for repeating events
    repeatEventUid: number // Required if isRepeatEvent is true
    repeatCycleNum: number // Required: repeat cycle number
    repeatTypeCode: number // Required: repeat type code
    repeatDayOfWeekJson: Record<string, boolean> // Required: JSON for repeat days
    isEnd: boolean // Required: indicates if the repeat ends
    endDate?: string // Optional: end date for repeating events
    endAfterRepeatNum?: number // Optional: number of repeats after which it ends
  }
  description?: string // Optional: description of the event
  repeatDays?: number[] // Optional: array of numbers representing repeat days
  repeatCount?: number // Optional: total number of repeats
  repeatEndDate?: string // Optional: end date for the repeats
}

// 일정 수정 요청 DTO
export interface ScheduleUpdateReqDto {
  title: string
  start: Date
  end: Date // or string
  eventType: string
  scheduleManagementUid: number // 수정할 일정의 UID
  eventName?: string // 수정할 일정 이름 (선택적)
  eventTypeCode?: number // 수정할 일정 유형 코드 (선택적)
  startTime?: string // 수정할 시작 시간 (ISO 8601 포맷, 선택적)
  endTime?: string // 수정할 종료 시간 (ISO 8601 포맷, 선택적)
  notification: string
  isAllDay: boolean
  color?: string
  conferenceRoomManagementUid?: number // 수정할 회의실 UID (선택적)
  projectUsers?: Array<{
    userId: string // 수정할 사용자 ID (선택적)
    nickName: string // 수정할 사용자 닉네임 (선택적)s
  }> // 수정할 일정에 포함된 사용자 목록 (선택적)
  alarmSetupTimeNum?: number // 수정할 알림 설정 시간 (분 단위, 선택적)
  alarmSetupTypeCode?: number // 수정할 알림 유형 코드 (선택적)
  isAllDayEvent?: boolean // 수정할 종일 일정 여부 (선택적)
  isRepeatEvent?: boolean // 수정할 반복 일정 여부 (선택적)
  dayOfWeekCode?: string // 수정할 반복 일정의 요일 코드 (선택적)
  weekNumber?: string // 수정할 반복 일정의 주 번호 (선택적)
  repeatEvent?: {
    repeatEventUid?: number // 수정할 반복 이벤트 UID (선택적)
    repeatCycleNum?: number // 수정할 반복 주기 번호 (선택적)
    repeatTypeCode?: number // 수정할 반복 유형 코드 (선택적)
    repeatDayOfWeekJson?: Record<string, boolean> // 수정할 반복 요일 JSON (선택적)
    isEnd?: boolean // 수정할 반복 종료 여부 (선택적)
    endDate?: string // 수정할 반복 종료 날짜 (선택적)
    endAfterRepeatNum?: number // 수정할 반복 종료 후 개수 (선택적)
  } // 수정할 반복 일정 정보 (선택적)
}

// 일정 상태 업데이트 요청 DTO
export interface ScheduleStatusUpdateReqDto {
  status: string // 새로운 일정 상태
}

// 파일 첨부 관리 요청 DTO
export interface ScheduleAttachmentReqDto {
  attachments: File[] // 첨부할 파일 목록
}

// 알림 설정 요청 DTO
export interface ScheduleNotifyReqDto {
  alarmSetupTimeNum: number // 알림 시간 (분 단위)
  alarmSetupTypeCode: number // 알림 유형 코드
}

// 반복 일정 설정 요청 DTO
export interface ScheduleRepeatReqDto {
  repeatType: string // 반복 유형 (예: 매일, 매주, 매월)
  repeatInterval: number // 반복 간격
  endRepeat: string // 반복 종료 날짜
}

// 일정 참가자 관리 요청 DTO
export interface ScheduleParticipantReqDto {
  addParticipants?: string[] // 추가할 참가자 목록
  removeParticipants?: string[] // 제거할 참가자 목록
}
