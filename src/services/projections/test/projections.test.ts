import { expect } from 'chai'

import { getProjectionForYear, InvalidArgumentError } from '../projections'

import { MOCKS } from './mocks'

describe('projectionsService', () => {
    describe('getProjectionForYear', () => {
        it('returns expected results when interest percentage is zero', () => {
            for (const { args, expectedResult } of MOCKS['noInterest']) {
                expect(getProjectionForYear(...args)).to.eq(expectedResult)
            }
        })

        it('returns expected results when initial amount is zero', () => {
            for (const { args, expectedResult } of MOCKS['noInitialAmount']) {
                expect(getProjectionForYear(...args)).to.eq(expectedResult)
            }
        })

        it('returns expected results when monthly deposit is zero', () => {
            for (const { args, expectedResult } of MOCKS['noDeposit']) {
                expect(getProjectionForYear(...args)).to.eq(expectedResult)
            }
        })

        it('returns expected results when arguments are valid', () => {
            for (const { args, expectedResult } of MOCKS['happyPaths']) {
                expect(getProjectionForYear(...args)).to.eq(expectedResult)
            }
        })

        it('handles invalid/unexpected arguments', () => {
            expect(getProjectionForYear(1000, 0, 1.7, 10)).to.eq(1104.7130674412967)
            expect(() => getProjectionForYear(-1000, 100, 5, 10)).to.throw(InvalidArgumentError)
            expect(() => getProjectionForYear(1000, -100, 5, 10)).to.throw(InvalidArgumentError)
            expect(() => getProjectionForYear(1000, 100, -5, 10)).to.throw(InvalidArgumentError)
            expect(() => getProjectionForYear(1000, 100, 5, -10)).to.throw(InvalidArgumentError)
        })
    })
})
