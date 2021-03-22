import { Request, Response, NextFunction } from 'express';

interface calculationsBodyinterface {
    initialSavings: number
    interestRate: number
}

interface postCalculationsInterface {
(req: Request<unknown, unknown, calculationsBodyinterface>,
res: Response,
next: NextFunction) : void 
}

export const postCalculations: postCalculationsInterface = (req, res, next) => {
    try {
        const {
            initialSavings,
            interestRate
        } = req.body;

        let currentSavings = initialSavings;
        let yearlySavings: number[] = [currentSavings]

        for (let year = 1; year <= 50; year+=1 ){
            currentSavings *= (1 + interestRate)
            yearlySavings = [
                ...yearlySavings,
                currentSavings
            ]
        }
        res.status(200).send({yearlySavings})

    } catch (err) {
    next(err);
  }
}
