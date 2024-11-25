export type CommonApiResponse<T> = {
  code: number;
  data: T[];
  message: string;
  timestamp: string;
};

export type DynamicAttributes = Record<string, any>;

export type CommonApiSingleResponse<T> = {
  code: number;
  data: T;
  message: string;
  timestamp: string;
};

export type ProjectPathVariable = {
  pjtUid: number;
};

export type CommonApiRequest<T> = {
  pjtUid: number;
  data: T[];
};
