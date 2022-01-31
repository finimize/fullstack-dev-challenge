const BASE_URL = 'http://localhost:3001'

export const fetchData = async (apiUrl: string): Promise<number[]> => {
    const url = BASE_URL + apiUrl
    const response = await window.fetch(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
    })

    type JSONResponse = {
        data?: number[]
        errors?: Array<{ message: string }>
    }
    const { data, errors }: JSONResponse = await response.json()
    if (response.ok && data) {
        return Promise.resolve(data)
    } else {
        const error = new Error(errors?.map((e) => e.message).join('\n') ?? 'unknown')
        return Promise.reject(error)
    }
}
