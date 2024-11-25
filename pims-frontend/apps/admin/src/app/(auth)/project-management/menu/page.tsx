import { PageHeader } from '@pims-frontend/admin/app/(common)/layout/PageHeader'
import { type Metadata } from 'next'
import { GlobalMenuSheet } from './_components/globalMenuSheet'
import ClientMenuPage from './_components/ClientMenuPage'

const metadata = {
  title: '메뉴 및 화면 관리',
  description: '메뉴를 관리합니다.',
} satisfies Metadata

const MenuPage = async () => {
  return (
    <main className="h-full flex gap-9 p-9 flex-col">
      <PageHeader name={metadata.title} desc={metadata.description} />
      <div className="px-3 py-10">
        <ClientMenuPage />
      </div>
    </main>
  )
}

export default MenuPage
