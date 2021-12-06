import {
    areFormParamsValid,
    generateQuery,
} from './CompoundInterestCalculator.tsx';

describe("test CompoundInterestCalculator", () => {
    describe("areFormParamsValid return true", () => {
        const cases = [
            [100, 20, 1.2, 11, true],
            [100, "", 1.2, 10, false],
            [100, 12, "1.", 10, false],
            [120, 1, "", 2, false],
            [2, 1, 1, 2, true],
            [1, 1, "1.3", 3, true],
            ["sd", 1, 3, 4, false],
        ];
        test.each(cases)("return expected", (initialDeposit, monthlySavings, interestRate, periodInYears, expected) => {
            const formParams = {
                initialDeposit: initialDeposit,
                monthlySavings: monthlySavings,
                interestRate: interestRate,
                periodInYears: periodInYears,
            };

            expect(areFormParamsValid(formParams)).toEqual(expected);
        });
    });

    it("generateQuery formats query", () => {
        const base = "http://localtest:200/?"
        const myParams = {
            initialDeposit: 100,
            interestRate: 1.2,
        };
        const expected = "http://localtest:200/?initialDeposit=100&interestRate=1.2"

        expect(generateQuery(base, myParams)).toEqual(expected);
    });
});
