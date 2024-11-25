export function swapBlockArrs<T extends any>(
  arr: T[],
  from: number,
  x: T[],
  to: number,
  y: T[],
) {
  if (from < to) {
    return [
      ...arr.slice(0, from),
      ...y,
      ...arr.slice(from + x.length, to),
      ...x,
      ...arr.slice(to + y.length),
    ];
  }
  return [
    ...arr.slice(0, to),
    ...x,
    ...arr.slice(to + y.length, from),
    ...y,
    ...arr.slice(from + x.length),
  ];
}
