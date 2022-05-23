const houseStore = {
  namespaced: true,
  state: {
    aptList: "",
    dongList: "",
  },
  mutations: {
    changeAptList(state, newList) {
      state.aptList = newList;
    },
    changeDongList(state, newList) {
      state.dongList = newList;
    },
  },
  actions: {
    setAptList({ commit }, { newList }) {
      commit("changeAptList", newList);
    },
    setDongList({ commit }, { newList }) {
      commit("changeDongList", newList);
    },
  },
  getters: {
    getAptList(state) {
      return state.aptList;
    },
    getDongList(state) {
      return state.dongList;
    },
  },
};

export default houseStore;
