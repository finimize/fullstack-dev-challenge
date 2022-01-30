import "jest";
import { ProjectionsService } from ".";

import { projectionResult1 as expectedResult1 } from "../test/fixtures/projectionResult1";
import { projectionResult2 as expectedResult2 } from "../test/fixtures/projectionResult2";

describe("ProjectionsService", () => {
  describe("getProjected50YearSavingsPerMonth()", () => {
    // Test cases for getting projected savings [initialSavings, interestRate, monthlyDeposit, expectedResult]
    const cases: [number, number, number, number[]][] = [
      [5000, 5, 100, expectedResult1],
      [8000, 3, 50, expectedResult2],
    ];

    test.each(cases)(
      "with %p initialSavings, %p interestRate and %p monthlyDeposit it returns expected result",
      (
        initialSavings: number,
        interestRate: number,
        monthlyDeposit: number,
        expectedResult: number[]
      ) => {
        const result = ProjectionsService.getProjected50YearSavingsPerMonth({
          initialSavings,
          interestRate,
          monthlyDeposit,
        });
        expect(result).toEqual(expectedResult);
      }
    );
  });
});
