import WebSocket from "ws";
import express from "express";
import cors from "cors";
import { setRoutes } from "./routes";
import { getWebSocket } from "./websocket";

const app = express();
const PORT = 5001;

app.use(cors());

async function main() {
  setRoutes(app);
  const ws = await getWebSocket();
  ws.send("s8 got was good");
  ws.on("message", (msg: string) => console.log(msg));
  app.listen(PORT, () => console.log(`Listening on ${PORT}`));
}

main();
