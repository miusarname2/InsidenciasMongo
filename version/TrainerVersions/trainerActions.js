import { con } from "../../config/atlas.js";

export async function reportTrainer(req, res, next) {
  const db = await con();
  const reportesInsidencias = db.collection("reportesInsidencias");
  try {
    const trainer = db.Trainer.findOne({ nombre: req.body.reportante });
    console.log(trainer);
    if (trainer) {
      result = reportesInsidencias.insertOne(req.body);
    } else {
      req.body.reportante = `<camper>${reporte.reportante}`;
      result = reportesInsidencias.insertOne(req.body);
    }
    res.send(result);
  } catch (error) {
    console.log("algo paso...", error);
  }
}

export async function createTrainer(req, res) {
  try {
    const db = await con();
    const trainers = db.collection("Trainer");
    const result = trainers.insertOne(req.body);
    res.status(201).send('success');
  } catch (error) {
    console.log(error,'error')
  }
}
