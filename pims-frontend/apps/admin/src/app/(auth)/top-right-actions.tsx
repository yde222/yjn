'use client'

import { Button } from '@pims-frontend/ui/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@pims-frontend/ui/components/ui/dropdown-menu'
import { InputIcon } from '@pims-frontend/ui/components/ui/input-icon'
import { ParameterizedIcon } from '@pims-frontend/ui/components/ui/parameterized-icon'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@pims-frontend/ui/components/ui/select'
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@pims-frontend/ui/components/ui/tabs'
import { useTheme } from 'next-themes'

import { useGetEnableUseLanguageQuery } from '@pims-frontend/apis/lib/features/common/menu/controller/MenuController'
import {
  getCookie,
  setCookie,
} from '@pims-frontend/apis/lib/features/util/CookieUtils'

export function TopRightActions() {
  const { theme, setTheme } = useTheme()
  const { data: languageData } = useGetEnableUseLanguageQuery({ keyword: '' })

  const setCookieLocale = (value: string) => {
    setCookie('locale', value, 1, '/', window.location.hostname, true)
  }

  return (
    <div className="flex justify-between">
      <InputIcon
        className="w-[240px]"
        startIcon="Search"
        placeholder="메뉴 또는 화면명 검색"
      />
      <div className="flex gap-4 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center font-semibold">
              이효정 (멤버)
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-60">
            <DropdownMenuItem className="gap-2 h-11 cursor-pointer">
              <ParameterizedIcon name="User" size={20} />
              <span>개인정보</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 h-11 cursor-pointer">
              <ParameterizedIcon name="Bell" size={20} />
              <span>알림설정</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 h-11 cursor-pointer">
              <ParameterizedIcon name="LogOut" size={20} />
              <span>로그아웃</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex justify-between"
              variant={'noHover'}
            >
              <div className="flex items-center gap-2">
                <ParameterizedIcon name="Languages" size={20} />
                <span>언어설정</span>
              </div>
              <Select
                defaultValue={getCookie('locale') as string}
                onValueChange={value => setCookieLocale(value)}
              >
                <SelectTrigger className="w-24 h-8">
                  <SelectValue placeholder="언어를 선택하세요.." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {/* <SelectItem value="korean">Korean</SelectItem>
                    <SelectItem value="english">English</SelectItem> */}
                    {languageData &&
                      languageData.map(lang => (
                        <SelectItem key={lang.locale} value={lang.locale}>
                          {lang.languageName}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex justify-between h-11"
              variant={'noHover'}
            >
              <div className="flex items-center gap-2">
                <ParameterizedIcon name="Sun" size={20} />
                <span>테마설정</span>
              </div>
              <Tabs
                value={theme}
                className="w-24"
                onClick={e => e.stopPropagation()}
                onValueChange={e => setTheme(e)}
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="light">Light</TabsTrigger>
                  <TabsTrigger value="dark">Dark</TabsTrigger>
                </TabsList>
              </Tabs>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="ghost" className={'py-0 px-2'}>
          <ParameterizedIcon name="UserPen" className="text-gray-500" />
        </Button>
        <Button variant="ghost" className={'py-0 px-2'}>
          <ParameterizedIcon name="Bell" className="text-gray-500" />
        </Button>
        <Button variant="ghost" className={'py-0 px-2'}>
          <ParameterizedIcon name="CircleHelp" className="text-gray-500" />
        </Button>
      </div>
    </div>
  )
}
