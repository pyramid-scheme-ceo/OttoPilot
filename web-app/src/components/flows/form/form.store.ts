import React from 'react';
import {Api} from "../../../models/api-models";
import {makeAutoObservable} from "mobx";

export default class FormStore {
  flowModel: Api.Flow;
  steps: Api.Step[];
  stepModelHidden: boolean;
  
  constructor() {
    this.flowModel = {
      id: 0,
      name: '',
    }
    this.steps = [];
    this.stepModelHidden = true;
    
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
      order: 0,
      serialisedParameters: '',
    });
    
    this.hideStepModal();
  }
}

const storesContext = React.createContext(new FormStore());

export const useFormStore = () => React.useContext(storesContext);