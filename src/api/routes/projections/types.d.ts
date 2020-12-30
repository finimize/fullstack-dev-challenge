import { Request, Response, RequestHandler } from 'express'

import { projectionsService } from '../../../services/projections'

import { BaseAPIResponse } from '../base'

type ProjectionsByYear = ReturnType<
    typeof projectionsService.getYearlyProjectionsByInterestRateRange
>

interface ProjectionsAPIResponse extends BaseAPIResponse {
    projections?: ProjectionsByYear
}

type ValidatedQuery = {
    monthly_deposit: number
    initial_savings: number
    start_year: number
    end_year: number
    start_interest: number
    end_interest: number
}

export type GetProjectionsAPIResponse = Response<ProjectionsAPIResponse>

export type GetRequestHandler = RequestHandler<
    {},
    ProjectionsAPIResponse,
    {},
    Partial<ValidatedQuery>
>

export type GetProjectionsAPIRequest = Request<{}, ProjectionsAPIResponse, {}, ValidatedQuery>
