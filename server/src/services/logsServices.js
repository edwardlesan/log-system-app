import { query } from "../db.js";

export const getLogs = async () => {
  const { rows } = await query("SELECT * FROM logs ORDER BY created_at DESC");
  return rows;
};

export const createLog = async (logData) => {
  const { owner, log_text } = logData;

  const insertQuery = `
    INSERT INTO logs (owner, log_text)
    VALUES ($1, $2)
    RETURNING *
  `;

  const { rows } = await query(insertQuery, [owner, log_text]);

  return rows[0];
};

export const updateLog = async (logId, logData) => {
  const { owner, log_text } = logData;

  const { rows } = await query(
    `UPDATE logs 
     SET owner = $1, 
         log_text = $2
     WHERE id = $3
     RETURNING *`,
    [owner, log_text, logId]
  );

  return rows[0];
};

export const deleteLog = async (logId) => {
  const { rowCount } = await query(`DELETE FROM logs WHERE id = $1`, [logId]);
  return rowCount > 0;
};

export const getLogById = async (logId) => {
  const { rows } = await query(`SELECT * FROM logs WHERE id = $1`, [logId]);

  return rows[0] || null;
};
