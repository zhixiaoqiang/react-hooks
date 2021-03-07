import { useState, useEffect } from 'react'

export interface IUseCacheData<T = any, DV = any> {
  (data: T, defaultValue?: DV): [T, React.Dispatch<React.SetStateAction<T>>]
}

/**
 * @author nazi
 * @param {boolean} [defaultValue=false]
 * @returns
 */
const useCacheData: IUseCacheData = (data, defaultValue) => {
  const [state, setState] = useState(data || defaultValue)

  useEffect(() => {
    if (data) {
      setState(data)
    }
  }, [data])

  return [state, setState]
}

export default useCacheData
