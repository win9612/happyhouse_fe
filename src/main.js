import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueGeolocation from "vue-geolocation-api";

import "bootstrap/dist/css/bootstrap.min.css";

Vue.config.productionTip = false;

window.Kakao.init("a8a009f84e0340aafcbbf92fa5b1365e");

new Vue({
  router,
  store,
  VueGeolocation,
  render: (h) => h(App),
}).$mount("#app");
