import {
  Middleware,
  MiddlewareAPI,
  isRejectedWithValue,
} from '@reduxjs/toolkit'
import { errorActions } from '../errorSlice'
interface RejectedActionPayload {
  status: number
  data: {
    code: string
    data: string
  }
}

interface ActionPayload {
  data: {
    code: number
    data: null
    message: string
    pagination: null
    timestamp: string
  }
  status: number
}

export const rtkErrorLogger: Middleware =
  (api: MiddlewareAPI) => next => action => {
    if (isRejectedWithValue(action)) {
      const payload = action.payload as ActionPayload
      if (window !== undefined && payload) {
        if (payload.status === 404) {
        }
        if (payload.status === 401) {
          api.dispatch(
            errorActions.setError({
              errorCode: payload.status,
              errorMessage: '로그인 인증 오류입니다.',
            }),
          )
        }
        if (payload.status === 500) {
          api.dispatch(
            errorActions.setError({
              errorCode: payload.data.code,
              errorMessage: payload.data.message,
            }),
          )
        }
      }
    }
    return next(action)
  }
