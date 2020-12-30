import { useRef } from 'react'

export const useDebouncedFn = <Fn extends (...args: any[]) => void>(functionToDebounce: Fn) => {
    const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)

    const debouncedFn = (...args: Parameters<Fn>) => {
        if (timeout.current) {
            clearTimeout(timeout.current)
        }
        timeout.current = setTimeout(() => {
            functionToDebounce(...args)
        }, 50)
    }

    return debouncedFn
}
