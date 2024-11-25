// 파일명: ScheduleManagementResDto.ts

export interface ScheduleCreateResDto {
  title: string
  start: Date // or string, depending on your implementation
  end: Date // or string
  projectUid: number // 프로젝트 UID
  eventName: string
  eventTypeCode: number // 숫자로 수정
  eventType: string
  startTime: string // ISO 8601 형식으로 수정
  endTime: string // ISO 8601 형식으로 수정
  notification: string
  isAllDay: boolean
  color?: string
  attachedFiles?: string[]
  repeatEvent: boolean // boolean으로 수정
  repeatSettings?: {
    repeatEventUid: number
    repeatCycleNum: number
    repeatTypeCode: number
    repeatDayOfWeekJson: Record<string, boolean>
    isEnd: boolean
    endDate?: string
    endAfterRepeatNum?: number
  }
  description?: string
  repeatDays?: number[]
  repeatCount?: number
  repeatEndDate?: string
}

// 일정 상세 응답 DTO
export interface ScheduleDetailResDto {
  scheduleManagementUid: number // 일정 고유 ID
  eventName: string // 일정 이름
  eventTypeCode: number // 일정 유형 코드
  startTime: string // 시작 시간 (ISO 8601 포맷)
  endTime: string // 종료 시간 (ISO 8601 포맷)
  conferenceRoomManagementUid?: number // 회의실 UID (선택적)
  notification: string
  projectUsers: Array<{
    userId: string // 사용자 ID
    nickName: string // 사용자 닉네임
  }> // 일정에 포함된 사용자 목록
  alarmSetupTimeNum: number // 알림 설정 시간 (분 단위)
  alarmSetupTypeCode: number // 알림 유형 코드
  isAllDayEvent: boolean // 종일 일정 여부
  isRepeatEvent: boolean // 반복 일정 여부
  dayOfWeekCode?: string // 반복 일정의 요일 코드 (선택적)
  weekNumber?: string // 반복 일정의 주 번호 (선택적)
  repeatEvent?: {
    repeatEventUid: number // 반복 이벤트 UID
    repeatCycleNum: number // 반복 주기 번호
    repeatTypeCode: number // 반복 유형 코드
    repeatDayOfWeekJson: Record<string, boolean> // 반복 요일 JSON
    isEnd: boolean // 반복 종료 여부
    endDate?: string // 반복 종료 날짜 (선택적)
    endAfterRepeatNum?: number // 반복 종료 후 개수 (선택적)
  } // 반복 일정 정보 (선택적)
  location?: string // 일정 장소 (선택적)
}

// 일정 목록 응답 DTO
export interface ScheduleListResDto {
  schedules: ScheduleDetailResDto[] // 일정 목록
}
