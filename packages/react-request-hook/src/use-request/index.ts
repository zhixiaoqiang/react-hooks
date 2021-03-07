import { useReducer, useCallback, useRef, useEffect, MutableRefObject } from 'react'

import { actionTypeEnum, IState, IAction, Unpacked, ErrorType } from './types'

/**
 * @description reducer function
 * @author nazi
 * @date 2021-03-07
 * @template T
 * @param {T} state
 * @param {IAction<T>} action
 * @returns {(IState<any> | ErrorType)}
 */
function reducer<T extends IState<T>> (state: T, action: IAction<T>): IState<any> | ErrorType {
  switch (action.type) {
    case actionTypeEnum.REQUEST_INIT:
      return { 
        data: null,
        ...state,
        loading: true,
        error: null,
       }
    case actionTypeEnum.REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
       }
    case actionTypeEnum.REQUEST_FAILURE:
      return { 
        ...state,
        loading: false,
        error: action.error,
       }
    default:
      throw new Error('error')
  }
}

/**
 * @description request function
 * @author nazi
 * @date 2021-03-07
 * @template T
 * @param {T} instance
 * @param {(action: IAction<ReturnType<T>>) => void} dispatch
 * @param {MutableRefObject<number>} currentIndex
 * @returns {Promise<ReturnType<T>>}
 */
async function request<T extends (
...args: any[]) => any> (
  instance: T,
  dispatch: (action: IAction<ReturnType<T>>) => void,
  currentIndex: MutableRefObject<number>,
): Promise<ReturnType<T>> {
  const prevCurrentIndex = currentIndex.current
  try {
    dispatch({ type: actionTypeEnum.REQUEST_INIT })
    const result = await instance()
    if (prevCurrentIndex === currentIndex.current) {
      dispatch({ type: actionTypeEnum.REQUEST_SUCCESS, payload: result })
    }
    return result
  } catch (error) {
    if (prevCurrentIndex === currentIndex.current) {
      dispatch({ type: actionTypeEnum.REQUEST_FAILURE, error })
    }
    console.error(error)
    return error
  }
}

/**
 * @description main function
 * @author nazi
 * @date 2021-03-07
 * @template T
 * @param {T} instance
 * @param {IState<Unpacked<ReturnType<T>>>} [initialState={}]
 * @returns 
 */
function useRequest<T extends (
...args: any[]) => any> (
  instance: T,
  initialState: IState<Unpacked<ReturnType<T>>> = {},
) {

  const currentIndex = useRef(0)

  const [state, dispatch] = useReducer(reducer, initialState)

  const requestCallback = (...args: Parameters<T>) => {
    currentIndex.current += 1
    return request((): Unpacked<ReturnType<T>> => instance(...args), dispatch, currentIndex)
  }

  useEffect(() => {
    return () => {
      currentIndex.current += 1
    }
  }, [])

  const memoizedRequestCallback = useCallback(requestCallback, [])

  return [state, memoizedRequestCallback]
}

export default useRequest
