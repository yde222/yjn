// 회의실 목록 응답 DTO
export interface ConferenceRoomListResDto {
    conferenceRoomManagementUid: number;  // 회의실 고유 식별자
    conferenceRoomId: string;  // 회의실 ID
    conferenceRoomName: string;  // 회의실 이름
    isEnabled: boolean;  // 사용 가능 여부
    locationAddress: string;  // 위치 주소
    limitNumber: number;  // 제한 인원 수
    perCaseReserveLimitTimeNum: number;  // 회당 예약 시간 제한
    perDayReserveLimitTimeNum: number;  // 하루 예약 시간 제한
  }

  // 회의실명 목록 응답 DTO
  export interface ConferenceRoomNameListResDto {
    conferenceRoomManagementUid: number;  // 회의실 고유 식별자
    conferenceRoomName: string;  // 회의실 이름
  }
  
  // 회의실 상세 정보 응답 DTO
  export interface ConferenceRoomDetailResDto {
    conferenceRoomManagementUid: number;  // 회의실 고유 식별자
    conferenceRoomId: string;  // 회의실 ID
    conferenceRoomName: string;  // 회의실 이름
    isEnabled: boolean;  // 사용 가능 여부
    conferenceRoomManagementDesc: string;  // 회의실 관리 설명
    locationAddress: string;  // 위치 주소
    limitNumber: number;  // 제한 인원 수
    perCaseReserveLimitTimeNum: number;  // 회당 예약 시간 제한
    perDayReserveLimitTimeNum: number;  // 하루 예약 시간 제한
  }