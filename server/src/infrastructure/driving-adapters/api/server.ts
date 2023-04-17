import express, { Express } from "express";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import { router } from "./routes";
import { MysqlConnection } from "../../driven-adapters/database";
import { logger } from "../logger";
import "../../driven-adapters/passport/google-strategy.passport";

export class Server {
  private app: Express;
  private PORT = process.env.PORT || 4000;

  constructor() {
    this.app = express();
    this.app.use(
      session({
        secret: "secret_session",
        name: "session",
        resave: false,
        saveUninitialized: false,
      })
    );
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use(cors({ origin: "*" }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use("/api", router);
  }

  executeServer() {
    this.app.listen(this.PORT, async () => {
      MysqlConnection.getDatabaseInstance();
      logger.info(`Server running on port ${this.PORT}`);
    });
  }
}
