// pims-common/src/main/java/com/skcc/pims/common/menu/dto/request/MenuUpdateReqDto.java

export type MenuUpdateReqDto = {
  menuUid: number
  projectUid: number
  parentMenuUid: number
  menuName: string
  menuTranslations: {
    locale: string
    menuName: string
  }[]
  menuUrl: string
  menuIcon: string
  menuType: string
  menuLevel: number
  menuOrder: number
  isEditable: boolean
  isEnabled: boolean
  isCopyable: boolean
}
