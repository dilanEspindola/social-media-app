import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "../../../config";
import { logger } from "../../driving-adapters/logger";
import { User } from "./models";
import { ForMysqlConnection } from "../../ports/driven";

const dbOptions: DataSourceOptions = {
  type: "mysql",
  port: 3307,
  host: config.DB.DB_HOST,
  database: config.DB.DB_NAME,
  username: config.DB.DB_USERNAME,
  password: config.DB.DB_PASSWORD,
  entities: [User],
  synchronize: true,
};

export class MysqlConnection implements ForMysqlConnection {
  private static dbInstance: MysqlConnection;
  private dataSource: DataSource;

  constructor() {
    this.dataSource = new DataSource(dbOptions);
    this.executeDb();
  }

  static getDatabaseInstance() {
    if (!this.dbInstance) {
      return (this.dbInstance = new MysqlConnection());
    }
    return this.dbInstance;
  }

  async executeDb() {
    if (!this.dataSource.isInitialized) {
      return this.dataSource
        .initialize()
        .then(() => {
          logger.info("Database connected");
        })
        .catch((err) => logger.fatal(err));
    }

    return this.dataSource;
  }

  appDataSource() {
    return this.dataSource;
  }
}
