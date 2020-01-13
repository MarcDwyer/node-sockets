"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const shared_vars_1 = require("./shared-vars");
const helper_funcs_1 = require("./helper-funcs");
// type Hub = {
//   [room: string]: WebSocket;
// };
// const hub = {};
const doSomething = () => {
    console.log("balls");
};
exports.getWsServer = (mockData) => {
    const wss = new ws_1.default.Server({ port: 5000 });
    wss.on("connection", ws => {
        ws.send(JSON.stringify({ type: shared_vars_1.INITDATA, payload: mockData }));
        ws.on("message", (data) => {
            const { type, payload } = JSON.parse(data);
            switch (type) {
                case shared_vars_1.BODYCHANGE:
                    mockData.body = payload;
                    helper_funcs_1.debounce(doSomething, 5500)();
                    wss.clients.forEach(client => {
                        if (client !== ws && client.readyState === ws_1.default.OPEN) {
                            client.send(JSON.stringify({ type: shared_vars_1.BODYCHANGE, payload: mockData.body }));
                        }
                    });
            }
        });
    });
    return wss;
};
//# sourceMappingURL=websocket.js.map