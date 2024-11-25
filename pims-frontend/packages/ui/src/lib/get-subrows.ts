type SubRowTree<T> = T & { subRows: (T & SubRowTree<T>)[] };

function getPath(path: string, separator = '.', rootKey = '0'): string[] {
  const splitPath = path.split(separator);
  if (splitPath[0] === rootKey && splitPath.length === 1) {
    return [rootKey];
  }

  const fullPath = splitPath.reduce(
    (acc: string[], _cur, idx, arr) => [
      ...acc,
      arr.slice(0, idx + 1).join(separator),
    ],
    [],
  );

  return [rootKey, ...fullPath];
}

type ReconstructedResult<
  K extends string,
  R extends Record<K, string> & Record<string, any>,
> = SubRowTree<R>;

function updateSubRows<
  K extends string,
  R extends Record<K, string> & Record<string, any>,
>(
  subRows: ReconstructedResult<K, R>[],
  path: [string] | [string, string] | [string, ...string[]] | string[],
  row: R,
  key: K,
): ReconstructedResult<K, R>[] {
  const [parentPath, ...restPath] = path;

  if (path.length === 1) {
    return [...subRows, { ...row, subRows: [] }];
  }

  const existingChildIndex = subRows.findIndex(
    (subRow) => subRow[key] === parentPath,
  );

  if (existingChildIndex === -1) {
    return [
      ...subRows,
      {
        ...row,
        subRows: updateSubRows([], restPath, row, key),
      },
    ];
  }

  return subRows.map((subRow, index) =>
    index === existingChildIndex
      ? {
          ...subRow,
          subRows: updateSubRows(subRow.subRows, restPath, row, key),
        }
      : subRow,
  );
}

export function reconstructData<
  K extends string,
  R extends Record<K, string> & Record<string, any>,
>(key: K, data: R[], rootKey = '0'): ReconstructedResult<K, R> {
  const root = data.find((row) => row[key] === rootKey);

  if (!root) {
    throw new Error('Root node not found');
  }

  return data.reduce(
    (acc: ReconstructedResult<K, R>, row) => {
      if (row[key] === rootKey) {
        return acc;
      }

      const path = getPath(row[key], '.', rootKey);

      return {
        ...acc,
        subRows: updateSubRows(acc.subRows, path.slice(1), row, key),
      };
    },
    {
      ...root,
      subRows: [],
    } as ReconstructedResult<K, R>,
  );
}

export function getMaxDepth<
  K extends string,
  R extends Record<K, string> & Record<string, any>,
>(data: ReconstructedResult<K, R>): number {
  if (data.subRows.length === 0) {
    return data.depth as number;
  }

  return Math.max(
    data.depth as number,
    ...data.subRows.map((subRow) => getMaxDepth(subRow)),
  );
}
