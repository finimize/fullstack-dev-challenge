import express from "express";
import routes from './server/routes'

const app = express();

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use('/api', routes);

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${String(app.get("port"))}/`); // eslint-disable-line no-console
});
