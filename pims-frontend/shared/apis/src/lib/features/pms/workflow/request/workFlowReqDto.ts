import { ParameterizedIconProps } from '@pims-frontend/ui/components/ui/parameterized-icon'

// 1. CreateFlowChartReqDto
export interface CreateFlowChartReqDto {
  pgeIfmUid: number
  wfwUid: number
  wfwNm: string
  steps: Step[]
  flows: Flow[]
}

export interface Step {
  wfwStpCatUid: number
  wfwStpNm: string
  wfwStpDesc: string
  wfwStpClrVal: string
  wfwStpHwyRat: number
  uxiTypVar: string
  uxiXcdVar: number
  uxiYcdVar: number
  staFlwYn: boolean
  wfwStpCode: string
}

export interface Flow {
  wfwFlwNm: string
  wfwFlwDesc: string
  wfwFlwClrVal: string
  uxiTypVar: string
  wfwStaStpCode: string
  wfwEndStpCode: string
}

// 2. CreateWorkFlowFlowReqDto
export interface CreateWorkFlowFlowReqDto {
  workFlowUid: number
  workFlowFlowName: string
  workFlowFlowDesc: string
  // uxiTypeValue: string
  workFlowStartStepUid: number
  workFlowEndStepUid: number
}

//  CreateWorkFlowFlowReqDto
export interface UpdateWorkFlowFlowReqDto {
  workFlowFlowUid: number
  workFlowFlowName: string
  workFlowFlowDesc: string
  // uxiTypeValue: string
  workFlowStartStepUid: number
  workFlowEndStepUid: number
}

// 3. CreateWorkFlowReqDto
export interface CreateWorkFlowReqDto {
  pageInfoUid: number
  workFlowName: string
}

// 4. CreateWorkFlowStepCategoryReqDto
export interface CreateWorkFlowStepCategoryReqDto {
  workFlowUid: number
  workFlowStepCategoryName: string
  workFlowStepCategoryDesc: string
  workFlowStepCategoryIcon: string
}

// 5. CreateWorkFlowStepReqDto
export interface CreateWorkFlowStepReqDto {
  workFlowUid: number
  workFlowStepCategoryUid: number
  workFlowStepName: string
  workFlowStepDesc: string
  workFlowStepColor: string
  workFlowStepProgressRate: number
  uxiTypeValue: string
  uxiXcodeValue: number
  uxiYcodeValue: number
  isStartFlow: boolean
  isAny: boolean
}

// 6. UpdateWorkFlowFlowReqDto
export interface UpdateWorkFlowFlowReqDto {
  workFlowFlowUid: number
  workFlowFlowName: string
  workFlowFlowDesc: string
  workFlowFlowColor: string
  uxiTypeValue: string
  workFlowStartStepUid: number
  workFlowEndStepUid: number
}

// 7. UpdateWorkFlowStepCategoryReqDto
export interface UpdateWorkFlowStepCategoryReqDto {
  workFlowStepCategoryUid?: number
  workFlowStepCategoryName: string
  workFlowStepCategoryDesc: string
  workFlowStepCategoryIcon: string
}

// 8. UpdateWorkFlowStepLocationReqDto
export interface UpdateWorkFlowStepLocationReqDto {
  workFlowStepUid: number
  uxiXcodeValue: number
  uxiYcodeValue: number
}

// 9. UpdateWorkFlowStepReqDto
export interface UpdateWorkFlowStepReqDto {
  workFlowStepUid: number
  workFlowStepCategoryUid: number
  workFlowStepName: string
  workFlowStepDesc: string
  workFlowStepColor: string
  workFlowStepProgressRate: number
}

export interface UpdateWorkFlowStepMoveReqDto {
  workFlowStepUid: number
  uxiXcodeValue: number
  uxiYcodeValue: number
}

// 10. WorkFlowReqDto
export namespace WorkFlowReqDto {
  export interface CreateWorkFlow {
    workFlowName: string
    pageInfoUid: number
  }

  export interface MoveWorkFlow {
    workFlowUid: number
    pageInfoUid: number
  }
}

export interface WorkFlowTapDto {
  menuUid: number
  pageInformationUid: number
  workFlowUid: number
  projectUid: number
}

export interface ProjectUserListReq {
  pjtUid: number
}

export interface FlowRuleCreateReq {
  workFlowFlowUid: number
  flowSetupDivisionCode: number
  flowSetupJson: StepTransRule[]
}

export interface StepTransRule {
  ruleLabel: string
  assignColumns: assignColumnsType
  projectUsers: StepRule[]
  projectAuthorityGroups: StepRule[]
}

export interface assignColumnsType {
  icon: string
  label: string
  value: string
}
export interface StepRule {
  projectUserUid: number
  userId: string
}

// 워크플로 규칙 대상 컬럼 리스트 조회
export interface WorkFlowRuleColumnList {
  uxiPropertiesName: string
  propertiesDataTypeValue: string
  propertiesUid: number
}
