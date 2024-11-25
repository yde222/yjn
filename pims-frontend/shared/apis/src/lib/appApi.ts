import {
  createApi,
  fetchBaseQuery,
  // RootState,
} from '@reduxjs/toolkit/query/react'
import { getCookie } from './features/util/CookieUtils'

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_PROJECT_URL,
  // TODO: 나중에 아래 주석 해제하여 사용
  prepareHeaders: (headers, { getState }) => {
    // const token = (getState() as RootState).auth.token
    const locale = getCookie('locale')
    const token = getCookie('accessToken')
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    if (locale) {
      headers.set('Accept-language', locale as string)
    }
    return headers
  },
})

const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: baseQuery,
  endpoints: builder => ({}),
})

function bearerAuth(token: string | undefined) {
  return `Bearer ${token} `
}

export default appApi
