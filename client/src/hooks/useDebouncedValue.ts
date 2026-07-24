import { useEffect, useState } from 'react'

/** Return `value` after it has remained unchanged for `delay` ms */
export const useDebouncedValue = <T>(value: T, delay: number): T => {
    const [debounced, setDebounced] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delay)
        return () => clearTimeout(timer)
    }, [value, delay])

    return debounced
}
