import WebSocket from "ws";
import { BODYCHANGE, INITDATA, WSBODYCHANGE } from "./shared-vars";
import { MockData } from "./main";
import { debounce } from "./helper-funcs";

type Data = {
  type: string;
  payload: any;
};
// type Hub = {
//   [room: string]: WebSocket;
// };
// const hub = {};
const doSomething = () => {
  console.log("balls");
};
export const getWsServer = (mockData: MockData): WebSocket.Server => {
  const wss = new WebSocket.Server({ port: 5000 });
  wss.on("connection", ws => {
    ws.send(JSON.stringify({ type: INITDATA, payload: mockData }));
    ws.on("message", (data: string) => {
      const { type, payload }: Data = JSON.parse(data);
      switch (type) {
        case BODYCHANGE:
          mockData.body = payload;
          wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(
                JSON.stringify({ type: BODYCHANGE, payload: mockData.body })
              );
            }
          });
      }
    });
  });
  return wss;
};
