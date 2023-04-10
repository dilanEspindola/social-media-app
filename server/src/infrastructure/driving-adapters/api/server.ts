import express, { Express } from "express";
import cors from "cors";
import { router } from "./routes";
import { MysqlConnection } from "../../driven-adapters/database";
import { logger } from "../logger";

export class Server {
  private app: Express;
  private PORT = process.env.PORT || 4000;

  constructor() {
    this.app = express();
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
