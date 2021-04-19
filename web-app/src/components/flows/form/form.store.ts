import React from 'react';
import {Api} from "../../../models/api-models";
import {makeAutoObservable} from "mobx";
import {createFlow} from "../shared/flows.service";

export default class FormStore {
  flowModel: Api.Flow;
  steps: Api.Step[];
  stepModelHidden: boolean;
  nextOrder: number;
  
  constructor() {
    this.flowModel = {
      id: 0,
      name: '',
    }
    this.steps = [];
    this.stepModelHidden = true;
    this.nextOrder = 0;
    
    makeAutoObservable(this);
  }
  
  get loading(): boolean {
    return !this.flowModel;
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
    this.steps.push({
      stepType,
      name: 'New Step',
      order: this.nextOrder,
      serialisedParameters: '',
    });
    
    this.nextOrder++;
    this.hideStepModal();
  }
  
  updateStep(order: number, step: Api.Step) {
    this.steps[order] = step;
  }
  
  updateStepConfiguration<T>(order: number, config: T) {
    this.steps[order] = {
      ...this.steps[order],
      serialisedParameters: JSON.stringify(config),
    };
  }
  
  deleteStep(order: number) {
    this.steps.splice(order, 1);
    this.nextOrder--;
  }
  
  saveCurrentFlow() {
    createFlow()
  }
}

const storesContext = React.createContext(new FormStore());

export const useFormStore = () => React.useContext(storesContext);