import React from 'react';
import RootStore from "../stores/root-store";
import FlowListStore from "../stores/flow-list-store";
import FlowFormStore from "../stores/flow-form-store";

interface StoresContext {
  rootStore: RootStore;
  flowListStore: FlowListStore;
  flowFormStore: FlowFormStore;
}

const rootStore = new RootStore();

const storesContext = React.createContext<StoresContext>({
  rootStore: rootStore,
  flowListStore: new FlowListStore(rootStore),
  flowFormStore: new FlowFormStore(rootStore),
});

export const useRootStore = () => React.useContext(storesContext).rootStore;
export const useFlowListStore = () => React.useContext(storesContext).flowListStore;
export const useFlowFormStore = () => React.useContext(storesContext).flowFormStore;