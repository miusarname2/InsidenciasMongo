import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import passport from "passport";
import { crearToken, validarToken } from "./config/JWT.js";
import { reports } from "./routes/reports.routes.js";
import { campers } from "./routes/campers.routes.js";
import { Trainers } from "./routes/trainers.routes.js";

// Environment variables
dotenv.config();

// Initialize server
const index = express();

// Setting
index.set("port", process.env.PORT || 3000);

// Middlewares
index.use(morgan("dev"));
index.use(express.json());
index.use(passport.initialize());

// Routes
index.use("/token", crearToken);

// Rutas para admin (permisos de acceso: admin)
index.use("/admin", validarToken, reports);

// Rutas para camper (permisos de acceso: camper)
index.use("/camper", validarToken, campers);

// Rutas para trainer (permisos de acceso: trainer)
index.use("/trainer", validarToken, Trainers);

// Server
index.listen(index.get("port"), () => {
  console.log("Server on port " + index.get("port"));
});
