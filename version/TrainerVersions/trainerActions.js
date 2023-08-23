import { con } from "../../config/atlas.js";

export async function reportTrainer(req, res, next) {
  const db = await con();
  const reportesInsidencias = db.collection("reportes");
  req.body.fechaReporte = new Date (req.body.fechaReporte)
  try {
    var result = await reportesInsidencias.insertOne(req.body);
    res.send(result);
  } catch (error) {
    console.log("algo paso...", error);
  }
}

export async function createTrainer(req, res) {
  try {
    const db = await con();
    console.log(db)
    const trainers = db.collection("Trainer");
    const result = trainers.insertOne(req.body);
    res.status(201).send('success');
  } catch (error) {
    console.log(error,'error')
  }
}
