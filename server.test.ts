import { app } from "./server";
import request from "supertest";

describe("Endpoints", () => {
  it("GET /calculation should return nulls if query params not passed for calculation", () => {
    return request(app)
      .get("/calculation")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual({
          data: {
            amount: [
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
            ],
            year: [
              0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
              19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
              35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
            ],
          },
        });
      });
  });

  it("GET /calculation should return values when query parameters provided", () => {
    return request(app)
      .get("/calculation?initial=1000&monthlyDeposit=100&interestRate=3")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual({
          data: {
            amount: [
              1000, 2247.0542334537763, 3532.0388147410854, 4856.107431687347,
              6220.448862637171, 7626.288043766081, 9074.88716885553,
              10567.546822518643, 12105.607147894101, 13690.449049856552,
              15323.495434823812, 17006.212488274, 18740.11099111954,
              20526.747676120034, 22367.72662555159, 24264.700711387737,
              26219.3730792847, 28233.498677703647, 30308.8858335425,
              32447.397875692186, 34650.954807974915, 36921.53503296641,
              39261.17712824991, 41671.981676696574, 44156.1131524157,
              46715.80186406776, 49353.345957285426, 52071.113477999876,
              54871.54449852529, 57757.15330831027, 60730.5306713229,
              63794.34615209652, 66951.35051252428, 70204.37818155457,
              73556.34980000452, 77010.27484277656, 80569.25432083201,
              84236.48356534807, 88015.25509655729, 91908.96157984574,
              95921.09887176374, 100055.26915868378, 104315.18419092387,
              108704.66861523979, 113227.66340867821, 117888.22941687386,
              122690.55099996735, 127638.93978941704, 132737.83855907785,
              137991.82521402306,
            ],
            year: [
              0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
              19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
              35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
            ],
          },
        });
      });
  });
});
