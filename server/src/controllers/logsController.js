import * as logsService from "../services/logsServices.js";

export const getLogs = async (req, res) => {
  try {
    const logs = await logsService.getLogs();
    res.status(200).json(logs);
  } catch (err) {
    console.error("Error fetching logs:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createLog = async (req, res) => {
  try {
    const logData = req.body;
    const newLog = await logsService.createLog(logData);
    res.status(200).json(newLog);
  } catch (err) {
    console.error("Error creating log:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateLog = async (req, res) => {
  try {
    const logId = req.params.id;
    const logData = req.body;
    const updatedLog = await logsService.updateLog(logId, logData);
    if (!updatedLog) {
      return res.status(404).json({ message: "Log not found" });
    }
    res.status(200).json(updatedLog);
  } catch (err) {
    console.error("Error updating log:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteLog = async (req, res) => {
  try {
    const logId = req.params.id;
    const deletedLog = await logsService.deleteLog(logId);
    if (!deletedLog) {
      return res.status(404).json({ message: "Log not found" });
    }
    res.status(200).send();
  } catch (err) {
    console.error("Error deleting log:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getLogById = async (req, res) => {
  try {
    const logId = req.params.id;
    const log = await logsService.getLogById(logId);

    if (!log) {
      return res.status(404).json({ message: "Log not found" });
    }

    res.status(200).json(log);
  } catch (err) {
    console.error("Error fetching log by ID:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
