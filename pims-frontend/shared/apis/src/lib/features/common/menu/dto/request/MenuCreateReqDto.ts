export type MenuCreateReqDto = {
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
