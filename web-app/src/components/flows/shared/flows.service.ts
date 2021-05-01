import {httpDelete, httpGet, httpPost, httpPut} from "../../../helpers/base-service";
import { Api } from "../../../models/api-models";

export function getAllFlows(): Promise<Api.Flow[]> {
  return httpGet<Api.Flow[]>('/api/flows');
}

export function getFlow(flowId: number): Promise<Api.Flow> {
  return httpGet<Api.Flow>(`/api/flows/${flowId}`);
}

export function createFlow(flow: Api.Flow) {
  return httpPost<Api.Flow, Api.ApiResponse>('/api/flows', flow);
}

export function runFlow(flowId: number) {
  return httpPost<{}, Api.ApiResponse>(`/api/flows/${flowId}/run`, {});
}

export function updateFlow(flow: Api.Flow) {
  return httpPut<Api.Flow, Api.ApiResponse>(`/api/flows/${flow.id}`, flow);
}

export function deleteFlow(flowId: number) {
  return httpDelete<Api.ApiResponse>(`/api/flows/${flowId}`);
}