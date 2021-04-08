import { Request, Response, NextFunction } from 'express';

interface CalculationsBodyInterface {
    initialSavings: number
    interestRate: number
    compoundingFrequency: number,
    monthlyContributions?: number
}

interface PostCalculationsInterface {
(req: Request<unknown, unknown, CalculationsBodyInterface>,
res: Response,
next: NextFunction) : void 
}


const calculateInterestRate = (interestRate: number, compoundingFrequency: number) => (1 + ((interestRate/100)/compoundingFrequency)) 
const totalSavingsWithoutInterest = (currentSavings: number, monthlyContributions: number) => currentSavings + monthlyContributions;
const totalSavingsWithInterest = ( 
    currentSavings: number, 
    monthlyContributions: number, 
    interestRate: number, 
    compoundingFrequency: number 
    ) => totalSavingsWithoutInterest(currentSavings, monthlyContributions) * calculateInterestRate(interestRate, compoundingFrequency);

export const postCalculations: PostCalculationsInterface = (req, res, next) => {
    try {
        const {
            initialSavings,
            interestRate,
            compoundingFrequency,
            monthlyContributions=0
        } = req.body;

        let currentSavings = Number(initialSavings.toFixed(2));
        let yearlySavings: number[] = [currentSavings]
        let yearlyBreakdown = [
            {
                yearFinal: currentSavings,
                savings: [currentSavings]
            }
        ]

        for (let year = 1; year <= 50; year+=1 ){
            let currentYearSavings: number[] = [];
            for (let month = 1; month <= 12; month+=1) {
                currentSavings = month % (12/compoundingFrequency) === 0 
                ? Number(totalSavingsWithInterest(currentSavings, monthlyContributions, interestRate, compoundingFrequency).toFixed(2))
                : Number(totalSavingsWithoutInterest(currentSavings, monthlyContributions).toFixed(2))
                currentYearSavings = [
                    ...currentYearSavings,
                    currentSavings
                ]
            }
            yearlySavings = [
                ...yearlySavings,
                ...currentYearSavings
            ]
            yearlyBreakdown =[
                ...yearlyBreakdown,
                {
                    yearFinal: currentSavings,
                    savings: currentYearSavings
                }
            ]
        }
        const savingsDetails = {
                finalValue: currentSavings,
                yearlySavings,
                yearlyBreakdown
        }
        return res.status(200).send({savingsDetails})

    } catch (err) {
    return next(err);
  }
}
