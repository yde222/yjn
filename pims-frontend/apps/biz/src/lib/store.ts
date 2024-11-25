import { configureStore, type ConfigureStoreOptions } from '@reduxjs/toolkit'
import layoutReducer from './features/layout/layoutSlice'
import appApi from '@pims-frontend/apis/lib/appApi'
import projectReducer from './features/project/projectSlice'
import rowSelectionReducer from './features/project/rowSelectionSlice'
import userModalReducer from '../app/[locale]/(auth)/basic-info/user-management/_query/user-management/deleteUserSlice'
import userMgtReducer from '../app/[locale]/(auth)/basic-info/user-management/_query/userMgtSlice'
import assignDialogReducer from '../app/[locale]/(auth)/basic-info/user-management/_query/user-management/assignSubpjtSlice'
import basicInfoReducer from './features/project/basicInfoSlice'
import scheduleReducer from './features/schedule/scheduleSlice'
import pageCogReducer from '../app/[locale]/(common)/page-config/_query/pageCogSlice'
import workFlowReducer from '../app/[locale]/(auth)/basic-info/workflow-management/_query/workflowSlice'
import adminApi from '@pims-frontend/apis/lib/adminApi'
import loginReducer from '../app/[locale]/login/_query/loginSlice'
import userInfoReducer from '../app/[locale]/login/_query/userInfoSlice'
import analyzeReducer from '../app/[locale]/(auth)/process-management/analyze/[id]/_query/analyzeSlice'
import { rtkErrorLogger } from './middlewares/rtkErrorLogger'
import errorReducer from './errorSlice'
import taskViewReducer from '../app/[locale]/(auth)/schedule-management/view/_query/taskViewSlice'
import workReducer from '../app/[locale]/(auth)/process-management/work/[id]/_query/workSlice'
import testingEnvSetupReducer from '../app/[locale]/(auth)/process-management/testing/env-setup/_query/testingEnvSetupSlice'
import authorityReducer from '../app/[locale]/(auth)/basic-info/user-authority-management/_query/authoritySlice'
import testingPlanReducer from '../app/[locale]/(auth)/process-management/testing/plan/[id]/_query/testingPlanSlice'
import boardPageCogReducer from '../app/[locale]/(auth)/communication-management/buildetin-board-management/_query/boardSetupSlice'
import testingPerformReducer from '../app/[locale]/(auth)/process-management/testing/perform/[id]/_query/testingPerformSlice'
import actionitemReducer from '../app/[locale]/(auth)/risk-management/actionitem/[id]/_query/actionitemSlice'
import issueReducer from '../app/[locale]/(auth)/risk-management/issue/[id]/_query/issueSlice'
import riskReducer from '../app/[locale]/(auth)/risk-management/risk/[id]/_query/riskSlice'
import systemdesignReducer from '../app/[locale]/(auth)/process-management/systemdesign/[id]/_query/systemdesignSlice'
import developReducer from '../app/[locale]/(auth)/process-management/develop/[id]/_query/developSlice'
// import { rtkErrorLogger } from './middlewares/rtkErrorLogger';
// import errorReducer from './errorSlice';

export const makeStore = (
  options?: ConfigureStoreOptions['preloadedState'] | undefined,
) => {
  return configureStore({
    reducer: {
      [appApi.reducerPath]: appApi.reducer,
      [adminApi.reducerPath]: adminApi.reducer,
      layout: layoutReducer,
      project: projectReducer,
      rowSelection: rowSelectionReducer,
      deleteModal: userModalReducer,
      userMgt: userMgtReducer,
      assignSubpjtModal: assignDialogReducer,
      basicInfo: basicInfoReducer,
      schedule: scheduleReducer,
      workFlow: workFlowReducer,
      pageCog: pageCogReducer,
      login: loginReducer,
      userInfo: userInfoReducer,
      analyze: analyzeReducer,
      error: errorReducer,
      taskView: taskViewReducer,
      work: workReducer,
      testingEnvSetup: testingEnvSetupReducer,
      authority: authorityReducer,
      testingPlan: testingPlanReducer,
      boardPageCog: boardPageCogReducer,
      testingPerform: testingPerformReducer,
      actionitem: actionitemReducer,
      issue: issueReducer,
      risk: riskReducer,
      systemdesign: systemdesignReducer,
      develop: developReducer,
    },
    middleware: getDefaultMiddleware => [
      ...getDefaultMiddleware().concat(
        appApi.middleware,
        adminApi.middleware,
        rtkErrorLogger,
      ),
      //appApi.middleware,
    ],
    ...options,
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
