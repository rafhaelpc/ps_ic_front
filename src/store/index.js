import { createStore } from 'vuex';
import * as modules from './modules';

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    app: {
      namespaced: true,
      modules
    }
  }
});
