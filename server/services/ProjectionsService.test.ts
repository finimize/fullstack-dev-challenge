import "jest";
import { ProjectionsService } from ".";

import { projectionResult1 as expectedSavings1 } from "../test/fixtures/projectionResult1";
import { projectionResult2 as expectedSavings2 } from "../test/fixtures/projectionResult2";

describe("ProjectionsService", () => {
  describe("getProjectedYearSavingsPerMonth()", () => {
    // Test cases for getting projected savings [initialSavings, interestRate, monthlyDeposit, years, expectedResult]
    const cases: [
      number,
      number,
      number,
      number,
      { savings: number[]; totalInvested: number; interestEarned: number }
    ][] = [
      [
        5000,
        5,
        100,
        50,
        {
          savings: expectedSavings1,
          totalInvested: 65000,
          interestEarned: 263574.0514519191,
        },
      ],
      [
        8000,
        3,
        50,
        50,
        {
          savings: expectedSavings2,
          totalInvested: 38000,
          interestEarned: 67426.28180645105,
        },
      ],
    ];

    test.each(cases)(
      "with %p initialSavings, %p interestRate and %p monthlyDeposit over %p years it returns expected result",
      (
        initialSavings: number,
        interestRate: number,
        monthlyDeposit: number,
        years: number,
        expectedResult: {
          savings: number[];
          totalInvested: number;
          interestEarned: number;
        }
      ) => {
        const result = ProjectionsService.getProjectedYearSavingsPerMonth({
          initialSavings,
          interestRate,
          monthlyDeposit,
          years,
        });
        expect(result).toEqual(expectedResult);
      }
    );
  });
});
