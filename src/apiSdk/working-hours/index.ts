import axios from 'axios';
import queryString from 'query-string';
import { WorkingHourInterface, WorkingHourGetQueryInterface } from 'interfaces/working-hour';
import { GetQueryInterface } from '../../interfaces';

export const getWorkingHours = async (query?: WorkingHourGetQueryInterface) => {
  const response = await axios.get(`/api/working-hours${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createWorkingHour = async (workingHour: WorkingHourInterface) => {
  const response = await axios.post('/api/working-hours', workingHour);
  return response.data;
};

export const updateWorkingHourById = async (id: string, workingHour: WorkingHourInterface) => {
  const response = await axios.put(`/api/working-hours/${id}`, workingHour);
  return response.data;
};

export const getWorkingHourById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/working-hours/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteWorkingHourById = async (id: string) => {
  const response = await axios.delete(`/api/working-hours/${id}`);
  return response.data;
};
