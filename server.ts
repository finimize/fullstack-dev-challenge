import express, { Request, Response } from "express";
import cors from "cors";
import { query, validationResult } from "express-validator";

import { calculateSavingsOverTime } from "./components/savings-calculator"

const app = express();

app.use(cors());
app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

interface FormParams {
    initialDeposit: string,
    monthlySavings: string,
    interestRate: string,
    periodInYears: string,
}

app.get(
    "/calculate-savings-over-time",
    [
        query("initialDeposit").isNumeric(),
        query("monthlySavings").isNumeric(),
        query("interestRate").isNumeric(),
        query("periodInYears").isNumeric(),
    ],
    (req: Request<undefined, undefined, undefined, FormParams>, res: Response) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json(errors)
        }
        const initialDeposit = parseInt(req.query.initialDeposit)
        const monthlySavings = parseInt(req.query.monthlySavings)
        const interestRate = parseFloat(req.query.interestRate)/100
        const periodInYears = parseInt(req.query.periodInYears)

        const savingsOverTime = calculateSavingsOverTime(periodInYears, initialDeposit, monthlySavings, interestRate)
        return res.status(200).json({
            monthlySavings: savingsOverTime
        })
    });

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});

export default app;
