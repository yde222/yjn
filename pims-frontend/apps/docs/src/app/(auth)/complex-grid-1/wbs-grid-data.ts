export type WbsGridData = {
  WBS: string;
  작업명: string;
  산출물: string | null;
  가중치: number;
  상태: string;
  계획진척률: number;
  실적진척률: number;
  계획시작일: string; // colaesce to Date
  계획종료일: string; // colaesce to Date
  기간: number; // days
  실제시작일: string | null;
  실제종료일: string | null;
  담당자: string | null;
};

export const wbsGridData: WbsGridData[] = [];
