import express from "express";
import type { Request, Response } from "express";

export const app = express();

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

type Projection = {
  year: Array<number>;
  amount: Array<number>;
};

type RequestParams = {
  initial: string;
  monthlyDeposit: string;
  interestRate: string;
};

type ResponseType = {
  data: Projection;
};

const calculationHandler = (
  req: Request<{}, {}, {}, RequestParams>,
  res: Response<ResponseType>
) => {
  const initial = parseFloat(req.query.initial);
  const monthlyDeposit = parseFloat(req.query.monthlyDeposit);
  const interestRate = parseFloat(req.query.interestRate) / 100;

  const data: Projection = { year: [], amount: [] };

  const monthlyInterestRate = interestRate / 12;

  for (let year = 0; year < 50; year++) {
    const months = year * 12;
    const yearAmount =
      (monthlyDeposit * (Math.pow(1 + monthlyInterestRate, months) - 1)) /
        monthlyInterestRate +
      initial * Math.pow(1 + monthlyInterestRate, months);

    data.year.push(year);
    data.amount.push(yearAmount);
  }

  res.json({
    data: data,
  });
};

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // Adding this so I can run server and client on localhost
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/calculation", calculationHandler);

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
