import dotenv from "dotenv";

const dotenvResult = dotenv.config();
if (dotenvResult.error) {
  throw dotenvResult.error;
}

import express from "express";
import bodyParser from "body-parser";
import * as http from "http";
import * as winston from "winston";
import * as expressWinston from "express-winston";
import debug from "debug";
import cors from "cors";

import { TodoRoutes } from "./todos/todos.routes.config";

const app: express.Application = express();
const server: http.Server = http.createServer(app);

const port = process.env.PORT || 5200;

const debugLog: debug.IDebugger = debug("app");

app.use(bodyParser.json({ limit: "31mb" }));
app.use(bodyParser.urlencoded({ limit: "31mb", extended: true }));
app.use(cors());

const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
};
if (!process.env.DEBUG) {
  loggerOptions.meta = false;
}
app.use(expressWinston.logger(loggerOptions));
new TodoRoutes(app, "TodoRoutes");

const runningMessage = `Server running at http://localhoost:${port}`;

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send(runningMessage);
});

export default server.listen(port, () => {
  console.log(runningMessage);
});
