'use client'

import { Button } from '@pims-frontend/ui/components/ui/button'
import { DynamicIcon } from '@pims-frontend/ui/components/ui/dynamic-icon'
import {
  IconLibraryConsumer,
  IconLibraryConsumerProps,
} from '@pims-frontend/ui/components/ui/icon-library-consumer'
import { ParameterizedIcon } from '@pims-frontend/ui/components/ui/parameterized-icon'
import { Separator } from '@pims-frontend/ui/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@pims-frontend/ui/components/ui/tooltip'
import { cn } from '@pims-frontend/ui/lib/utils'
import Link from 'next/link'
import { useSelectedLayoutSegments } from 'next/navigation'
import React from 'react'

import {
  useGetAdminLeftMenusQuery,
  useGetAllGlobalMenusQuery,
} from '@pims-frontend/apis/lib/features/common/menu/controller/MenuController'

export type LinkNode = {
  title: string
  label?: string
  icon?: IconLibraryConsumerProps
  href: string
  isCopyable?: boolean
  routeMatchMode?: 'partial' | 'exact'
  children?: LinkNode[]
  isCollapsed?: boolean
  depth?: number
}

export type SidebarProps = Pick<
  React.HTMLAttributes<HTMLDivElement>,
  'className'
> & {
  isAdminChannel?: boolean
  leftTop?: React.ReactNode
  isCollapsed?: boolean
  onCollapse?: () => void
  onExpand?: () => void
  links?: LinkNode[]
  projectSwitcher?: React.ReactNode
}

function transformMenuData(menuData) {
  return menuData.map(menu => ({
    title: menu.menuName,
    href: menu.menuUrl, // 임시 처리 주소에 admin 두번 입력됨
    icon: menu.menuIcon
      ? { type: 'lucide', iconName: menu.menuIcon }
      : undefined,
    children: menu.children ? transformMenuData(menu.children) : [],
    isCollapsed: true,
    isCopyable: menu.isCopyable,
    depth: 0,
  }))
}

function CollapsableLink(props: LinkNode) {
  const { depth = 0 } = props
  const hasChildren = (props.children?.length || 0) > 0
  const [isExpanded, setIsExpanded] = React.useState(false) // 하위 메뉴 상태 관리 추가
  const segments = useSelectedLayoutSegments()
  const isActive = React.useMemo(() => {
    if (props.routeMatchMode === 'exact') {
      return '/' + segments.join('/') === props.href
    }

    // default : partial
    return ('/' + segments.join('/')).startsWith(props.href)
  }, [props.routeMatchMode, segments, props.href])

  const renderPlusIcon = () => {
    return props.isCopyable ? (
      <span className="text-green-500" onClick={() => alert('메뉴 생성')}>
        +
      </span>
    ) : null
  }

  if (props.isCollapsed) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild className="w-full justify-start gap-2">
          <Button asChild variant={isActive ? 'juyoung' : 'ghostjuyoung'}>
            <Link href={props.href}>
              {props.icon?.type === 'lucide' && (
                <IconLibraryConsumer {...props.icon} />
              )}
              <span className="sr-only">{props.title}</span>
              {renderPlusIcon()} {/* Render the + icon if isCopyable is true */}
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" className="flex items-center gap-4">
          {props.title}
          {props.label && (
            <span className="ml-auto text-muted-foreground">{props.label}</span>
          )}
        </TooltipContent>
      </Tooltip>
    )
  }

  if (hasChildren) {
    return (
      <>
        <Button
          variant={isActive ? 'juyoung' : 'ghostjuyoung'}
          className="w-full justify-between gap-2"
          style={{
            paddingLeft: `${depth * 36 + 12}px`,
          }}
          onClick={() => setIsExpanded(prev => !prev)}
        >
          <div className="flex flex-row gap-2 items-center">
            {depth > 0 && !hasChildren && <div className="w-6 h-6" />}
            {depth > 0 &&
              (isExpanded ? (
                <ParameterizedIcon name="ChevronDown" />
              ) : (
                <ParameterizedIcon name="ChevronRight" />
              ))}
            {props.icon?.type === 'lucide' && (
              <IconLibraryConsumer {...props.icon} />
            )}
            {props.title}
            {renderPlusIcon()} {/* Render the + icon if isCopyable is true */}
            {props.label && (
              <span
                className={cn(
                  'ml-auto',
                  isActive && 'text-background dark:text-white',
                )}
              >
                {props.label}
              </span>
            )}
          </div>
        </Button>
        {isExpanded &&
          props.children?.map((child, index) => (
            <CollapsableLink
              key={`${child.href}-${index}`}
              {...child}
              depth={depth + 1}
              isCollapsed={props.isCollapsed}
            />
          ))}
      </>
    )
  }

  return (
    <Button
      asChild
      variant={isActive ? 'juyoung' : 'ghostjuyoung'}
      className="w-full justify-start gap-2"
      style={{
        paddingLeft: `${depth * 36 + 12}px`,
      }}
    >
      <Link className="flex items-center gap-2" href={props.href}>
        {depth > 0 && <div className="w-6 h-6" />}
        {props.icon?.type === 'lucide' && (
          <IconLibraryConsumer {...props.icon} />
        )}
        {props.title}
        {renderPlusIcon()} {/* Render the + icon if isCopyable is true */}
        {props.label && (
          <span
            className={cn(
              'ml-auto',
              isActive && 'text-background dark:text-white',
            )}
          >
            {props.label}
          </span>
        )}
      </Link>
    </Button>
  )
}

export function AdminSidebar(props: SidebarProps) {
  const { links = [], isCollapsed = false } = props

  const { data = [] } = useGetAdminLeftMenusQuery({ menuType: 'ADMIN' })
  const transformedLinks = React.useMemo(() => transformMenuData(data), [data])

  return (
    <div className={props.className}>
      <div className="space-y-4 py-4">
        <div
          className={cn('flex justify-between items-center px-3', {
            'justify-center': isCollapsed,
          })}
        >
          {!isCollapsed && (props.leftTop || <span>Placeholder</span>)}
          <Button
            variant="ghostjuyoung"
            onClick={() => {
              isCollapsed ? props.onExpand?.() : props.onCollapse?.()
            }}
          >
            {isCollapsed ? (
              <DynamicIcon name="arrow-right-to-line" />
            ) : (
              <DynamicIcon name="arrow-left-to-line" />
            )}
          </Button>
        </div>
        {!isCollapsed && <div className="px-3">{props.projectSwitcher}</div>}
        <Separator />
        <div className="px-3 py-2">
          <div
            data-collapsed={isCollapsed}
            className="group space-y-1 flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
          >
            <nav className="grid gap-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
              {transformedLinks.map((link, index) => (
                <CollapsableLink
                  key={`${link.href}-${index}`}
                  {...link}
                  isCollapsed={isCollapsed}
                  depth={0}
                />
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}
