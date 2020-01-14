import WebSocket from "ws";
import { INITDATA, ROOMCHANGE, PROJECTDATA } from "./shared-vars";
import { PData } from "./main";
import { Hub } from "./hub";
import { stringifyMe, parseMe } from "./helper-funcs";

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
}
class WsServer {
  private data: PData;
  private hub: Hub;
  public readonly wss: WebSocket.Server;
  constructor(data: PData, hub: Hub) {
    this.data = data;
    this.hub = hub;
    this.wss = this.createWSS();
  }
  private createWSS(): WebSocket.Server {
    const wss = new WebSocket.Server({ port: 5000 });
    wss.on("connection", (ws, req) => {
      ws.send(stringifyMe({ type: INITDATA, payload: this.data }));
      this.attachMessageListener(ws, req.connection.remoteAddress);
      this.handleDisconnect(ws);
    });
    return wss;
  }
  private attachMessageListener(ws: MySocket, ip: string) {
    ws.on("message", (data: string) => {
      const { type, payload }: PayloadWS = JSON.parse(data);
      switch (type) {
        case ROOMCHANGE:
          const { room_id } = payload;
          if (payload.prevData) {
            const { prev_room_id } = payload.prevData;
            this.hub.removeFromRoom(prev_room_id, ip);
          }
          this.hub.addToRoom(room_id, ip, ws);
          ws.room_id = room_id;
          ws.send(
            stringifyMe({
              type: PROJECTDATA,
              payload: this.data[room_id]
            })
          );
      }
    });
  }
  private handleDisconnect(ws: MySocket) {
    ws.on("close", () => {
      console.log(ws.room_id || "no id" + " disconnected");
    });
  }
}

export default WsServer;
