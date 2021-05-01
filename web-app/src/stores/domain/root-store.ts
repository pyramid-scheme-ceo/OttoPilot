import UiStore from "../ui/ui-store";
import { Api } from "../../models/api-models";

class RootStore {
  uiStore: UiStore;
  
  constructor(uiStore: UiStore) {
    this.uiStore = uiStore;
  }

  executeServiceRequest<TResponse>(action: () => Promise<Api.ApiResponse<TResponse>>): Promise<void | TResponse> {
    this.uiStore.setLoading(true);
    
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
      .finally(() => this.uiStore.setLoading(false));
  }
}

export default RootStore;