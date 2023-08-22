import { Router } from "express";
import { con } from "../config/atlas.js";

export const reports = Router();

reports.get("/", async (req, res) => {
  const db = await con();
  const reportesInsidencias = db.collection("reportesInsidencias");
  const result = await reportesInsidencias
    .find()
    .toArray();
  res.send(result);
});
