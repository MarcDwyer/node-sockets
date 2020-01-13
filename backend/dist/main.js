"use strict";
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
const mockData = {
    id: 12345,
    title: "random title",
    body: "hello this is a body papa bless",
    author: "Marc Dwyer"
};
function main() {
    routes_1.setRoutes(app);
    const wss = websocket_1.getWsServer(mockData);
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
}
main();
//# sourceMappingURL=main.js.map