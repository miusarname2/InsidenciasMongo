import express from "express";
import { index } from "./Middleware/index.js";
import dotenv from "dotenv";

//Enviroment variables
dotenv.config();

//initilize server
const index = express();

//setting
index.set("port", process.env.PORT || 3000);

//Middlewares
index.use(morgan("dev"))
index.use(express.json())

//Routes


//Server
index.listen(app.get("port"), () => {
  console.log("server on port " + app.get("port"));
});