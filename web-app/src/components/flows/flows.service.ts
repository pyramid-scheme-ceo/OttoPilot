import { httpGet } from "../../helpers/base-service";

export function getAllFlows(): Promise<Api.Flow[]> {
  return httpGet<Api.Flow[]>('/api/flows');
}