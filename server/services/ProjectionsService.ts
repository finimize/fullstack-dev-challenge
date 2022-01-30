class ProjectionsService {
  static getProjected50YearSavingsPerMonth({
    initialSavings,
    interestRate,
    monthlyDeposit,
  }: {
    initialSavings: number;
    interestRate: number;
    monthlyDeposit: number;
  }): number[] {
    const rate = interestRate / 100 / 12;
    const savings = [initialSavings];

    for (let i = 0; i < 600; i++) {
      const newPrincipal = savings[i] + monthlyDeposit;
      const nextMonthlyTotal = newPrincipal + newPrincipal * rate;
      savings.push(nextMonthlyTotal);
    }
    return savings;
  }
}

export default ProjectionsService;
