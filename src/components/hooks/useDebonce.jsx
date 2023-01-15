import { useEffect, useState } from 'react'

export const useDebonce = (value, ms = 300) => {
  const [debonceValue, setDebonceValue] = useState(value)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebonceValue(value)
    }, ms)

    return () => clearTimeout(timeoutId)
  }, [value])
  return debonceValue
}
