export type NonNullableFunction<T> = T extends (...args: any[]) => any
  ? NonNullable<T>
  : never;

export type FunctionStrip<T> = T extends (...args: any[]) => any
  ? never
  : NonNullable<T>;

export type GetPropsObjectType<
  T extends ((...args: any[]) => any) | undefined,
> = Parameters<NonNullableFunction<T>>[0];
