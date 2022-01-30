import { Router } from "express";
import { checkSchema } from "express-validator";
import { ProjectionsController } from "../controllers";
import { ProjectionsSchema } from "../validationSchemas";

const apiV1 = Router();
const API_VERSION = "v1";
const projectionsController = new ProjectionsController();

apiV1.get(
  `/${API_VERSION}/projections`,
  checkSchema(ProjectionsSchema),
  projectionsController.getProjections.bind(projectionsController)
);

export default apiV1;
