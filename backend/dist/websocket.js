"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const shared_vars_1 = require("./shared-vars");
const helper_funcs_1 = require("./helper-funcs");
const uuid_1 = __importDefault(require("uuid"));
class WsServer {
    constructor(data, hub) {
        this.data = data;
        this.hub = hub;
        this.wss = this.createWSS();
    }
    createWSS() {
        const wss = new ws_1.default.Server({ port: 5000 });
        wss.on("connection", (ws, req) => {
            ws.id = uuid_1.default();
            ws.send(helper_funcs_1.stringifyMe({ type: shared_vars_1.INITDATA, payload: this.data }));
            this.attachMessageListener(ws);
            this.handleDisconnect(ws);
        });
        return wss;
    }
    attachMessageListener(ws) {
        ws.on("message", (data) => {
            const { type, payload } = JSON.parse(data);
            switch (type) {
                case shared_vars_1.ROOMCHANGE:
                    const { room_id } = payload;
                    if (payload.prevData) {
                        const { prev_room_id } = payload.prevData;
                        this.hub.removeFromRoom(prev_room_id, ws.id);
                    }
                    this.hub.addToRoom(room_id, ws.id, ws);
                    ws.room_id = room_id;
                    ws.send(helper_funcs_1.stringifyMe({
                        type: shared_vars_1.PROJECTDATA,
                        payload: this.data[room_id]
                    }));
            }
        });
    }
    handleDisconnect(ws) {
        ws.on("close", () => {
            if (ws.room_id) {
                const { room_id, id } = ws;
                this.hub.removeFromRoom(room_id, id);
            }
        });
    }
}
exports.default = WsServer;
//# sourceMappingURL=websocket.js.map