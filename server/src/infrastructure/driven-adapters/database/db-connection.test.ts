import { describe, it, expect } from "vitest";
import { MysqlConnection } from "./dbConnection";

describe("Mysql connection", () => {
  const mysqlConnection = MysqlConnection.getDatabaseInstance();

  it("should initialize the datasource", async () => {
    const dataSource = mysqlConnection.executeDb();
    expect(dataSource).toBeDefined();
  });
});
