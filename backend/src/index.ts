import express from "express";
import router from "./app";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import databaseConnection from "./db/db";
import cors from "cors";
dotenv.config({
  path: "./.env",
});
databaseConnection().then((response) => {
  console.log(response);
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded());
app.use(router);
app.listen(3000);
