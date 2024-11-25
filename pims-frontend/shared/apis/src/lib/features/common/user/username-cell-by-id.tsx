'use client'

import { useGetUserInfoQuery } from './controller/UserController'

export function UsernameCellById(props: { userId: string }) {
  const { data: user } = useGetUserInfoQuery({
    userId: props.userId,
  })

  return <span>{user?.userName || props.userId}</span>
}
