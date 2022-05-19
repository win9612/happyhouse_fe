import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    aptList: "",
  },
  mutations: {
    changeAptList(state, newList) {
      state.aptList = newList;
    },
  },
  actions: {
    setAptList({ commit }, { newList }) {
      commit("changeAptList", newList);
    },
  },
  getters: {
    getAptList(state) {
      return state.aptList;
    },
  },
  modules: {},
});
