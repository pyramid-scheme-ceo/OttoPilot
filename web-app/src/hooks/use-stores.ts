import React from 'react';
import RootStore from "../stores/root-store";
import FlowListStore from "../stores/flow-list-store";

interface StoresContext {
  rootStore: RootStore;
  flowListStore: FlowListStore;
}

const rootStore = new RootStore();

const storesContext = React.createContext<StoresContext>({
  rootStore: rootStore,
  flowListStore: new FlowListStore(rootStore),
});

export const useRootStore = () => React.useContext(storesContext).rootStore;
export const useFlowListStore = () => React.useContext(storesContext).flowListStore;