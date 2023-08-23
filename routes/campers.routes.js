import { Router } from "express";
import { reportCamper } from "../version/camperVersions/camperActions.js";

export const campers = Router();

campers.get("/reportar",reportCamper );
