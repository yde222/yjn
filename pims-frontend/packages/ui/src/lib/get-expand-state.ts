export function getExpandState<Data extends Record<string, any>>(
  numString: string,
  data: Data[],
  key: string,
) {
  const level = Number(numString);

  // close all
  if (numString === '-1' || Number.isNaN(level)) {
    return {};
  }

  // open all
  if (numString === '0') {
    return data.reduce((acc, row) => {
      return {
        ...acc,
        [row[key]]: true,
      };
    }, {});
  }

  return data.reduce((acc, row) => {
    const rowLevel = row[key] === '0' ? 1 : row[key].split('.').length + 1;
    if (rowLevel > level) {
      return {
        ...acc,
      };
    }
    return {
      ...acc,
      [row[key]]: true,
    };
  }, {});
}

function traverseTreeFilteredByDepth<Data extends Record<string, any>>(
  node: Data,
  depth: number,
  key: string,
  subRowsKey = 'subRows',
) {
  const traversed: string[] = [];

  if (node.depth < depth - 1) {
    traversed.push(node[key]);
  }

  if (node[subRowsKey] && node[subRowsKey].length > 0) {
    for (const subRow of node[subRowsKey]) {
      traversed.push(
        ...traverseTreeFilteredByDepth(subRow, depth, key, subRowsKey),
      );
    }
  }

  return traversed;
}

export function getExpandFromTree<Data extends Record<string, any>>(
  numString: string,
  data: Data[],
  key: string,
  subRowsKey = 'subRows',
) {
  const level = Number(numString);

  // close all
  if (numString === '-1' || Number.isNaN(level) || !data[0]) {
    return {};
  }

  // open all
  if (numString === '0') {
    return true;
  }

  const traversed = traverseTreeFilteredByDepth(
    data[0],
    level,
    key,
    subRowsKey,
  );

  return traversed.reduce(
    (acc, row) => ({
      ...acc,
      [row]: true,
    }),
    {},
  );
}
