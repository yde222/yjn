// pims-common/src/main/java/com/skcc/pims/common/menu/dto/response/MenuResDto.java
export type MenuResDto = {
  menuUid: number
  parentMenuUid: number
  menuType: string
  menuLevel: number
  menuName: string
  menuUrl: string
  menuIcon: string
  menuOrder: number
  isEnabled: boolean
  menuTranslations: MenuTranslationData[]
  isEditable: boolean
  isCopyable: boolean
  children: MenuResDto[]
}

export type MenuTranslationData = {
  locale: string
  menuName: string
}
