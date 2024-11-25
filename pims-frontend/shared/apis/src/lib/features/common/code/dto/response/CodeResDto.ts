// pims-common/src/main/java/com/skcc/pims/common/code/dto/response/CodeResDto.java
export type CodeResDto = {
  codeGroupUid: number
  codeUid: number
  codeTranslations: CodeTranslationData[]
  codeValue: string
  codeReferenceValue: string
  isEditable: boolean
  isEnabled: boolean
  codeColor: ColorEnum
}

export type CodeTranslationData = {
  locale: string
  codeName: string
}

export type ColorEnum =
  | 'DEFAULT'
  | 'CRIMSON'
  | 'AMBER'
  | 'BLUE'
  | 'LIME'
  | 'ORANGE'
  | 'SAND'
  | 'TEAL'
  | 'VIOLET'
  | 'GREEN'
  | 'RED'
  | 'YELLOW'
  | 'PRIMARY'
