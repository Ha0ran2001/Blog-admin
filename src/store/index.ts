import { createStore } from "vuex";

export default createStore({
  state: {
    token: "",
  },
  getters: {
    getToken(state) {
      if (!state.token) {
        state.token = localStorage.getItem('token');
      }
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.token = token;
    },
  },
  actions: {},
  modules: {},
});
