import { con } from "../../config/atlas.js";

export async function reportCamper(req, res) {
  const db = await con();
  const reportesInsidencias = db.collection("reportesInsidencias");
  try {
    const Trainer = db.collection("Trainer");
    const trainer = Trainer.findOne({ nombre: req.body.reportante });
    console.log(trainer);
    if (trainer) {
      var result = await reportesInsidencias.insertOne(req.body);
    } else {
      req.body.reportante = `<camper>${reporte.reportante}`;
      var result = await reportesInsidencias.insertOne(req.body);
    }
    if (result.insertedId) {
      res.status(201).send("Enhorabuena,has creado un reporte");
    }else{
      res.status(400).send("Algo paso, intenta nuevamente");
    }
  } catch (error) {
    console.log("algo paso...", error);
  }
}
