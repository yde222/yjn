import { Metadata } from 'next'
import UserWrapper from './_components/UserWrapper'
import { PageHeader } from '@pims-frontend/admin/app/(common)/layout/PageHeader'

export const metadata = {
  title: '사용자관리', // NOTE: 기획 변경 가능성 있음
  description:
    '사용자 조회 및 권한 설정을 수행하고, 접속 및 사용 현황을 모니터링합니다.',
} satisfies Metadata

export default async function UserPage() {
  return (
    <main className="h-full flex gap-9 p-9 flex-col">
      {/* NavBar 컴퍼넌트로 공통 빼기 */}
      <PageHeader name={metadata.title} desc={metadata.description} />
      <div className="gap-3">
        <UserWrapper />
      </div>
    </main>
  )
}
