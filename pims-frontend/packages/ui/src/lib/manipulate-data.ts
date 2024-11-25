type RowData<SubrowIndexKey extends string> = Record<string, any> &
  Record<SubrowIndexKey, string>;

export const sortFunctionForDotSeparatedKeys = (
  a: string,
  b: string,
): number => {
  const [aFirst, ...aRest] = a.split('.');
  const [bFirst, ...bRest] = b.split('.');

  if (aFirst === undefined) {
    return 1;
  }

  if (bFirst === undefined) {
    return -1;
  }

  if (aFirst === bFirst) {
    return sortFunctionForDotSeparatedKeys(aRest.join('.'), bRest.join('.'));
  }

  return Number(aFirst) - Number(bFirst);
};

export const dotSeparated = (str: string) => {
  const arr = str.split('.');

  if (arr.length === 0) {
    return {
      first: null,
      familyKey: null,
      siblingDepth: null,
      last: null,
    };
  }

  if (arr.length === 1) {
    // '1', '2', '3', ... `${number}`
    return {
      first: '0',
      familyKey: arr[0] as string,
      siblingDepth: arr.length + 1, // 1
      last: arr[0] as string,
    };
  }

  return {
    first: '0',
    familyKey: arr.slice(0, -1).join('.') as string,
    siblingDepth: arr.length,
    last: arr.slice(-1)[0] as string,
  };
};

export const findRowsToAddAbove = <
  T extends RowData<SubrowIndexKey>,
  SubrowIndexKey extends string,
>(
  prev: T[],
  target: T,
  subrowIndexKey: SubrowIndexKey,
) => {
  const targetKey = target[subrowIndexKey] as string; // 1.1.1
  const { familyKey, siblingDepth, last } = dotSeparated(targetKey); // 1.1.**, 3
  const targetLast = Number(last);

  if (familyKey === null) {
    return prev;
  }

  return prev.reduce((acc: T[], row: T) => {
    const rowKey = row[subrowIndexKey] as string;
    const rowKeyLevel = rowKey.split('.').length;
    const [toAdd, ...rest] = rowKey.replace(familyKey + '.', '').split('.');
    const toAddNumber = Number(toAdd);

    if (
      rowKey === targetKey ||
      (rowKey.startsWith(familyKey) &&
        toAddNumber >= targetLast &&
        rowKeyLevel >= siblingDepth)
    ) {
      return [
        ...acc,
        {
          ...row,
          [subrowIndexKey]: [familyKey, toAddNumber + 1, ...rest].join('.'),
          isMoved: true,
        },
      ];
    }

    return acc;
  }, [] satisfies T[]);
};

export const addDataAbove =
  <SubrowIndexKey extends string>(
    targetId: string,
    subrowIndexKey: SubrowIndexKey,
  ) =>
  <T extends RowData<SubrowIndexKey>>(prev: T[]): T[] => {
    const targetIndex = prev.findIndex(
      (row) => row[subrowIndexKey] === targetId,
    );

    if (targetIndex === -1 || targetIndex === 0) {
      return prev;
    }

    const target = prev[targetIndex]!;
    const affectedRows = findRowsToAddAbove(prev, target, subrowIndexKey);

    return [
      ...prev.slice(0, targetIndex),
      { ...target, isCreated: true },
      ...affectedRows,
      ...prev.slice(targetIndex + affectedRows.length),
    ];
  };

export const findRowsToAddBelow = <
  T extends RowData<SubrowIndexKey>,
  SubrowIndexKey extends string,
>(
  prev: T[],
  target: T,
  subrowIndexKey: SubrowIndexKey,
) => {
  const targetKey = target[subrowIndexKey] as string; // 1.1.1
  const { familyKey, siblingDepth, last } = dotSeparated(targetKey); // 1.1.**, 3
  const targetLast = Number(last);

  if (familyKey === null) {
    return prev;
  }

  return prev.reduce((acc: T[], row: T) => {
    const rowKey = row[subrowIndexKey] as string;
    const rowKeyLevel = rowKey.split('.').length;
    const [toAdd, ...rest] = rowKey.replace(familyKey + '.', '').split('.');
    const toAddNumber = Number(toAdd);

    if (
      rowKey.startsWith(familyKey) &&
      toAddNumber >= targetLast &&
      rowKeyLevel >= siblingDepth
    ) {
      return toAddNumber > targetLast
        ? [
            ...acc,
            {
              ...row,
              [subrowIndexKey]: [familyKey, toAddNumber + 1, ...rest].join('.'),
              isMoved: true,
            },
          ]
        : [
            ...acc,
            {
              ...row,
              [subrowIndexKey]: [familyKey, toAddNumber + 1, ...rest].join('.'),
              isCreated: true,
            },
          ];
    }

    return acc;
  }, [] satisfies T[]);
};

export const addDataBelow =
  <T extends RowData<SubrowIndexKey>, SubrowIndexKey extends string>(
    targetId: string,
    subrowIndexKey: SubrowIndexKey,
  ) =>
  (prev: T[]): T[] => {
    const targetIndex = prev.findIndex(
      (row) => row[subrowIndexKey] === targetId,
    );

    if (targetIndex === -1) {
      return prev;
    }

    const target = prev[targetIndex]!;
    const affectedRows = findRowsToAddBelow(prev, target, subrowIndexKey);

    return [
      ...prev.slice(0, targetIndex),
      target,
      ...affectedRows,
      ...prev.slice(targetIndex + 1 + affectedRows.length),
    ];
  };

export const findRowsToBeIndentedLeft = <
  T extends RowData<SubrowIndexKey>,
  SubrowIndexKey extends string,
>(
  prev: T[],
  target: T,
  subrowIndexKey: SubrowIndexKey,
) => {
  const targetKey = target[subrowIndexKey] as string; // 1.1.1
  const { familyKey, siblingDepth, last } = dotSeparated(targetKey); // 1.1.**, 3
  const targetLast = Number(last);

  if (familyKey === null || siblingDepth === null || siblingDepth === 1) {
    return prev;
  }

  return prev.reduce((acc: T[], row: T) => {
    const rowKey = row[subrowIndexKey] as string;
    const splitRowKey = rowKey.split('.');
    const sliced = splitRowKey.slice(0, splitRowKey.length - 1);
    const last = splitRowKey.slice(-1);
    const toAdd = sliced.slice(-1)[0];
    const familyToBe = splitRowKey.slice(0, splitRowKey.length - 2);

    if (targetKey === rowKey) {
      const newKey = [...familyToBe, Number(toAdd) + 1].join('.');
      return [
        ...acc,
        {
          ...row,
          [subrowIndexKey]: newKey,
          isMoved: true,
        },
      ];
    }

    if (
      targetKey.startsWith(sliced.join('.')) &&
      (siblingDepth < splitRowKey.length ||
        (siblingDepth === splitRowKey.length && Number(last) > targetLast))
    ) {
      console.log({ targetKey, rowKey, sliced, last, toAdd, familyToBe });
      return [
        ...acc,
        {
          ...row,
          [subrowIndexKey]: [...sliced, Number(last[0]) - 1].join('.'),
          isMoved: true,
        },
      ];
    }

    // const rowKeyLevel = rowKey.split('.').length;
    // const [toAdd, ...rest] = rowKey.replace(familyKey + '.', '').split('.');
    // const toAddNumber = Number(toAdd);

    // if (toAddNumber > targetLast && rowKeyLevel >= siblingDepth) {
    //   return toAddNumber > targetLast
    //     ? [
    //         ...acc,
    //         {
    //           ...row,
    //           [subrowIndexKey]: [familyKey, toAddNumber, ...rest].join('.'),
    //           isMoved: true,
    //         },
    //       ]
    //     : [
    //         ...acc,
    //         {
    //           ...row,
    //           [subrowIndexKey]: [familyKey, toAddNumber, ...rest].join('.'),
    //           isMoved: true,
    //         },
    //       ];
    // }

    return acc;
  }, [] satisfies T[]);
};

export const indentLeft =
  <T extends RowData<SubrowIndexKey>, SubrowIndexKey extends string>(
    targetId: string,
    subrowIndexKey: SubrowIndexKey,
  ) =>
  (prev: T[]): T[] => {
    const targetIndex = prev.findIndex(
      (row) => row[subrowIndexKey] === targetId,
    );

    if (targetIndex === -1) {
      return prev;
    }

    const target = prev[targetIndex]!;
    const affectedRows = findRowsToBeIndentedLeft(prev, target, subrowIndexKey);

    return [
      ...prev.slice(0, targetIndex),
      ...affectedRows,
      ...prev.slice(targetIndex + affectedRows.length),
    ];
  };
