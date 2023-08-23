import { Router } from "express";
import {
  createTrainer,
  reportTrainer,
} from "../version/TrainerVersions/trainerActions.js";

export const Trainers = Router();

Trainers.get("/reportar", reportTrainer);

Trainers.post("/crear", createTrainer);
