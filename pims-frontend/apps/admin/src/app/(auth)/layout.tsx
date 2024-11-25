'use client'

import { TooltipProvider } from '@pims-frontend/ui/components/ui/tooltip'
import { RadixScrollArea } from '@pims-frontend/ui/components/ui/@radix-ui/react-scroll-area'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@pims-frontend/ui/components/ui/resizable'
import { cn } from '@pims-frontend/ui/lib/utils'
import React, { useEffect } from 'react'
import LayoutSidebar from '@pims-frontend/ui/components/common/layout/LayoutSidebar'
import LayoutHeader from '@pims-frontend/ui/components/common/layout/LayoutHeader'
import useAdminLayout from '../(common)/_hooks/layout/useAdminLayout'
import { getCookie } from '@pims-frontend/apis/lib/features/util/CookieUtils'

const AdminLayout = ({ children }: React.PropsWithChildren) => {
  const {
    theme,
    router,
    userInfo,
    menuList,
    isCollapsed,
    LAYOUT_OPTION,
    languageOption,
    sidebarPanelRef,
    currentLanguage,
    getSysAuth,
    handleLogout,
    onChangeTheme,
    setIsCollapsed,
    setCookieLocale,
  } = useAdminLayout()

  // 롣그인 유무 확인
  useEffect(() => {
    const accessToken = getCookie('accessToken')
    if (!accessToken) {
      // router.push(`/ko`)
    }
  }, [router])

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout:base=${JSON.stringify(sizes)}`
        }}
        className="h-full max-h-screen items-stretch"
      >
        {/* 사이드바 영역 */}
        <ResizablePanel
          ref={sidebarPanelRef}
          defaultSize={LAYOUT_OPTION.defaultLayout[0]}
          collapsedSize={LAYOUT_OPTION.navCollapsedSize}
          collapsible={true}
          minSize={10}
          maxSize={20}
          onCollapse={() => {
            setIsCollapsed(true)
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              true,
            )}`
          }}
          onResize={() => {
            setIsCollapsed(false)
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              false,
            )}`
          }}
          className={cn(
            isCollapsed &&
              'min-w-[50px] transition-all duration-300 ease-in-out',
          )}
        >
          {/* 사이드바 */}
          <RadixScrollArea className="h-screen overflow-auto">
            {React.useMemo(() => {
              return (
                <LayoutSidebar
                  type={'admin'}
                  title={'newPiMS Admin'}
                  isCollapsed={isCollapsed}
                  data={menuList}
                  onClickTitle={() => router.push('/')}
                  onClickSidebarOpen={open => {
                    if (open) {
                      sidebarPanelRef.current?.expand()
                      setIsCollapsed(false)
                    } else {
                      sidebarPanelRef.current?.collapse()
                      setIsCollapsed(true)
                    }
                  }}
                />
              )
              // eslint-disable-next-line react-hooks/exhaustive-deps
            }, [isCollapsed, menuList, sidebarPanelRef])}
          </RadixScrollArea>
        </ResizablePanel>
        {/* 사이드바 크기 수정 영역 */}
        <ResizableHandle />
        {/* 화면 오른쪽 영역 */}
        <ResizablePanel
          defaultSize={LAYOUT_OPTION.defaultLayout[1]}
          minSize={80}
        >
          {/* 페이지 공통 header */}
          <header className="flex items-center justify-between w-full p-4 border-b border-b-border-normal h-17">
            <LayoutHeader
              theme={theme}
              useAlarm={false}
              useUserInfo={false}
              useLanguage={false}
              userName={userInfo?.userName || ''}
              sysAuth={getSysAuth(userInfo?.authorityCode || 0)}
              languageOption={languageOption || []}
              currentLanguage={currentLanguage}
              onChangeTheme={theme => onChangeTheme(theme)}
              onClickLogout={handleLogout}
              onChangeLanguage={language => setCookieLocale(language)}
            />
          </header>
          {/* 페이시 화면 영역 */}
          <RadixScrollArea className="h-[calc(100dvh-64px)] overflow-auto">
            {children}
          </RadixScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}

export default AdminLayout
