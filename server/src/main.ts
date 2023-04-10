import { Server } from "./infrastructure/driving-adapters/api";

function main() {
  const server = new Server();
  server.executeServer();
}

main();
