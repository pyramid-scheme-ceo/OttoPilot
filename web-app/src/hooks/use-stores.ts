import React from 'react';
import RootStore from "../stores/domain/root-store";
import UiStore from "../stores/ui/ui-store";
import FlowListStore from "../stores/domain/flow-list-store";

interface StoresContext {
  uiStore: UiStore;
  rootStore: RootStore;
  flowListStore: FlowListStore;
}

const uiStore = new UiStore();
const rootStore = new RootStore(uiStore);

const storesContext = React.createContext<StoresContext>({
  uiStore: uiStore,
  rootStore: rootStore,
  flowListStore: new FlowListStore(rootStore),
});

export const useUiStore = () => React.useContext(storesContext).uiStore;
export const useFlowListStore = () => React.useContext(storesContext).flowListStore;