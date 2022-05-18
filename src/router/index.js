import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/auth/Login.vue";
import Regist from "../views/auth/Regist.vue";
import Service from "../views/service/Service.vue";
import Notice from "../views/notice/Notice.vue";
import NoticeDetail from "../views/notice/NoticeDetail.vue";
import NoticeList from "../views/notice/NoticeList.vue";

import QnaBoard from "../views/board-qna/QnaBoard.vue";
import QnaBoardDetail from "../views/board-qna/QnaBoardDetail.vue";
import QnaBoardCreate from "../views/board-qna/QnaBoardCreate.vue";
import QnaBoardDelete from "../views/board-qna/QnaBoardDelete.vue";
import QnaBoardList from "../views/board-qna/QnaBoardList.vue";
import QnaBoardModify from "../views/board-qna/QnaBoardModify.vue";

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
  {
    path: "/qna-board",
    name: "QnaBoard",
    component: QnaBoard,
    redirect: "/qna-board/list",
    children: [
      {
        path: "list",
        name: "QnaBoardList",
        component: QnaBoardList,
      },
      {
        path: "create",
        name: "QnaBoardCreate",
        component: QnaBoardCreate,
      },
      {
        path: "detail",
        name: "QnaBoardDetail",
        component: QnaBoardDetail,
      },
      {
        path: "modify",
        name: "QnaBoardModify",
        component: QnaBoardModify,
      },
      {
        path: "delete",
        name: "QnaBoardDelete",
        component: QnaBoardDelete,
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
