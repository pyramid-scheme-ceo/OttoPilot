import { httpGet } from "../../helpers/base-service";
import { Api } from "../../models/api-models";

export function getAllFlows(): Promise<Api.Flow[]> {
  return httpGet<Api.Flow[]>('/api/flows');
}