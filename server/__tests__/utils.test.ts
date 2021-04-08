import * as utils from "../utils";
import assert from "assert";

interface Interest {
  monthlyDeposit: number;
  principleDeposit: number;
  monthlyInterest: number;
  timeInMonths: number;
  timeInYears: number;
}
describe("utils", () => {
  describe("toYearsFromNow", () => {
    it("When args Then should produce an array of years between now until the number of years provided", () => {
      assert.deepStrictEqual(utils.toYearsFromNow(5), [
        "2022",
        "2023",
        "2024",
        "2025",
        "2026",
      ]);
    });
  });
  describe("compoundInterest", () => {
    let params: Interest;
    beforeEach(() => {
      params = {
        monthlyDeposit: 250,
        principleDeposit: 1000,
        monthlyInterest: 1,
        timeInMonths: 5,
        timeInYears: 5,
      };
    });

    it("Given all parameters are valid Then should calculate monthly compound interest", () => {
      const { monthlyDeposit, monthlyInterest, timeInMonths } = params;
      assert.strictEqual(
        utils.monthlyCompoundInterest(
          monthlyDeposit,
          monthlyInterest,
          timeInMonths
        ),
        1275
      );
    });

    it("Given all parameters are valid Then should calculate principle compound interest", () => {
      const { principleDeposit, monthlyInterest, timeInMonths } = params;
      assert.strictEqual(
        utils.principleCompoundInterest(
          principleDeposit,
          monthlyInterest,
          timeInMonths
        ),
        1051
      );
    });

    it("Given all parameters are valid Then should calculate total savings over time", () => {
      const {
        principleDeposit,
        monthlyDeposit,
        monthlyInterest,
        timeInMonths,
      } = params;
      assert.strictEqual(
        utils.totalSavingsOverTime(
          principleDeposit,
          monthlyDeposit,
          monthlyInterest,
          timeInMonths
        ),
        2326
      );
    });

    it("Given all parameters are valid Then should produce an array of yearly savings over time", () => {
      const {
        principleDeposit,
        monthlyDeposit,
        monthlyInterest,
        timeInYears,
      } = params;
      assert.deepStrictEqual(
        utils.yearlySavingsOverTime(
          principleDeposit,
          monthlyDeposit,
          monthlyInterest,
          timeInYears
        ),
        [4988, 8560, 12586, 17123, 22234]
      );
    });
  });
});
