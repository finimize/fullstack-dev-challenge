import express from "express";
import cors from 'cors';

const app = express();

app.set("port", process.env.PORT || 3001);

//app.use(cors({origin: 'https://localhost:3000'}))
// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
