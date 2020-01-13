import express from "express";
import cors from "cors";
import { setRoutes } from "./routes";
import { getWsServer } from "./websocket";
import uuid from "uuid";

const app = express();
const PORT = 5001;

app.use(cors());

export type PData = {
  [id: string]: MockData;
};
type MockData = {
  id: string;
  title: string;
  body: string;
  author: string;
};
const one = uuid(),
  two = uuid();
const mockData: PData = {
  [one]: {
    id: one,
    title: "random title",
    body: "hello this is a body papa bless",
    author: "Marc Dwyer"
  },
  [two]: {
    id: two,
    title: "second post",
    body: "second body",
    author: "Second author"
  }
};

function main() {
  setRoutes(app);
  console.log(mockData);
  const wss = getWsServer(mockData);
  app.listen(PORT, () => console.log(`Listening on ${PORT}`));
}

main();
