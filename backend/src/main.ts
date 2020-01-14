import express from "express";
import cors from "cors";
import { setRoutes } from "./routes";
import { getWs } from "./websocket";
import uuid from "uuid";
import { setHub } from "./hub";

const app = express();
const PORT = 5001;

app.use(cors());

export type PData = {
  [room_id: string]: MockData;
};
type MockData = {
  room_id: string;
  title: string;
  body: string;
  author: string;
};
const one = uuid(),
  two = uuid();
const mockData: PData = {
  [one]: {
    room_id: one,
    title: "random title",
    body: "hello this is a body papa bless",
    author: "Marc Dwyer"
  },
  [two]: {
    room_id: two,
    title: "second post",
    body: "second body",
    author: "Second author"
  }
};
function main() {
  setRoutes(app);
  const hub = setHub(mockData);
  const wss = getWs(mockData, hub);
  app.listen(PORT, () => console.log(`Listening on ${PORT}`));
}

main();
