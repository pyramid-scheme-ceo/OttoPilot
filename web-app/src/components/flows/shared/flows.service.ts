import {httpDelete, httpGet, httpPost, httpPut} from "../../../helpers/base-service";
import { Api } from "../../../models/api-models";

const baseUrl = '/api/flows';

export function getAllFlows(): Promise<Api.ApiResponse<Api.Flow[]>> {
  return httpGet<Api.Flow[]>(baseUrl);
}

export function getFlow(flowId: number): Promise<Api.ApiResponse<Api.Flow>> {
  return httpGet<Api.Flow>(`${baseUrl}/${flowId}`);
}

export function createFlow(flow: Api.Flow): Promise<Api.ApiResponse<Api.CreateResponse>> {
  return httpPost<Api.Flow, Api.CreateResponse>(baseUrl, flow);
}

export function runFlow(flowId: number) {
  return httpPost<{}, void>(`${baseUrl}/${flowId}/run`, {});
}

export function updateFlow(flow: Api.Flow) {
  return httpPut<Api.Flow, void>(`${baseUrl}/${flow.id}`, flow);
}

export function deleteFlow(flowId: number) {
  return httpDelete<void>(`${baseUrl}/${flowId}`);
}