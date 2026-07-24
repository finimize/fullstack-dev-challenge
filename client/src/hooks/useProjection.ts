import { useEffect, useState } from 'react'
import { fetchProjection } from '../api/projection'
import type { Projection, ProjectionParams } from '../types/projection'
import { useDebouncedValue } from './useDebouncedValue'

const DEBOUNCE_MS = 150

type ProjectionState = {
    projection: Projection | null
    loading: boolean
    error: string | null
}

/** Fetch a savings projection whenever `params` changes. */
export const useProjection = (params: ProjectionParams): ProjectionState => {
    // We don't want to fire a request for every frame, debouncing the input allows us to throttle the number of requests
    const debounced = useDebouncedValue(params, DEBOUNCE_MS)

    const [state, setState] = useState<ProjectionState>({
        projection: null,
        loading: true,
        error: null,
    })

    useEffect(() => {
        const controller = new AbortController()
        setState((prev) => ({ ...prev, loading: true, error: null }))

        fetchProjection(debounced, controller.signal)
            .then((projection) => {
                setState({ projection, loading: false, error: null })
            })
            .catch((err: unknown) => {
                if (err instanceof DOMException && err.name === 'AbortError') {
                    // Aborted request, ignore
                    return
                }
                const message = err instanceof Error ? err.message : 'Unknown error'
                setState({ projection: null, loading: false, error: message })
            })

        // Cleanup, ensure that this request doesn't complete if params change again - avoid race conditions
        return () => controller.abort()
    }, [debounced])

    return state
}
