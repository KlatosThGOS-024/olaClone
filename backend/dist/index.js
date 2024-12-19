"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const db_1 = __importDefault(require("./db/db"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
dotenv_1.default.config({
    path: "./.env",
});
/////////////////////////////////////
const port = process.env.PORT;
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
/////////////////////////////////////
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded());
app.use(app_1.default);
/////////////////////////////////////
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        credentials: true,
    },
});
io.on("connection", (socket) => {
    console.log("user connected from backend");
    socket.on("ride-requested", (message) => {
        io.emit("ride-requested", message);
        console.log("user message:", message);
    });
    socket.on("ride-accepted", (message) => {
        io.emit("ride-accepted", message);
    });
    socket.on("disconnect", () => {
        console.log("A client disconnected:", socket.id);
    });
});
/////////////////////////////////////
(0, db_1.default)().then((response) => {
    console.log(response);
    server.listen(port, () => {
        console.log(`Server has been started on port ${port}`);
    });
});
