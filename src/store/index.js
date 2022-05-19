import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import houseStore from "./modules/houseStore";
import createPersistedState from "vuex-persistedstate";

const store = new Vuex.Store({
  modules: {
    house: houseStore,
  },
  plugins: [
    createPersistedState({
      // 브라우저 종료시 제거하기 위해 localStorage가 아닌 sessionStorage로 변경. (default: localStorage)
      storage: sessionStorage,
    }),
  ],
});

export default store;
