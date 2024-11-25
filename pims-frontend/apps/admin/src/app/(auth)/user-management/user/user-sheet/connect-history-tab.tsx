'use client';

import { useGetAllUserHistoryQuery } from '@pims-frontend/apis/lib/features/common/user/controller/UserController';
import { format } from '@pims-frontend/ui/components/ui/date-fns';
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from '@pims-frontend/ui/components/ui/material-react-table';
import { ParameterizedIcon } from '@pims-frontend/ui/components/ui/parameterized-icon';
import { SheetDescription } from '@pims-frontend/ui/components/ui/sheet';
import { TabsContent } from '@pims-frontend/ui/components/ui/tabs';
import React from 'react';

function formatDateString(date: string) {
  return format(new Date(date), 'yyyy-MM-dd HH:mm');
}

export function ConnectHistoryTab() {
  const { data, isFetching, refetch } = useGetAllUserHistoryQuery({});

  React.useEffect(() => {
    refetch();
  }, [refetch]);

  const columns = React.useMemo<
    MRT_ColumnDef<{
      no: number;
      ip: string;
      initialConnectedDate: string;
      lastConnectedDate: string;
      passwordUpdateDate: string;
    }>[]
  >(
    () => [
      {
        header: 'No.',
        accessorKey: 'no',
        size: 10,
        grow: false,
      },
      {
        header: 'IP',
        accessorKey: 'ip',
        size: 10,
        grow: 1,
      },
      {
        header: '최초 접속일시',
        accessorKey: 'initialConnectedDate',
        accessorFn: (data) => formatDateString(data.initialConnectedDate),
        size: 10,
        grow: 1,
      },
      {
        header: '최종 접속일시',
        accessorKey: 'lastConnectedDate',
        accessorFn: (data) => formatDateString(data.lastConnectedDate),
        size: 10,
        grow: 1,
      },
      {
        header: '비밀번호 변경일시',
        accessorKey: 'passwordUpdateDate',
        accessorFn: (data) => formatDateString(data.passwordUpdateDate),
        size: 10,
        grow: 1,
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    data: data || [],
    columns: columns,
    state: {
      isLoading: isFetching,
    },
    enablePagination: false,
    enableTopToolbar: false,
    enableBottomToolbar: false,
    enableColumnActions: false,
    icons: {
      SyncAltIcon: () => <ParameterizedIcon name="ChevronsUpDown" />,
      ArrowDownwardIcon: () => <ParameterizedIcon name="ChevronDown" />,
    },
    initialState: {
      density: 'compact',
    },
    layoutMode: 'grid',
  });

  return (
    <TabsContent value="connect-history">
      <div className="flex flex-col px-9 gap-4 max-w-full">
        <SheetDescription className="text-2xs px-3">
          전체{' '}
          <span className="text-[--primary-normal]">{data?.length || 0}</span>
        </SheetDescription>
        <MaterialReactTable table={table} />
      </div>
    </TabsContent>
  );
}
