import chai from "chai";
import chaiHttp from "chai-http";
import "mocha";

import app from "./server";

chai.use(chaiHttp);
chai.should();

describe("api", () => {
    describe("GET /calculate-savings-over-time", () => {
        it("should return yearly list of compound savings", (done) => {
            chai.request(app)
                .get("/calculate-savings-over-time?initialDeposit=100&monthlySavings=20&interestRate=1&periodInYears=3")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    chai.expect(res.body.monthlySavings).to.eql([342, 587, 834])
                    done();
                });
        });

        it("should return error for invalid types", (done) => {
            chai.request(app)
                .get("/calculate-savings-over-time?initialDeposit=a&monthlySavings=something&interestRate=wrong&periodInYears=3")
                .end((err, res) => {
                    res.should.have.status(400);
                    res.should.be.json;
                    chai.expect(res.body.errors).to.eql([
                        {
                            "location": "query",
                            "msg": "Invalid value",
                            "param": "initialDeposit",
                            "value": "a",
                        },
                        {
                            "location": "query",
                            "msg": "Invalid value",
                            "param": "monthlySavings",
                            "value": "something",
                        },
                        {
                            "location": "query",
                            "msg": "Invalid value",
                            "param": "interestRate",
                            "value": "wrong",
                        }
                    ])
                    done();
                });
        });
    });
});
