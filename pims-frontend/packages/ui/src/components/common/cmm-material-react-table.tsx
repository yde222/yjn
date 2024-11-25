'use client';

import { flatNestedColumnKeys } from '@pims-frontend/ui/lib/grid';
import {
  MRT_ColumnDef,
  MaterialReactTable as OriginalMRT,
  useMaterialReactTable,
} from 'material-react-table';
export * from 'material-react-table';

import React from 'react';

export function createColumnsFromData<T extends Record<string, any>>(
  data: T[] | [T, ...T[]],
  excludedKeys?: string[],
): MRT_ColumnDef<T>[] {
  const aggregatedColumns = data.reduce((acc, row) => {
    const keys = flatNestedColumnKeys(row);
    const colDefs: MRT_ColumnDef<T>[] = keys
      .filter((key) => !excludedKeys?.includes(key))
      .map((key) => {
        return {
          header: key,
          accessorKey: key,
          muiTableBodyCellProps: {
            sx: {
              width: 'fit-content',
              minWidth: 'fit-content',
            },
          },
        };
      });
    const uniqueColumns = colDefs.filter(
      (col) =>
        !acc.some((existingCol) => existingCol.accessorKey === col.accessorKey),
    );

    return [...acc, ...uniqueColumns];
  }, [] as MRT_ColumnDef<T>[]);

  return aggregatedColumns;
}

export function SimpleMRT<T extends Record<string, any>>(props: { data: T[] }) {
  const columns = React.useMemo(
    () => createColumnsFromData(props.data),
    [props.data],
  );

  const table = useMaterialReactTable({
    columns,
    data: props.data,
  });

  return <OriginalMRT table={table} />;
}
