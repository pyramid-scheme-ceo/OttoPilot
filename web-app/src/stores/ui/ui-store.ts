import {makeAutoObservable} from "mobx";

class UiStore {
  loading: boolean;
  
  constructor() {
    makeAutoObservable(this);

    this.loading = false;
  }
  
  setLoading(loading: boolean): void {
    this.loading = loading;
  }
}

export default UiStore;