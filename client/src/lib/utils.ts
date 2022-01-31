export const createQueryString = (queries: { [key: string]: any }): string =>
    Object.keys(queries)
        .map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(queries[key])
        })
        .join('&')
