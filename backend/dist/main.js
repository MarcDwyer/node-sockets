"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const websocket_1 = require("./websocket");
const uuid_1 = __importDefault(require("uuid"));
const app = express_1.default();
const PORT = 5001;
app.use(cors_1.default());
const one = uuid_1.default(), two = uuid_1.default();
const mockData = {
    [one]: {
        id: one,
        title: "random title",
        body: "hello this is a body papa bless",
        author: "Marc Dwyer"
    },
    [two]: {
        id: two,
        title: "second post",
        body: "second body",
        author: "Second author"
    }
};
function main() {
    routes_1.setRoutes(app);
    console.log(mockData);
    const wss = websocket_1.getWsServer(mockData);
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
}
main();
//# sourceMappingURL=main.js.map