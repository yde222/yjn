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

export type BizUserList = {
  projectUserUid: number
  userId: string
  userName: string
  userNickName: string
  companyCode: number
  laborInputStatusCode: number
  subProjectName: string[]
  roleCode: string[]
  laborInputStartDate: string
  laborInputEndDate: string
  withdrawalDate: string
}

export type pjtUidProps = {
  pjtUid: number
}

export type BizProjectUserDetailReqDto = BizUserList & {
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

export type BizProjectUserDetailResDto = BizUserList & {
  pjtUid: string
  usrNickNm: string
  withDraw: string
  authority: string[]
  workState: string
  roleDescription: string[]
  prev: string
}
