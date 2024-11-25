import { UserDetailResDto } from '../user/dto/response/UserDetailResDto'
import { useGetAllCodeDetailsQuery } from './controller/CodeController'

export type UserCompanyFromCodeProps = {
  companyCode: UserDetailResDto['companyCode']
}

export function UserCompanyFromCode(props: UserCompanyFromCodeProps) {
  const { data } = useGetAllCodeDetailsQuery(
    {
      codeGroupId: 'COMPANY_CD',
    },
    {
      selectFromResult: ({ data = [] }) => ({
        data,
      }),
    },
  )

  const companyName = data.find(
    item => item.codeUid.toString() === props.companyCode,
  )?.codeValue

  return <>{companyName}</>
}
