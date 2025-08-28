import express from "express";

import * as logsController from "../controllers/logsController.js";

const router = express.Router();

router.get("/logs", logsController.getLogs);

router.post("/logs", logsController.createLog);

router.put("/logs/:id", logsController.updateLog);

router.delete("/logs/:id", logsController.deleteLog);

router.get("/logs/:id", logsController.getLogById);

export default router;
