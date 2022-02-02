import type { Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { ProjectionsService } from "../services";
import type { GetProjectionsAPIRequest } from "../types";

const DEFAULT_YEARS = "50";

class ProjectionsController {
  async getProjections(
    req: GetProjectionsAPIRequest,
    res: Response,
    next: NextFunction
  ) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      initialSavings,
      interestRate,
      monthlyDeposit,
      years = DEFAULT_YEARS,
    } = req.query;

    try {
      const projections = ProjectionsService.getProjectedYearSavingsPerMonth({
        initialSavings: parseInt(initialSavings),
        interestRate: parseFloat(interestRate),
        monthlyDeposit: parseInt(monthlyDeposit),
        years: parseInt(years),
      });
      return res.status(200).json({ data: projections });
    } catch (error) {
      next(error);
    }
  }
}

export default ProjectionsController;
