import { DataSource } from "typeorm";

export interface ForMysqlConnection {
  executeDb(): Promise<void | DataSource>;
  appDataSource(): DataSource;
}
