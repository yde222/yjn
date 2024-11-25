import { ParameterizedIconProps } from '@pims-frontend/ui/components/ui/parameterized-icon'

// Response Types

export interface CreateWorkFlowResDto {
  workFlowUid: number
}

export interface DetailWorkFlowFlowResDto {
  workFlowFlowUid: number
  workFlowFlowName: string
  workFlowFlowDesc: string
  workFlowStartStepUid: number
  workFlowEndStepUid: number
  workFlowSteps: Step[]
}

export interface Step {
  workFlowStepUid: number
  workFlowStepName: string
  workFlowStepProgressRate: number
  workFlowStepCategoryIconValue: Partial<ParameterizedIconProps['name']>
}

export interface DetailWorkFlowResDto {
  steps: Step[]
  flows: Flow[]
}

export interface Step {
  workFlowStepUid: number
  workFlowStepName: string
  workFlowStepColor: string
  workFlowStepProgressRate: number
  uxiTypeValue: string
  uxiXcodeValue: number
  uxiYcodeValue: number
  isStartFlow: boolean
  workFlowStepCategory: WorkFlowStepCategory
}

export interface Flow {
  workFlowFlowUid: number
  workFlowFlowName: string
  workFlowStartStepUid: number
  workFlowEndStepUid: number
}

export interface WorkFlowStepListResDto {
  workFlowStepUid: number
  workFlowStepName: string
  workFlowStepColor: string
  workFlowStepCategoryIconValue: string
}

export interface DetailWorkFlowStepResDto {
  workFlowStepUid: number
  workFlowStepCategoryUid: number
  wfwStpCategoryList: WorkFlowStepCategoryListResDto[]
  workFlowStepName: string
  workFlowStepDesc: string
  workFlowStepColor: string
  workFlowStepProgressRate: number
}

export interface WorkFlowStepCategoryListResDto {
  workFlowStepCategoryUid: number
  workFlowStepCategoryName: string
  workFlowStepCategoryDesc: string
  workFlowStepCategoryIcon: Partial<ParameterizedIconProps['name']>
}

export type WorkFlowStepCategory = any // 실제 타입으로 대체해야 함
// 1. WorkFlowListResDto
export interface WorkFlowListResDto {
  pageInfos: PageInfo[]
}

// 2. PageInfo
export interface PageInfo {
  pageName: string
  menuPath: string
  pageInformationUid: number
  workFlows: WorkFlow[]
}

// 3. WorkFlow
export interface WorkFlow {
  workFlowUid: number
  workFlowName: string
  stepNameList: WorkFloStepNameList[]
  flowNameList: string[]
}

export interface WorkFloStepNameList {
  workFlowStepColor: string
  workFlowStepName: string
}

export interface ProjectUserListRes {
  projectUserUid: number
  userId: string
  userName: string
}

// assignColumns 인터페이스
interface AssignColumns {
  icon: string
  label: string
  value: string | number // value가 문자열 또는 숫자일 수 있음
}

// projectUsers 인터페이스
interface ProjectUser {
  // 사용자가 가지고 있을 필드들 정의
  userId: string
  userName: string
}

// projectAuthorityGroups 인터페이스
interface ProjectAuthorityGroup {
  // 권한 그룹의 필드들 정의
  groupId: string
  groupName: string
}

// flowSetupJson 인터페이스
interface FlowSetupJson {
  ruleLabel: string
  assignColumns: AssignColumns
  projectUsers: ProjectUser[]
  projectAuthorityGroups: ProjectAuthorityGroup[]
}

// 전체 데이터 구조 인터페이스
export interface FlowSetupResponse {
  flowSetupJson: FlowSetupJson
  ruleName: string | null
  workFlowSetupUid: number
}

// 워크플로 규칙 대상 컬럼 리스트 조회
