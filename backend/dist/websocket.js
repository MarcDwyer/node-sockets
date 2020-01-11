"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
exports.getWebSocket = () => __awaiter(void 0, void 0, void 0, function* () {
    let websocket;
    const wsPromise = () => {
        return new Promise(resolve => {
            const wss = new ws_1.default.Server({ port: 5000 });
            wss.on("connection", ws => {
                websocket = ws;
                resolve();
            });
        });
    };
    yield wsPromise();
    return websocket;
});
//# sourceMappingURL=websocket.js.map