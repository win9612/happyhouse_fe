import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/auth/Login.vue";
import Regist from "../views/auth/Regist.vue";
import Service from "../views/service/Service.vue";
import Notice from "../views/notice/Notice.vue";
import NoticeDetail from "../views/notice/NoticeDetail.vue";
import NoticeList from "../views/notice/NoticeList.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/regist",
    name: "Regist",
    component: Regist,
    meta: {
      unauthorized: true,
    },
  },
  {
    path: "/service",
    name: "Service",
    component: Service,
  },
  {
    path: "/notice",
    name: "Notice",
    component: Notice,
    children: [
      {
        path: "",
        component: NoticeList,
      },
      {
        path: ":id",
        component: NoticeDetail,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
