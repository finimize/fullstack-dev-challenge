import type { Schema } from "express-validator";

const projectionSchema: Schema = {
  initialSavings: {
    notEmpty: true,
    isNumeric: true,
    errorMessage: "Savings field cannot be empty",
  },
  interestRate: {
    notEmpty: true,
    isNumeric: true,
    errorMessage: "interestRate field cannot be empty",
  },
  monthlyDeposit: {
    notEmpty: true,
    isNumeric: true,
    errorMessage: "monthlyDeposit field cannot be empty",
  },
};

export default projectionSchema;
