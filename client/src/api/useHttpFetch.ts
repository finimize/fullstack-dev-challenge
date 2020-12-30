import { useEffect } from 'react'
import { useToast } from '@chakra-ui/react'

import useFetch, { UseFetchArgs } from 'use-http'

import { toUserFriendlyString, APIValidationError } from './validation'

const ROOT_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : ''
const API_BASE_URL = `${ROOT_URL}/production/api/v1`

export interface BaseApiResponse {
    errors?: APIValidationError[]
}

export const useHttpFetch = <Data extends BaseApiResponse>(
    ...[url, options, dependencies, ...rest]: UseFetchArgs
) => {
    if (dependencies !== undefined) {
        // url should be full url
        url = `${API_BASE_URL}${url}`
    } else {
        url = API_BASE_URL
    }

    const result = useFetch<Data>(url, options, dependencies, ...rest)

    const toast = useToast()

    useEffect(() => {
        if (result.error) {
            toast({
                title: result.error.message || 'Ups, something has gone wrong',
                description: toUserFriendlyString(result.data?.errors),
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
        }
        // effect only needs to run if error changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result.error])

    return result
}
