export type AnalyzeResDto = {
  id: string
  pjtUid: string
  progressingDetailUid: number
  processingDetailId: string
  processingDetailName: string
  businessAreaDetailDivisionCode: number
  processingDetailTypeCode: number
  subProjectUid: number
  totalElements: number
  totalPages: number
  size: number
  number: number
}

export type AnalyzePageInfoResDto = {
  processingDetailId: string
  responsibleRId1: string
  processingDetailName: string
  progressStatusCode1: string
  businessAreaDetailDivisionCode: string
  planStartDate1: string
  processingDetailTypeCode: string
  planEndDate1: string
  functionName: string
  realStartDate1: string
  detailFunctionName: string
  realEndDate1: string
  derivationTypeCode: string
  responsibleContents1: string
  difficultyDivisionCode: string
  attachFileGroupUid1: string
  importanceCode: string
  approvalStatusCode1: string
  registerTypeDivisionCode: string
  approvalOpinionContents1: string
  subProjectUid: number
  businessResponsibleRegisterSortNumber1: string
  captureFileGroupUid1: string
  businessAreaUid1: string
  accessorKey: string
  data: any
  totalElements: number
  totalPages: number
  size: number
  number: number
  responsible:{
    progressStatusCode1:string      
    responsibleRId1:string      
    planEndDate1:string      
    responsibleContents1:string      
  }
  
}


/* 타입재정의 */

export type PageInfo = {
  pageInformationUid: number;
  projectUid: number;
  businessAreaDetailDivisionValue: string;
  menuDescription: string;
  menuUid: number;
  lastSaveStep: number;
}[]

export type Form = {
  uid: number |undefined;
  formLabel: string;
  name: string;
  type: string;
  dataTypeValue: string;
  inputTypeValue: string | null;
  inputDetailOptionValue: string | null;
  isReadOnly: boolean | null;
  isRequired: boolean;
  itemArea: string | null;
  dataLength: number;
  placeholder: string | null;
  propertiesDivisionValue: string;
  sortNo: number;
}[]

export type DetailPageInfoResDto = {
  uid: number |undefined;
  formLabel: string;
  name: string | null;
  type: string;
  dataTypeValue: string;
  inputTypeValue: string | null;
  inputDetailOptionValue: string | null;
  itemArea: number |undefined;
  propertiesDivisionValue: string;
  sortNo: number |undefined;
  color:string | null;
}

export type Filter = {
  uid: number;
  label: string;
  name: string;
  type: string;
  dataTypeValue: string;
  inputTypeValue: string | null;
  inputDetailOptionValue: string | null;
  sortNo: number;
}[]

export type Grid = {
  uid: number;
  header: string;
  accessorKey: string;
  type: string;
  dataTypeValue: string;
  inputTypeValue: string | null;
  inputDetailOptionValue: string | null;
  hintText: string | null;
  isLeftCol: boolean | null;
  sortNo: number;
}[]

export type SubProject = {
  subProjectUid: number;
  subProjectName: string;
}[]

export type PageSetupUseCode = {
  id: number;
  codeValue: string;
  codeColor: string;
}[]

export type PageSetupUseCodes = {
  [key: string]: PageSetupUseCode[];
}[]

export type AnalyzeListResDto2 = {
  code: number;
  data: {
    pageInfo: PageInfo;
    form: Form[];
    details: DetailPageInfoResDto;
    filters: Filter[];
    searches: string[];
    grids: Grid;
    subprojects: SubProject[];
    pageSetupUseCodes: PageSetupUseCodes;
  };
  message: string | null;
  pagination: unknown | null;  // Specify the type if needed
  timestamp: string;
}[]