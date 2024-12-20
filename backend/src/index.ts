import express from "express";
import router from "./app";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import databaseConnection from "./db/db";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config({
  path: "./.env",
});
/////////////////////////////////////
const port = process.env.PORT;
const app = express();
const server = createServer(app);
/////////////////////////////////////
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded());
app.use(router);
/////////////////////////////////////
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});
io.on("connection", (socket) => {
  console.log("user connected from backend");
  socket.on("ride-requested", (message) => {
    io.emit("ride-requested", message);
  });
  socket.on("ride-accepted", (message) => {
    io.emit("ride-accepted", message);
  });
  socket.on("disconnect", () => {
    console.log("A client disconnected:", socket.id);
  });
});

/////////////////////////////////////
databaseConnection().then((response) => {
  console.log(response);
  server.listen(port, () => {
    console.log(`Server has been started on port ${port}`);
  });
});
