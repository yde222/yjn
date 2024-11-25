// pims-pms\src\main\java\com\skcc\pims\pms\project\dto\response

export type ProjectResDto = {
  pjtUid: number
  pjtNo: string
  pjtNm: string
  pjtDesc: string
  pjtMngRId: string
  rpnDepCd: string
  pgsStatCd: number
  staYmd: string
  endYmd: string
  isTplEnabled: Boolean
  isSubGrpEnabled: Boolean
  isDeleted: Boolean
}
