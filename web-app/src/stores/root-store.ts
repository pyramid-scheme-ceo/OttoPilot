import { Api } from "../models/api-models";
import {makeAutoObservable} from "mobx";

class RootStore {
  loading: boolean;
  
  constructor() {
    makeAutoObservable(this);
    
    this.loading = false;
  }
  
  setLoading(loading: boolean): void {
    this.loading = loading;
  }

  executeServiceRequest<TResponse>(action: () => Promise<Api.ApiResponse<TResponse>>): Promise<void | TResponse> {
    this.setLoading(true);
    
    return action()
      .then(result => {
        if (!result.successful) {
          throw new Error(result.message);
        }

        return result.data;
      })
      .catch(err => {
        console.error(err.message || 'Unexpected error');
      })
      .finally(() => this.setLoading(false));
  }
}

export default RootStore;