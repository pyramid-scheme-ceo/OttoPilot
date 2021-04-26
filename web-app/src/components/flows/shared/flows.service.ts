import {httpGet, httpPost} from "../../../helpers/base-service";
import { Api } from "../../../models/api-models";

export function getAllFlows(): Promise<Api.Flow[]> {
  return httpGet<Api.Flow[]>('/api/flows');
}

export function getFlow(flowId: number): Promise<Api.Flow> {
  return httpGet<Api.Flow>(`/api/flows/${flowId}`);
}

export function createFlow(flow: Api.Flow) {
  return httpPost<Api.Flow, void>('/api/flows', flow);
}

export function runFlow(flowId: number) {
  return httpPost<{}, void>(`/api/flows/${flowId}/run`, {});
}
