import "jest";
import type { Response } from "express";
import ProjectionsService from "../services/ProjectionsService";
import { ProjectionsController } from ".";

jest.mock("../services/ProjectionsService");

const mockedProjectionsService = ProjectionsService as jest.Mocked<
  typeof ProjectionsService
>;
const mockGetProjected = jest.fn();
mockedProjectionsService.getProjectedYearSavingsPerMonth = mockGetProjected;

const mockRequest = (queryData: {
  initialSavings: string;
  interestRate: string;
  monthlyDeposit: string;
}) => {
  return {
    query: { ...queryData },
  };
};
const mockResponse = () => {
  const res: Response | any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("ProjectionsController", () => {
  const controller = new ProjectionsController();

  describe("getProjections()", () => {
    const queryData = {
      initialSavings: "1000",
      interestRate: "5",
      monthlyDeposit: "50",
      years: "50",
    };
    const req = mockRequest(queryData);
    const res = mockResponse();
    const next = jest.fn();

    afterEach(jest.clearAllMocks);

    it("calls ProjectionsService.getProjectedYearSavingsPerMonth", async () => {
      await controller.getProjections(req, res, next);

      expect(mockGetProjected).toHaveBeenCalledTimes(1);
      expect(mockGetProjected).toHaveBeenCalledWith({
        initialSavings: 1000,
        interestRate: 5,
        monthlyDeposit: 50,
        years: 50,
      });
    });

    it("responds with expected success status and data", async () => {
      const mockData = {
        savings: [5000, 6000],
        totalInvested: 10000,
        interestEarned: 1000,
      };
      mockGetProjected.mockReturnValue(mockData);
      await controller.getProjections(req, res, next);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({ data: mockData });
    });

    describe("when an unknown error is thrown", () => {
      const error = new Error();

      it("calls next middleware with error", async () => {
        mockGetProjected.mockImplementation(() => {
          throw error;
        });
        await controller.getProjections(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(error);
      });
    });
  });
});
