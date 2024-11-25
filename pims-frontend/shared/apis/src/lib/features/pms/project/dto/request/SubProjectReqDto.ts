export type SubProjectReqDto = {
  pjtUid: number;
  subPjtNm: string;
  staYmd: string;
  endYmd: string;
  subGrpUid?: number;
};

export type SubProjectDelReqDto = {
  pjtUid: number;
  subPjtUid: number[];
};
