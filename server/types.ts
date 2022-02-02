import type { ValidationError } from "express-validator";
import type { Query, Send } from "express-serve-static-core";

interface TypedRequestQuery<T extends Query> extends Express.Request {
  query: T;
}
interface TypedResponse<ResBody> extends Express.Response {
  json: Send<ResBody, this>;
}

export type GetProjectionsAPIRequest = TypedRequestQuery<{
  initialSavings: string;
  interestRate: string;
  monthlyDeposit: string;
  years?: string;
}>;

export type GetProjectionsAPIResponse = TypedResponse<{
  data?: string[];
  errors?: ValidationError[];
}>;
