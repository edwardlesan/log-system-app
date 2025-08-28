"use server";

import axios from "axios";
import { TLog } from "../_models/model";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchLogs = async (): Promise<TLog[]> => {
  const { data } = await axios.get<TLog[]>(`${API_URL}/logs`);
  return data;
};

export const getLogById = async (id: number): Promise<TLog> => {
  const { data } = await axios.get<TLog>(`${API_URL}/logs/${id}`);
  return data;
};

export const createLog = async (logData: Partial<TLog>): Promise<TLog> => {
  const { data } = await axios.post<TLog>(`${API_URL}/logs`, logData);
  return data;
};

export const updateLog = async (
  id: number,
  logData: Partial<TLog>
): Promise<TLog> => {
  const { data } = await axios.put<TLog>(`${API_URL}/logs/${id}`, logData);
  return data;
};

export const deleteLog = async (id: number): Promise<boolean> => {
  await axios.delete(`${API_URL}/logs/${id}`);
  return true;
};
