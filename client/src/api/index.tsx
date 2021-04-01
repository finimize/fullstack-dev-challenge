import { DataValueInterface } from '../store/store.interface'

export const postCalculation = async (
    initialSavings: number,
    interestRate: number,
    compoundingFrequency: number,
    monthlyContributions: number,
): Promise<DataValueInterface> => {
    const response = await fetch('http://localhost:3001/api', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            initialSavings,
            interestRate,
            compoundingFrequency,
            monthlyContributions,
        }),
    })
    type JSONResponse = {
        savingsDetails?: DataValueInterface
        errors?: Array<{ message: string }>
    }
    const { savingsDetails, errors }: JSONResponse = (await response.json()) as JSONResponse

    if (response.ok) {
        return savingsDetails ? { ...savingsDetails } : Promise.reject(new Error('InvalidData'))
    }
    const error = new Error(errors?.map((e) => e.message).join('\n') ?? 'unknown')
    return Promise.reject(error)
}
