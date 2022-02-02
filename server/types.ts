import type { Query } from "express-serve-static-core";

interface TypedRequestQuery<T extends Query> extends Express.Request {
  query: T;
}

export type GetProjectionsAPIRequest = TypedRequestQuery<{
  initialSavings: string;
  interestRate: string;
  monthlyDeposit: string;
  years?: string;
}>;
