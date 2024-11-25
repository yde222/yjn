// 회의실 생성 요청 DTO
export interface ConferenceRoomCreateReqDto {
    projectUid: number;  // 프로젝트 고유 식별자
    conferenceRoomId: string;  // 회의실 ID
    conferenceRoomName: string;  // 회의실 이름
    isEnabled: boolean;  // 사용 가능 여부
    conferenceRoomManagementDesc: string;  // 회의실 관리 설명
    locationAddress: string;  // 위치 주소
    limitNumber: number;  // 제한 인원 수
    perCaseReserveLimitTimeNum: number;  // 회당 예약 시간 제한
    perDayReserveLimitTimeNum: number;  // 하루 예약 시간 제한
  }

  // 회의실 수정 요청 DTO
  export interface ConferenceRoomUpdateReqDto {
    conferenceRoomId: string;  // 회의실 ID
    conferenceRoomName: string;  // 회의실 이름
    isEnabled: boolean;  // 사용 가능 여부
    conferenceRoomManagementDesc: string;  // 회의실 관리 설명
    locationAddress: string;  // 위치 주소
    limitNumber: number;  // 제한 인원 수
    perCaseReserveLimitTimeNum: number;  // 회당 예약 시간 제한
    perDayReserveLimitTimeNum: number;  // 하루 예약 시간 제한
  }
  
  // 회의실 삭제 요청 DTO
  export interface ConferenceRoomDeleteReqDto {
    conferenceRoomManagementUid: number[];  // 삭제할 회의실 고유 식별자 목록
  }