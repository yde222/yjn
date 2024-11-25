import { PageHeader } from '@pims-frontend/admin/app/(common)/layout/PageHeader'
import { type Metadata } from 'next'
import CodeWrapper from './_components/CodeWrapper'

const metadata = {
  title: '코드관리',
  description: '코드관리 페이지입니다.',
} satisfies Metadata

const CodePage = async () => {
  return (
    <main className="h-full flex gap-9 p-9 flex-col">
      <PageHeader name={metadata.title} desc={metadata.description} />
      <div className="gap-3">
        <CodeWrapper />
      </div>
    </main>
  )
}

export default CodePage
