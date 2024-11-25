import { PageHeader } from '@pims-frontend/admin/app/(common)/layout/PageHeader'
import { Metadata } from 'next'
import ProjectWrapper from './_components/ProjectWrapper'

const metadata = {
  title: '프로젝트 관리',
  description:
    '프로젝트 조회 및 템플릿 설정을 수행하고, 참여자 현황을 모니터링 합니다.',
} satisfies Metadata

export default async function ProjectPage() {
  return (
    <main className="h-full flex gap-9 p-9 flex-col">
      <PageHeader name={metadata.title} desc={metadata.description} />
      <div className="gap-3">
        <ProjectWrapper />
      </div>
    </main>
  )
}
