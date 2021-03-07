/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react'

/**
 *
 * @author nazi
 * @param {function} effect
 * @param {array} [dependencies=[]]
 */
const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      effect()
    }
  }, deps)
}

export default useUpdateEffect
