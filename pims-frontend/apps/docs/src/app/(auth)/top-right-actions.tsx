'use client';

import { Button } from '@pims-frontend/ui/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@pims-frontend/ui/components/ui/dropdown-menu';
import { BellIcon, StarIcon, UserIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

export function TopRightActions() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex items-center space-x-4">
      <Button variant="ghost" className={'py-0 px-2'}>
        <BellIcon />
      </Button>
      <Button variant="ghost" className={'py-0 px-2'}>
        <StarIcon />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="py-0 px-2">
            <UserIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme('light')}>
            라이트 모드
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('dark')}>
            다크 모드
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('system')}>
            시스템
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button variant="outline" className={'py-0 px-4'}>
        한국어
      </Button>
    </div>
  );
}
