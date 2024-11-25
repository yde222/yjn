// pims-common/src/main/java/com/skcc/pims/common/code/dto/request/CodeGroupReqDto.java
export type CodeGroupReqDto = {
  codeGroupUid: number
  codeGroupName: string
  codeGroupDescription: string
  majorCategory: BigInteger
  middleCategory: BigInteger
  minorCategory: BigInteger
  isEditable: boolean
  isEnabled: boolean
  projectUid: number
  codeGroupReferenceValue: string
}
