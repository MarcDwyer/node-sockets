import WebSocket from "ws";
import { BODYCHANGE, INITDATA, WSBODYCHANGE } from "./shared-vars";
import { MockData } from "./main";

type Payload = {
  type: string;
  data: string;
};
// type Hub = {
//   [room: string]: WebSocket;
// };
// const hub = {};

export const getWsServer = (mockData: MockData): WebSocket.Server => {
  const wss = new WebSocket.Server({ port: 5000 });
  wss.on("connection", ws => {
    ws.send(JSON.stringify({ type: INITDATA, payload: mockData }));
    ws.on("message", (data: string) => {
      const { type, payload } = JSON.parse(data);
      console.log({ type, payload });
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
