export interface HolidayCreateReqDto {
    holidayName: string;
    startYmd: string;
    endYmd: string;
    isEnabled: boolean;
    projectUid: number;
  }
  
  export interface HolidayDeleteReqDto {
    holiDayManagementUidList: number[];
  }
  
  export interface HolidayUpdateReqDto {
    holidayManagementUid: number;
    startYmd: string;
    endYmd: string;
    isEnabled: boolean;
  }