class ProjectionsService {
  static getProjectedYearSavingsPerMonth({
    initialSavings,
    interestRate,
    monthlyDeposit,
    years,
  }: {
    initialSavings: number;
    interestRate: number;
    monthlyDeposit: number;
    years: number;
  }): {
    savings: number[];
    totalInvested: number;
    interestEarned: number;
  } {
    const rate = interestRate / 100 / 12;
    const savings = [initialSavings];

    for (let i = 0; i < years * 12; i++) {
      const newPrincipal = savings[i] + monthlyDeposit;
      const nextMonthlyTotal = newPrincipal + newPrincipal * rate;
      savings.push(nextMonthlyTotal);
    }
    const totalInvested = initialSavings + monthlyDeposit * 12 * years;
    const interestEarned = savings[savings.length - 1] - totalInvested;

    return {
      savings,
      totalInvested,
      interestEarned,
    };
  }
}

export default ProjectionsService;
