import { useEffect, useState } from 'react'

export function useDebounce<T> (value: T, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => { clearTimeout(timer) } // <----
  }, [value, delay])

  return debouncedValue
}

/*
Línea del tiempo de cómo se comporta el usuario:

0ms -> (usuario escribe) user type - 'h' -> value
   useEffect ... L7
150ms -> user type 'he' -> value
   clear useEffect - L11 (Se resetea el delay, otra vez espera 500ms)
   useEffect ... L7
300ms -> user type 'hel'  -> value
   clear useEffect - L11
   useEffect ... L7
400ms -> user type 'hell'  -> value
    clear useEffect - L11
    useEffect ... L7
900ms -> como pasa 500ms sin que pase nada, se ejecuta la línea 8 y luego la 14; L8 -> setDebouncedValue('hell') -> debounceValue L14
*/
