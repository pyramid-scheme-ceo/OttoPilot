import RootStore from "./root-store";
import {makeAutoObservable, runInAction} from "mobx";
import { Api } from "../models/api-models";
import {createFlow, getFlow, updateFlow, deleteFlow, runFlow} from "../components/flows/shared/flows.service";
import {StepType} from "../models/enums";

const defaultFlow: Api.Flow = {
  id: 0,
  name: '',
  steps: [],
};

export default class FlowFormStore {
  rootStore: RootStore;
  flow: Api.Flow;
  addStepModalShown: boolean;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);

    this.rootStore = rootStore;
    this.flow = defaultFlow;
    this.addStepModalShown = false;
  }
  
  setFlow(flow: Api.Flow) {
    this.flow = flow;
  }
  
  fetchFlow(flowId: number) {
    this.rootStore.executeServiceRequest<Api.Flow>(() => getFlow(flowId))
      .then(flow => flow && runInAction(() => this.flow = flow));
  }
  
  saveFlow(onCreate?: (id: number) => void) {
    if (this.flow.id > 0) {
      this.updateFlow();
    } else {
      this.createFlow(onCreate!);
    }
  }
  
  deleteFlow() {
    this.rootStore.executeServiceRequest<void>(() => deleteFlow(this.flow.id))
      .then(() => {});
  }
  
  startFlowRun() {
    this.rootStore.executeServiceRequest<void>(() => runFlow(this.flow.id))
      .then(() => {});
  }
  
  showAddStepModal() {
    this.addStepModalShown = true;
  }
  
  hideAddStepModal() {
    this.addStepModalShown = false;
  }
  
  addStepAndCloseModal(stepType: StepType) {    
    const newStep: Api.Step = {
      stepType,
      order: this.flow.steps.length,
      name: '',
      serialisedParameters: '',
    };
    
    this.flow.steps.push(newStep);
    
    this.hideAddStepModal();
  }
  
  deleteStep(order: number) {
    
  }
  
  updateStep(order: number, step: Api.Step) {
    this.flow.steps[order] = step;
  }
  
  updateStepConfiguration<T>(order: number, configuration: T) {
    this.flow.steps[order].serialisedParameters = JSON.stringify(configuration);
  }
  
  private updateFlow() {
    this.rootStore.executeServiceRequest<void>(() => updateFlow(this.flow));
  }
  
  private createFlow(onCreate: (id: number) => void) {
    this.rootStore.executeServiceRequest<Api.CreateResponse>(() => createFlow(this.flow))
      .then(response => response && onCreate(response.id));
  }
}