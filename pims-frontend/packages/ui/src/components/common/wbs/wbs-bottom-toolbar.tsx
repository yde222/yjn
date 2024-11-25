'use client';

import { TooltipTrigger } from '@radix-ui/react-tooltip';
import {
  ArrowLeftToLineIcon,
  ArrowRightToLineIcon,
  PlusIcon,
  RotateCcwIcon,
  TrashIcon,
} from 'lucide-react';
import { MRT_RowData, MRT_TableInstance } from 'material-react-table';
import React from 'react';
import { Button } from '../../ui/button';
import { Tooltip, TooltipContent, TooltipProvider } from '../../ui/tooltip';

export function WbsBottomToolbar<TData extends MRT_RowData>(props: {
  table: MRT_TableInstance<TData>;
  data: TData[];
  onResetData?: () => void;
  onDeleteData?: (ids: string[]) => void;
  onAddDataAbove?: (targetId: string) => void;
  onAddDataBelow?: (targetId: string) => void;
  onIndentRight?: (targetId: string) => void;
  onIndentLeft?: (targetId: string) => void;
  subrowIndexKey: string;
}) {
  const selectedRows = props.table.getSelectedRowModel().flatRows;

  const handleDeleteData = React.useCallback(() => {
    const ids = selectedRows.map((r) => r.original[props.subrowIndexKey]);
    props.onDeleteData?.(ids);
  }, [selectedRows, props.subrowIndexKey]);

  return (
    <TooltipProvider>
      <div className="flex flex-row justify-start">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={'ghost'} onClick={() => props.onResetData?.()}>
              <RotateCcwIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>리셋</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={'ghost'}
              onClick={handleDeleteData}
              disabled={selectedRows.length === 0}
            >
              <TrashIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>삭제</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={'ghost'}
              disabled={
                selectedRows.length === 0 ||
                selectedRows[0]?.original?.[props.subrowIndexKey] === '0'
              }
            >
              <ArrowLeftToLineIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>상위 행으로 변경</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={'ghost'}
              disabled={
                selectedRows.length === 0 ||
                selectedRows[0]?.original?.[props.subrowIndexKey] === '0'
              }
            >
              <ArrowRightToLineIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>하위 행으로 변경</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
