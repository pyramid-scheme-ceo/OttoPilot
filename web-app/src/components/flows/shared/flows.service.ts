import {httpDelete, httpGet, httpPost, httpPut} from "../../../helpers/base-service";
import { Api } from "../../../models/api-models";

const baseUrl = '/api/flows';

export function getAllFlows(): Promise<Api.ApiResponse<Api.Flow[]>> {
  return httpGet<Api.Flow[]>(baseUrl);
}

export function getFlow(flowId: number): Promise<Api.ApiResponse<Api.Flow>> {
  return httpGet<Api.Flow>(`${baseUrl}/${flowId}`);
}

export function createFlow(flow: Api.Flow) {
  return httpPost<Api.Flow, Api.ApiResponse<Api.CreateResponse>>(baseUrl, flow);
}

export function runFlow(flowId: number) {
  return httpPost<{}, Api.ApiResponse>(`${baseUrl}/${flowId}/run`, {});
}

export function updateFlow(flow: Api.Flow) {
  return httpPut<Api.Flow, Api.ApiResponse>(`${baseUrl}/${flow.id}`, flow);
}

export function deleteFlow(flowId: number) {
  return httpDelete<Api.ApiResponse>(`${baseUrl}/${flowId}`);
}