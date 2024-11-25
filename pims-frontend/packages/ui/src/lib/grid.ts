import { AccessorKeyColumnDef } from '@tanstack/react-table';

export function flatNestedColumnKeys<T extends Record<string, any>>(
  obj: T,
): string[] {
  return Object.keys(obj).reduce((acc, key) => {
    if (key === 'subRows') {
      return acc;
    }

    if (typeof obj[key] !== 'object' || obj[key] === null) {
      return [...acc, key];
    }

    const nestedKeys = flatNestedColumnKeys(obj[key]).map(
      (nestedKey) => `${key}.${nestedKey}`,
    );
    return [...acc, ...nestedKeys];
  }, [] as string[]);
}

export function createColumnsFromData<T extends Record<string, any>>(
  data: T[] | [T, ...T[]],
): AccessorKeyColumnDef<T>[] {
  const aggregatedColumns = data.reduce((acc, row) => {
    const keys = flatNestedColumnKeys(row);
    const colDefs: AccessorKeyColumnDef<T>[] = keys.map((key) => {
      return {
        header: key,
        accessorKey: key,
      };
    });

    const uniqueColumns = colDefs.filter(
      (col) =>
        !acc.some((existingCol) => existingCol.accessorKey === col.accessorKey),
    );

    return [...acc, ...uniqueColumns];
  }, [] as AccessorKeyColumnDef<T>[]);

  return aggregatedColumns;
}
