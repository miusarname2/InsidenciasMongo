import { Router } from "express";
import { allReports } from "../version/Admin/AdminActions.js";

export const reports = Router();

reports.get("/reportsAll", allReports);
