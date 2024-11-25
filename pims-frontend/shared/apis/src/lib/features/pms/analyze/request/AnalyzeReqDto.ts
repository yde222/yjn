export type BizAnalyzeGridsReqDto = {
  menuUid: string
}

export type AnalyzeListReqDto = {
  menuUid: string
  size: number
  page: number
  search: string | null
}

export type BizAnalyzeAddReqDto = {
  menuUid: string
  progressingDetailUid: number
  processingDetailId: string
  responsibleRId1: string
  processingDetailName: string
  progressStatusCode1: string
  businessAreaDetailDivisionCode: string
  planStartDate1: string
  processingDetailTypeCode: string
  planEndDate1: string
  functionName: string
  realStartDate1: string
  detailFunctionName: string
  realEndDate1: string
  derivationTypeCode: string
  responsibleContents1: string
  difficultyDivisionCode: string
  attachFileGroupUid1: string
  importanceCode: string
  approvalStatusCode1: string
  registerTypeDivisionCode: string
  approvalOpinionContents1: string
  subProjectUid: number
  businessResponsibleRegisterSortNumber1: string
  captureFileGroupUid1: string
  businessAreaUid1: string
  responsible: any
  Trow: []
  length : number
}

export type BizProjectUserResDto = {
  usrTyp: string
  usrNm: string
  usrId: string
  usrNik: string
  // copCd: string;
  // orzCd: string;
  rolCd: string[]
  subPjtUid: string[]
}

export type ExtendedBizProjectUserResDto = BizProjectUserResDto & {
  pjtUid: number
}

export type BizProjectUserListDto = {
  pjtUsrUid: number
  usrId: string
  usrNm: string
  companyCode: string
  subPjtNm: string[]
  staYmd: string
  endYmd: string
}

export type pjtUidProps = {
  pjtUid: number
}

export type BizProjectUserDetailReqDto = BizProjectUserListDto & {
  pjtUsrUid: number
  pjtUid: string
  usrNickNm: string
  withDraw: string
  authority: string[]
  workState: string
  rolCd: string[]
  prev: string
}

export type BizProjectUpdateUserReqDto = {
  pjtUid: number
  pjtUsrUid: number
  usrId: string
  usrNm: string
  usrNik: string
  copCd: string
  subPjtUid: string[]
  authority: string[]
  lbiStatCd: string
  wdrYmd: string
  rolCd: string[]
  prev: string
  lbiStaYmd?: string | null
  lbiEndYmd?: string | null
}

export type BizProjectUserDetailResDto = BizProjectUserListDto & {
  pjtUid: string
  usrNickNm: string
  withDraw: string
  authority: string[]
  workState: string
  roleDescription: string[]
  prev: string
}
