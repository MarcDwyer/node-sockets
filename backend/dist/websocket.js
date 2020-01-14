"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const shared_vars_1 = require("./shared-vars");
const helper_funcs_1 = require("./helper-funcs");
const uuid_1 = __importDefault(require("uuid"));
exports.getWs = (data, hub) => {
    const wss = new ws_1.default.Server({ port: 5000 });
    wss.on("connection", (ws) => {
        ws.id = uuid_1.default();
        ws.send(helper_funcs_1.stringifyMe({ type: shared_vars_1.INITDATA, payload: data }));
        attachMessageListener(ws, hub, data);
        attachDisconnectListener(ws, hub);
    });
    return wss;
};
const attachMessageListener = (ws, hub, data) => {
    ws.on("message", (msg) => {
        const { type, payload } = JSON.parse(msg);
        switch (type) {
            case shared_vars_1.ROOMCHANGE:
                const { room_id } = payload;
                if (payload.prevData) {
                    const { prev_room_id } = payload.prevData;
                    hub.removeFromRoom(prev_room_id, ws.id);
                }
                hub.addToRoom(room_id, ws.id, ws);
                ws.room_id = room_id;
                console.log(data[room_id]);
                ws.send(helper_funcs_1.stringifyMe({
                    type: shared_vars_1.PROJECTDATA,
                    payload: data[room_id]
                }));
        }
    });
};
const attachDisconnectListener = (ws, hub) => {
    ws.on("close", () => {
        if (ws.room_id) {
            const { room_id, id } = ws;
            hub.removeFromRoom(room_id, id);
        }
    });
};
// class WsServer {
//   private data: PData;
//   private hub: Hub;
//   public readonly wss: WebSocket.Server;
//   constructor(data: PData, hub: Hub) {
//     this.data = data;
//     this.hub = hub;
//     this.wss = this.createWSS();
//   }
//   private createWSS(): WebSocket.Server {
//     const wss = new WebSocket.Server({ port: 5000 });
//     wss.on("connection", (ws: MySocket, req) => {
//       ws.id = uuid();
//       ws.send(stringifyMe({ type: INITDATA, payload: this.data }));
//       this.attachMessageListener(ws);
//       this.handleDisconnect(ws);
//     });
//     return wss;
//   }
//   private attachMessageListener(ws: MySocket) {
//     ws.on("message", (data: string) => {
//       const { type, payload }: PayloadWS = JSON.parse(data);
//       switch (type) {
//         case ROOMCHANGE:
//           const { room_id } = payload;
//           if (payload.prevData) {
//             const { prev_room_id } = payload.prevData;
//             this.hub.removeFromRoom(prev_room_id, ws.id);
//           }
//           this.hub.addToRoom(room_id, ws.id, ws);
//           ws.room_id = room_id;
//           ws.send(
//             stringifyMe({
//               type: PROJECTDATA,
//               payload: this.data[room_id]
//             })
//           );
//       }
//     });
//   }
//   private handleDisconnect(ws: MySocket) {
//     ws.on("close", () => {
//       if (ws.room_id) {
//         const { room_id, id } = ws;
//         this.hub.removeFromRoom(room_id, id);
//       }
//     });
//   }
// }
// export default WsServer;
//# sourceMappingURL=websocket.js.map