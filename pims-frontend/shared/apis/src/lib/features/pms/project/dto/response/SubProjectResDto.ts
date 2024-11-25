export type SubProjectResDto = {
  pjtUid: number
  subPjtNm: string
  subPjtUid: number
  staYmd: string
  endYmd: string
  subGrpNm: string
}

export type UserInfo = {
  rolCd: string
  usrId: string
  usrNikNm: string
}[]

export type SubProjectInfo = {
  subPjtUid: number
  subPjtNm: string
  subPjtDesc: string
  staYmd: string
  endYmd: string
  witNum: number
  subPjtMngRId: UserInfo
}

export type SimpleSubProjectInfo = {
  subProjectUid: number
  subProjectName: string
}

export type GroupSubProjectInfo = {
  subGrpNm: string
  subGrpMngRId: string
  subGrpDesc: string
  subProjectInfos: SubProjectInfo[]
}

export type SubPjtMngList = {
  projectUserUid: number
  userId: string
  userNickName: string
}

export type SubProjectListResDto = {
  subGroupName: string
  subGroupManagerId: string
  subGroupDesc: string
  subProjectUid: number
  subProjectName: string
  subProjectDesc: string
  startDate: string
  endDate: string
  weightsNum: number
  subProjectOrderNo: number
  subPjtMngList: SubPjtMngList[]
}

// 서버로부터 받아올 데이터 타입 정의
export type GroupSubProjectInfoList = GroupSubProjectInfo[]
