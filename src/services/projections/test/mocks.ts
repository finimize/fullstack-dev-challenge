import { getProjectionForYear } from '../projections'

type MockScenarios = 'noInterest' | 'noDeposit' | 'noInitialAmount' | 'happyPaths'

type Mocks = Record<
    MockScenarios,
    {
        args: Parameters<typeof getProjectionForYear>
        expectedResult: number
    }[]
>

export const MOCKS: Mocks = {
    noInterest: [
        {
            args: [0, 0, 0, 0],
            expectedResult: 0,
        },
        {
            args: [1000, 100, 1, 0],
            expectedResult: 2200,
        },
        {
            args: [1000, 100, 2, 0],
            expectedResult: 3400,
        },
        {
            args: [1000, 100, 3, 0],
            expectedResult: 4600,
        },
    ],
    noDeposit: [
        {
            args: [1000, 0, 0, 10],
            expectedResult: 1000,
        },
        {
            args: [1000, 0, 1, 10],
            expectedResult: 1104.7130674412967,
        },
        {
            args: [1000, 0, 2, 10],
            expectedResult: 1220.3909613755593,
        },
        {
            args: [1000, 0, 3, 10],
            expectedResult: 1348.1818424188275,
        },
    ],
    noInitialAmount: [
        {
            args: [0, 100, 0, 10],
            expectedResult: 0,
        },
        {
            args: [0, 100, 1, 10],
            expectedResult: 1256.5568092955618,
        },
        {
            args: [0, 100, 2, 10],
            expectedResult: 2644.6915365067107,
        },
        {
            args: [0, 100, 3, 10],
            expectedResult: 4178.18210902593,
        },
    ],
    happyPaths: [
        {
            args: [5000, 500, 0, 12],
            expectedResult: 5000,
        },
        {
            args: [10000, 300, 7, 5],
            expectedResult: 44278.95628253526,
        },
        {
            args: [50000, 200, 10, 3],
            expectedResult: 95415.9611348072,
        },
        {
            args: [100000, 100, 50, 8],
            expectedResult: 6180991.065545436,
        },
    ],
}
