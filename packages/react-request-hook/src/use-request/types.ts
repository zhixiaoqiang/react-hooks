/** data type for user */
export type DataType<T> = T | null

/** error type */
export type ErrorType = DataType<any> | Error

export enum actionTypeEnum {
  /** mark before request start status */
  REQUEST_INIT = 'REQUEST_INIT',
  /** mark request success status */
  REQUEST_SUCCESS = 'REQUEST_SUCCESS',
  /** mark request failure status */
  REQUEST_FAILURE = 'REQUEST_FAILURE'
}

/** state */
export interface IState<T> {
  loading?: boolean;
  data?: DataType<T>;
  error?: ErrorType;
}

/** action */
export interface IAction<T> {
  type: keyof typeof actionTypeEnum;
  payload?: DataType<T>;
  error?: ErrorType;
}

/** utility type for unpacking a type */
export type Unpacked<T> =
  T extends (infer U)[] ? U :
  T extends (...args: any[]) => infer U ? U :
  T extends Promise<infer U> ? U :
  T
