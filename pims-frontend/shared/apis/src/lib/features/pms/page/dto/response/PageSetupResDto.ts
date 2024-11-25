export type PageInfoResDto = {
  pageInformationUid: number
  projectUid: number
  businessAreaDetailDivisionCode: string
  menuDescription: string
  menuUid: number
}

export type PagePropertiesResDto = {
  propertiesUid: number
  propertiesDivisionValue: string
  columnName: string
  uxiPropertiesName: string
  uxiPropertiesEnglishName: string
  propertiesTypeCode: string
  propertiesTypeOptionCode: string
  propertiesTypeOptionDataContents: string
  propertiesDataFormatCode: string
  propertiesDataLength: number
  propertiesDescription: string
  isUse: boolean
  isDeleted: boolean
  dataFilterConditionCode: string
  dataFilterConditionValue: string
  isDataFilter: boolean
  pageInformationUid: number
  uxiSubJsb: undefined
  isNullable: boolean
  children: PagePropertiesResDto[]
}

type optType = {
  key: string
  label: string
}

export type pageSetupUseTypes = {
  propertiesColumnDetailOption: Record<string, optType[]>
  propertiesDataType: Record<string, string>
  uxiInputDetailOption: Record<string, optType[]>
  uxiInputType: Record<string, optType[]>
}

export type PageSetupResDto = {
  pageInfo: PageInfoResDto
  pageSetupUseTypes: pageSetupUseTypes
  properties: PagePropertiesResDto[]
  responsible: PagePropertiesResDto[]
}
