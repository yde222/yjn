// pims-common/src/main/java/com/skcc/pims/common/code/dto/request/CodeReqDto.java
export type CodeGroupResDto = {
  codeGroupUid: string
  codeGroupName: string
  codeGroupDescription: string
  majorCategory: BigInteger
  middleCategory: BigInteger
  minorCategory: BigInteger
  isEditable: boolean
  isEnabled: boolean
}
