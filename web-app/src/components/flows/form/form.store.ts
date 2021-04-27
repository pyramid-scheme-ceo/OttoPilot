import React from 'react';
import {Api} from "../../../models/api-models";
import {makeAutoObservable, runInAction} from "mobx";
import {createFlow, getFlow, runFlow, updateFlow} from "../shared/flows.service";

export default class FormStore {
  flowModel: Api.Flow;
  stepModelHidden: boolean;
  loading: boolean;
  nextOrder: number;
  
  constructor() {
    this.flowModel = {
      id: 0,
      name: '',
      steps: [],
    }
    this.stepModelHidden = true;
    this.loading = false;
    this.nextOrder = 0;
    
    makeAutoObservable(this);
  }
  
  setFlow(flow: Api.Flow) {
    this.flowModel = flow;
  }
  
  showStepModal() {
    this.stepModelHidden = false;
  }
  
  hideStepModal() {
    this.stepModelHidden = true;
  }
  
  addStepAndHideModal(stepType: number) {
    this.flowModel.steps.push({
      stepType,
      name: 'New Step',
      order: this.nextOrder,
      serialisedParameters: '',
    });
    
    this.nextOrder++;
    this.hideStepModal();
  }
  
  updateStep(order: number, step: Api.Step) {
    this.flowModel.steps[order] = step;
  }
  
  updateStepConfiguration<T>(order: number, config: T) {
    this.flowModel.steps[order] = {
      ...this.flowModel.steps[order],
      serialisedParameters: JSON.stringify(config),
    };
  }
  
  deleteStep(order: number) {
    this.flowModel.steps.splice(order, 1);
    this.nextOrder--;
  }
  
  saveCurrentFlow() {
    if (this.flowModel.id > 0) {
      updateFlow(this.flowModel);
    } else {
      createFlow(this.flowModel); 
    }
  }
  
  loadFlowForEdit(flowId: number) {
    this.loading = true;
    
    getFlow(flowId).then(flow => {
      runInAction(() => {
        this.flowModel = flow;
        this.loading = false;
        this.nextOrder = flow.steps.length;
      });
    });
  }
  
  runFlow(flowId: number) {
    runFlow(flowId);
  }
}

const storesContext = React.createContext(new FormStore());

export const useFormStore = () => React.useContext(storesContext);