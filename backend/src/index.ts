import express from "express";
import router from "./app";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import databaseConnection from "./db/db";
dotenv.config({
  path: "./.env",
});
databaseConnection().then((response) => {
  console.log(response);
});
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded());
app.use(router);
app.listen(3000);
