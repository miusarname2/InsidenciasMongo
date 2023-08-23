import { con } from "../../config/atlas.js";

export async function reportCamper(req, res) {
  const db = await con();
  const reportesInsidencias = db.collection("reportesInsidencias");

  try {
    // En lugar de modificar directamente req.body.fechaReporte,
    // se crea un nuevo objeto para evitar cambios no deseados.
    const reporte = {
      ...req.body,
      fechaReporte: new Date(req.body.fechaReporte),
    };

    const trainer = await db
      .collection("Trainer")
      .findOne({ nombre: reporte.reportante });

    if (trainer) {
      const result = await reportesInsidencias.insertOne(reporte);
      res.send(result);
    } else {
      // Agregar "<camper>" antes del contenido original
      reporte.reportante = `<camper>${reporte.reportante}`;
      const result = await reportesInsidencias.insertOne(reporte);
      res.send(result);
    }
  } catch (error) {
    console.log("Algo salió mal...", error);
    res.status(500).send("Error en el servidor");
  }
}
