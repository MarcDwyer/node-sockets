import WebSocket from "ws";
import express from "express";
import cors from "cors";
import { setRoutes } from "./routes";
import { getWsServer } from "./websocket";

const app = express();
const PORT = 5001;

app.use(cors());

export type MockData = {
  id: number;
  title: string;
  body: string;
  author: string;
};
const mockData: MockData = {
  id: 12345,
  title: "random title",
  body: "hello this is a body papa bless",
  author: "Marc Dwyer"
};

function main() {
  setRoutes(app);
  const wss = getWsServer(mockData);
  console.log(typeof wss.clients);
  app.listen(PORT, () => console.log(`Listening on ${PORT}`));
}

main();
