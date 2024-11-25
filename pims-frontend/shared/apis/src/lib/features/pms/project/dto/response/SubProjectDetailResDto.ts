type SubPjtMngRId = {
  usrId: string
  usrNikNm: string
}
export type SubProjectDetailResDto = {
  subPjtUid: number // 서브 프로젝트ID
  subPjtNm: string // 서브프로젝트명
  subPjtDesc: string // 서브프로젝트 설명
  staYmd: string // 시작일
  endYmd: string // 종료일
  witNum: number // 가중치
  assign: boolean
  subPjtMngRId: SubPjtMngRId[]
}
