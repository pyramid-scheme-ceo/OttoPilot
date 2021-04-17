import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const axiosInstance = axios.create({
  baseURL: process.env.API_HOSTNAME,
});

export function httpGet<TR>(url: string): Promise<TR> {
  return axiosInstance.get<TR>(url).then(result => result.data);
}

export function httpPost<T, TR>(url: string, data: T): Promise<TR> {
  return axiosInstance.post<T, TR>(url);
}