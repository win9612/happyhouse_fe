const houseStore = {
  namespaced: true,
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
};

export default houseStore;
