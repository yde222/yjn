import { Base } from '@pims-frontend/ui/components/layouts/base';
import { Button } from '@pims-frontend/ui/components/ui/button';
import Link from 'next/link';
import { TopRightActions } from './top-right-actions';

export default function InsideLayout(props: React.PropsWithChildren) {
  return (
    <Base
      sidebarProps={{
        leftTop: (
          <Button asChild variant={'ghost'}>
            <Link href="/">PiMS 데모</Link>
          </Button>
        ),
        links: [
          {
            href: '/',
            icon: {
              type: 'lucide',
              iconName: 'layout-dashboard',
            },
            title: '대시보드',
          },
          {
            href: '/my-work',
            icon: {
              type: 'lucide',
              iconName: 'file',
            },
            title: '내작업',
          },
          {
            href: '/schedule',
            icon: {
              type: 'lucide',
              iconName: 'calendar',
            },
            title: '일정 관리',
          },
          {
            href: '/process',
            icon: {
              type: 'lucide',
              iconName: 'chart-pie',
            },
            title: '공정상세 관리',
          },
          {
            href: '/quality',
            icon: {
              type: 'lucide',
              iconName: 'eye',
            },
            title: '품질 관리',
          },
          {
            href: '/productivity',
            icon: {
              type: 'lucide',
              iconName: 'chart-bar',
            },
            title: '생산성 관리',
          },
          {
            href: '/risk',
            icon: {
              type: 'lucide',
              iconName: 'message-circle-question',
            },
            title: '위험 관리',
          },
          {
            href: '/communication',
            icon: {
              type: 'lucide',
              iconName: 'megaphone',
            },
            title: '의사소통 관리',
          },
        ],
        additionalLinks: [
          {
            href: '/project',
            icon: {
              type: 'lucide',
              iconName: 'code-xml',
            },
            title: 'CRUD 예제',
          },
          {
            href: '/reactflow',
            icon: {
              type: 'lucide',
              iconName: 'workflow',
            },
            title: '리액트 플로우 예제',
          },
          {
            href: '/simple-grid',
            icon: {
              type: 'lucide',
              iconName: 'grid-3x3',
            },
            title: '간단한 그리드 예제',
          },
          {
            href: '/complex-grid-1',
            icon: {
              type: 'lucide',
              iconName: 'grid-2x2',
            },
            title: '복잡한 그리드 예제 1',
          },
          {
            href: '/complex-grid-2',
            icon: {
              type: 'lucide',
              iconName: 'grid-2x2-check',
            },
            title: '복잡한 그리드 예제 2',
          },
          {
            href: '/drawio',
            icon: {
              type: 'lucide',
              iconName: 'paintbrush',
            },
            title: 'DrawIO 예제',
          },
        ],
      }}
      topbarProps={{
        children: <TopRightActions />,
      }}
    >
      {props.children}
    </Base>
  );
}
