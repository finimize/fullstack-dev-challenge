import type { NextFunction } from "express";
import { validationResult } from "express-validator";
import { ProjectionsService } from "../services";
import type {
  GetProjectionsAPIRequest,
  GetProjectionsAPIResponse,
} from "../types";

class ProjectionsController {
  async getProjections(
    req: GetProjectionsAPIRequest,
    res: GetProjectionsAPIResponse,
    next: NextFunction
  ) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // @ts-ignore:next-line
      return res.status(400).json({ errors: errors.array() });
    }

    const { initialSavings, interestRate, monthlyDeposit } = req.query;

    try {
      const projections = ProjectionsService.getProjected50YearSavingsPerMonth({
        initialSavings: parseInt(initialSavings),
        interestRate: parseFloat(interestRate),
        monthlyDeposit: parseInt(monthlyDeposit),
      });
      // @ts-ignore:next-line
      return res.status(200).json({ data: projections });
    } catch (error) {
      next(error);
    }
  }
}

export default ProjectionsController;
