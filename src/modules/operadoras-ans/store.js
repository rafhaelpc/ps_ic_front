export default {
  namespaced: true,
  state: {
    sortOptions: null,
    filterOptions: null
  },
  getters: {
    sortOptions(state) {
      return state.sortOptions;
    },

    filterOptions(state) {
      return state.filterOptions;
    }
  },
  mutations: {
    saveSortOptions(state, data) {
      state.sortOptions = data;
    },

    saveFilterOptions(state, data) {
      state.filterOptions = data;
    }
  },
  actions: {
    sort(context, data) {
      context.commit('saveSortOptions', data);
    },

    filter(context, data) {
      context.commit('saveFilterOptions', data);
    }
  }

};
