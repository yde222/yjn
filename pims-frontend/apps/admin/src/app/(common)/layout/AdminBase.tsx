'use client'

import { cn } from '@pims-frontend/ui/lib/utils'
import React from 'react'
import { AdminSidebar, SidebarProps } from './AdminSidebar'
import { ImperativePanelHandle } from '@pims-frontend/ui/components/ui/resizable/react-resizable-panels'
import { TooltipProvider } from '@pims-frontend/ui/components/ui/tooltip'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@pims-frontend/ui/components/ui/resizable'
import { RadixScrollArea } from '@pims-frontend/ui/components/ui/@radix-ui/react-scroll-area'
import { AdminTopbar, TopbarProps } from './AdminTopbar'

export type BaseProps = {
  baseProps?: {
    defaultCollapsed?: boolean
    defaultLayout?: number[]
    navCollapsedSize?: number
  }
  topbarProps?: TopbarProps
  sidebarProps?: SidebarProps
}

export function AdminBase({
  children,
  baseProps,
  sidebarProps,
  topbarProps,
}: React.PropsWithChildren<BaseProps>) {
  const {
    defaultLayout = [20, 80],
    defaultCollapsed = false,
    navCollapsedSize = 4,
  } = baseProps ?? {}
  const sidebarPanelRef = React.useRef<ImperativePanelHandle>(null)
  const [isCollapsed, setIsCollapsed] =
    React.useState<boolean>(defaultCollapsed)
  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout:base=${JSON.stringify(sizes)}`
        }}
        className="h-full max-h-screen items-stretch"
      >
        <ResizablePanel
          ref={sidebarPanelRef}
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
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
          <RadixScrollArea className="h-screen overflow-auto">
            <AdminSidebar
              {...sidebarProps}
              isCollapsed={isCollapsed}
              onCollapse={() => {
                sidebarPanelRef.current?.collapse()
                setIsCollapsed(true)
              }}
              onExpand={() => {
                sidebarPanelRef.current?.expand()
                setIsCollapsed(false)
              }}
            />
          </RadixScrollArea>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={80}>
          <AdminTopbar {...topbarProps} />
          {/** TODO: Use ref and update the pixel height */}
          <RadixScrollArea className="h-[calc(100dvh-89px)] overflow-auto">
            {children}
          </RadixScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}
