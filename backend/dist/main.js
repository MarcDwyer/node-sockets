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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const websocket_1 = require("./websocket");
const app = express_1.default();
const PORT = 5001;
app.use(cors_1.default());
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        routes_1.setRoutes(app);
        const ws = yield websocket_1.getWebSocket();
        ws.send("s8 got was good");
        ws.on("message", (msg) => console.log(msg));
        app.listen(PORT, () => console.log(`Listening on ${PORT}`));
    });
}
main();
//# sourceMappingURL=main.js.map