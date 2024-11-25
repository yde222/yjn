'use client'
import { type PaginationState } from '@tanstack/react-table'
import React from 'react'
import { Pagination, PaginationContent, PaginationItem } from '../ui/pagination'
import { Button } from '../ui/button'
import { ParameterizedIcon } from '../ui/parameterized-icon'
import { Label } from '../ui/label'
import { Combobox } from '../ui/select'

export type CommonPaginationProps = {
  dataLength: number
  paginationState: [
    PaginationState,
    React.Dispatch<React.SetStateAction<PaginationState>>,
  ]
  windowSize?: number
}

export function CommonPagination({
  dataLength,
  paginationState,
  windowSize = 3,
}: CommonPaginationProps) {
  const [pagination, setPagination] = paginationState
  const maxPage = Math.ceil((dataLength || 0) / pagination.pageSize) - 1
  const window = React.useMemo(() => {
    if (dataLength <= pagination.pageSize) {
      return [0]
    }

    if (dataLength <= pagination.pageSize * windowSize) {
      return Array.from(
        { length: Math.ceil(dataLength / pagination.pageSize) },
        (_, i) => i,
      )
    }

    if (pagination.pageIndex < windowSize / 2) {
      return Array.from({ length: windowSize }, (_, i) => i)
    }

    if (pagination.pageIndex > maxPage - windowSize / 2) {
      return Array.from(
        { length: windowSize },
        (_, i) => maxPage - windowSize + i + 1,
      )
    }

    return Array.from(
      { length: windowSize },
      (_, i) => pagination.pageIndex - Math.floor(windowSize / 2) + i,
    )
  }, [pagination.pageIndex, maxPage, dataLength])

  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row items-center gap-2">
        <Label htmlFor="rows-per-page">표시할 행 수:</Label>
        <Combobox
          id="rows-per-page"
          value={pagination.pageSize.toString()}
          className="w-fit"
          selectOptions={[
            { value: '5', displayString: '5' },
            { value: '10', displayString: '10' },
            { value: '20', displayString: '20' },
            { value: '30', displayString: '30' },
            { value: '40', displayString: '40' },
            { value: '50', displayString: '50' },
          ]}
          onValueChange={value => {
            setPagination(prev => ({
              ...prev,
              pageSize: parseInt(value) || 20,
              pageIndex: 0,
            }))
          }}
        />
      </div>
      <Pagination className="justify-end mx-0 flex-1">
        <PaginationContent>
          <PaginationItem>
            <Button
              variant={'ghost'}
              onClick={() => {
                setPagination(prev => ({
                  ...prev,
                  pageIndex: 0,
                }))
              }}
              disabled={pagination.pageIndex === 0}
            >
              <ParameterizedIcon className="h-4 w-4" name="ChevronLeft" />
            </Button>
          </PaginationItem>
          {window.map(page => (
            <PaginationItem key={page}>
              <Button
                variant={pagination.pageIndex === page ? 'outline' : 'ghost'}
                disabled={pagination.pageIndex === page}
                onClick={() => {
                  setPagination(prev => ({
                    ...prev,
                    pageIndex: page,
                  }))
                }}
              >
                {page + 1}
              </Button>
            </PaginationItem>
          ))}
          <PaginationItem>
            <Button
              variant={'ghost'}
              onClick={() => {
                setPagination(prev => ({
                  ...prev,
                  pageIndex: maxPage,
                }))
              }}
              disabled={pagination.pageIndex === maxPage}
            >
              <ParameterizedIcon className="h-4 w-4" name="ChevronRight" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
