import { con } from "../../config/atlas.js";


export async function allReports(req, res, next) {
  const db = await con();
  const reportesInsidencias = db.collection("reportesInsidencias");
  const result = await reportesInsidencias.find().toArray();
  res.send(result);
}
