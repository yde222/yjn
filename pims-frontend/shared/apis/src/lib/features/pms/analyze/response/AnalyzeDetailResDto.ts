export type AnalyzeDetailResDto = {
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
  TRow: any
  progressingDetailUid: number
  responsible: {
    planEndDate1: string
    progressStatusCode1: string
    responsibleContents1: string
    responsibleRId1: string
  }
}

type TRow = AnalyzeDetailResDto
