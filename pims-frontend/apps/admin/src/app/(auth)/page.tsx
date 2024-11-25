import { Button } from '@pims-frontend/ui/components/ui/button';

export default function Home() {
  return (
    <main>
      <div className="w-full h-full box-border px-8 py-9">
        <h1>사용자 관리/설정</h1>
        <p className="mb-10">
          사용자 등록 및 수정, 권한 변경 및 그룹 설정, 자원 배정을 할 수
          있습니다
        </p>
        <Button>Admin Button</Button>
      </div>
    </main>
  );
}
