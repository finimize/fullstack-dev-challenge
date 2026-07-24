import type { Projection, ProjectionParams } from '../types/projection'

const buildQuery = (params: ProjectionParams): string => {
    const entries = Object.entries(params).filter(([, value]) => typeof value === 'number')
    const search = new URLSearchParams()
    for (const [key, value] of entries) {
        search.set(key, String(value))
    }
    return search.toString()
}

export const fetchProjection = async (
    params: ProjectionParams,
    signal?: AbortSignal,
): Promise<Projection> => {
    // Root relative
    const response = await fetch(`/api/projections?${buildQuery(params)}`, { signal })
    if (!response.ok) {
        const body = await response.json().catch(() => ({}))
        throw new Error(body.message || `Request failed with status ${response.status}`)
    }
    return response.json() as Promise<Projection>
}
