import { createStore } from 'vuex';

export default createStore({
  state: {
    companyId: '',
  },
  mutations: {
    addCompanyId(state, data) {
      state.companyId = data;
    },
  },
  actions: {
  },
  modules: {
  },
});
