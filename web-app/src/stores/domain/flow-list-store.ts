import RootStore from "./root-store";
import { Api } from "../../models/api-models";
import { makeAutoObservable, runInAction } from "mobx";
import { getAllFlows } from "../../components/flows/shared/flows.service";

export default class FlowListStore {
  rootStore: RootStore
  flows: Api.Flow[];
  
  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    
    this.rootStore = rootStore;
    this.flows = [];
  }

  /**
   * Retrieves all flows from the server and loads them into the store
   */
  fetchFlows() {
    this.rootStore.executeServiceRequest<Api.Flow[]>(() => getAllFlows())
      .then(flows => flows && runInAction(() => this.flows = flows));
  }
}