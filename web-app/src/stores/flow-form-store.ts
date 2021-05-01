import RootStore from "./root-store";
import {makeAutoObservable, runInAction} from "mobx";
import { Api } from "../models/api-models";
import {getFlow} from "../components/flows/shared/flows.service";

const defaultFlow: Api.Flow = {
  id: 0,
  name: '',
  steps: [],
};

export default class FlowFormStore {
  rootStore: RootStore;
  flow: Api.Flow;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);

    this.rootStore = rootStore;
    this.flow = defaultFlow;
  }
  
  setFlow(flow: Api.Flow) {
    this.flow = flow;
  }
  
  fetchFlow(flowId: number) {
    this.rootStore.executeServiceRequest<Api.Flow>(() => getFlow(flowId))
      .then(flow => flow && runInAction(() => this.flow = flow));
  }
}