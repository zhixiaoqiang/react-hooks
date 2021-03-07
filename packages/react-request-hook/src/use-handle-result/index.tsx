import { useEffect } from 'react'
export type valueType = { data?: any, loading?: boolean, error?: { message?: string } }

export type IReturnValue = void

export type SuccessFnType = (data: any) => IReturnValue
export type FailFnType = (data: string, error: valueType['error']) => IReturnValue
export type BaseFnType = () => IReturnValue

export interface IRestOptions {
  success?: SuccessFnType
  fail?: FailFnType,
  cleanup?: BaseFnType,
  finish?: SuccessFnType,
  messageError?(message: string): void
}

/**
 * @description 操作结果处理
 * @author nazi
 * @date 2020-07-14
 * @param {valueType} params params 需包含loading, data, error
 * @param {IRestOptions} [restOptions={}] success: (data) => {}, fail: (error) => {}
 * @returns {IReturnValue}
 */
function useHandleResult (params: valueType, restOptions: IRestOptions = {}): IReturnValue {
  const { loading, data, error } = params

  const { success, fail, cleanup, finish, messageError } = restOptions

  useEffect(() => {
    if (!loading) {
      if (data) {
        success && success(data)
      } else if (error) {
        if (fail) {
          fail(error.message || '未知错误', error)
        } else {
          messageError?.(error.message || '未知错误')
        }
      }

      finish?.(data)
    }

    return () => {
      cleanup?.()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, data, error])
}

export default useHandleResult
