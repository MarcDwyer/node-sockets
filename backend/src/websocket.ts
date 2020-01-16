import WebSocket from "ws";
import { INITDATA, ROOMCHANGE, PROJECTDATA } from "./shared-vars";
import { PData } from "./main";
import { Hub } from "./hub";
import { stringifyMe } from "./helper-funcs";
import uuid from "uuid";

interface PayloadWS {
  type: string;
  payload: {
    room_id: string;
    prevData?: {
      prev_room_id: string;
    };
  };
}
interface MySocket extends WebSocket {
  room_id?: string;
  id: string;
}
export const getWs = (data: PData, hub: Hub): WebSocket.Server => {
  const wss = new WebSocket.Server({ port: 5000 });
  wss.on("connection", (ws: MySocket) => {
    ws.id = uuid();
    ws.send(stringifyMe({ type: INITDATA, payload: data }));
    attachMessageListener(ws, hub, data);
    attachDisconnectListener(ws, hub);
  });
  return wss;
};

const attachMessageListener = (ws: MySocket, hub: Hub, data: PData) => {
  ws.on("message", (msg: string) => {
    const { type, payload }: PayloadWS = JSON.parse(msg);
    switch (type) {
      case ROOMCHANGE:
        const { room_id } = payload;
        if (payload.prevData) {
          const { prev_room_id } = payload.prevData;
          hub.removeFromRoom(prev_room_id, ws.id);
        }
        hub.addToRoom(room_id, ws.id, ws);
        ws.room_id = room_id;
        console.log(hub.rooms);
        ws.send(
          stringifyMe({
            type: PROJECTDATA,
            payload: data[room_id]
          })
        );
    }
  });
};
const attachDisconnectListener = (ws: MySocket, hub: Hub) => {
  ws.on("close", () => {
    if (ws.room_id) {
      const { room_id, id } = ws;
      hub.removeFromRoom(room_id, id);
    }
  });
};
