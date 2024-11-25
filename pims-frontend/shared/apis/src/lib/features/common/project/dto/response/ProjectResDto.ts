// pims-common/src/main/java/com/skcc/pims/common/project/dto/response/ProjectResDto.java
export type ProjectResDto = {
  /** Integer */
  pjtUid: number
  pjtNo: string
  pjtNm: string
  staYmd: string
  endYmd: string
  pgsStatCd: string
  pjtMngRId: string
  rpnDepCd: string
  isTplEnabled: boolean
}
