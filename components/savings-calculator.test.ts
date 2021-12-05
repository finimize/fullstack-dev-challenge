import { expect } from "chai";
import { calculateSavingsOverTime } from "./savings-calculator";
import forEach from "mocha-each";
import "mocha";

describe("calculateMonthlySavings", () => {
    forEach([
        [4, 100, 20, 0.01, [342, 587, 834, 1083]],
        [10, 5000, 100, 0.05, [6484, 8043, 9683, 11406, 13217, 15122, 17123, 19227, 21439, 23763]]
    ])
        .it("should return a list values", (years, initialDeposit, monthlySavings, interestRate, expected) => {
            const actual = calculateSavingsOverTime(years, initialDeposit, monthlySavings, interestRate);
            expect(actual).deep.equal(expected)
        });
});
