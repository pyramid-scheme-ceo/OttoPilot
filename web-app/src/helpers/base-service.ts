import axios from 'axios';
import dotenv from 'dotenv';
import { Api } from "../models/api-models";

dotenv.config();

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_HOSTNAME,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function httpGet<TR>(url: string, unwrapApiResponse: boolean = true): Promise<TR> {
  return axiosInstance.get<Api.ApiResponse<TR>>(url).then(result => result.data.data);
}

export function httpPost<T, TR>(url: string, data: T): Promise<TR> {
  return axiosInstance.post<T, Api.ApiResponse<TR>>(url, data).then(result => result.data);
}

export function httpPut<T, TR>(url: string, data: T): Promise<TR> {
  return axiosInstance.put<T, Api.ApiResponse<TR>>(url, data).then(result => result.data);
}

export function httpDelete<TR>(url: string): Promise<TR> {
  return axiosInstance.delete<TR>(url).then(result => result.data);
}