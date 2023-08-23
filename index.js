import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { reports } from "./routes/reports.routes.js";
import { campers } from "./routes/campers.routes.js";
import { Trainers } from "./routes/trainers.routes.js";

//Enviroment variables
dotenv.config();

//initilize server
const index = express();

//setting
index.set("port", process.env.PORT || 3000);

//Middlewares
index.use(morgan("dev"));
index.use(express.json());

//Routes
index.use("/admin", reports);
index.use("/camper", campers);
index.use("/trainer", Trainers);

//Server
index.listen(index.get("port"), () => {
  console.log("server on port " + index.get("port"));
});
