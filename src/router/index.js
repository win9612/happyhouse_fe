import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/auth/Login.vue";
import Regist from "../views/auth/Regist.vue";
import FindPassword from "../views/auth/FindPassword.vue";
import Service from "../views/service/Service.vue";
import ServiceDetail from "../views/service/ServiceDetail.vue";

import NoticeBoard from "../views/board-notice/NoticeBoard.vue";
import NoticeBoardList from "../views/board-notice/NoticeBoardList.vue";
import NoticeBoardDetail from "../views/board-notice/NoticeBoardDetail.vue";
import NoticeBoardCreate from "../views/board-notice/NoticeBoardCreate.vue";
import NoticeBoardDelete from "../views/board-notice/NoticeBoardDelete.vue";
import NoticeBoardModify from "../views/board-notice/NoticeBoardModify.vue";

import QnaBoard from "../views/board-qna/QnaBoard.vue";
import QnaBoardList from "../views/board-qna/QnaBoardList.vue";
import QnaBoardDetail from "../views/board-qna/QnaBoardDetail.vue";
import QnaBoardCreate from "../views/board-qna/QnaBoardCreate.vue";
import QnaBoardDelete from "../views/board-qna/QnaBoardDelete.vue";
import QnaBoardModify from "../views/board-qna/QnaBoardModify.vue";
import Profile from "../views/auth/Profile.vue";
import SocialRegist from "../views/auth/SocialRegist.vue";

import AccountInfo from "../views/auth/profile_contents/AccountInfo.vue";
import QnaList from "../views/auth/profile_contents/QnaList.vue";
import Recent from "../views/auth/profile_contents/Recent.vue";
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
    props: true,
    meta: {
      unauthorized: true,
    },
  },
  {
    path: "/socialRegist",
    name: "SocialRegist",
    component: SocialRegist,
    meta: {
      unauthorized: true,
    },
  },
  {
    path: "/findpw",
    name: "FindPassword",
    component: FindPassword,
    meta: {
      unauthorized: true,
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    redirect: "profile/account",
    children: [
      {
        path: "/profile/account",
        name: "AccountInfo",
        component: AccountInfo,
      },
      {
        path: "/profile/recent",
        name: "Recent",
        component: Recent,
      },
      {
        path: "/profile/QnaList",
        name: "QnaList",
        component: QnaList,
      },
    ],
  },
  {
    path: "/service",
    name: "Service",
    component: Service,
  },
  {
    path: "/service/detail",
    name: "ServiceDetail",
    component: ServiceDetail,
  },
  {
    path: "/notice",
    name: "NoticeBoard",
    component: NoticeBoard,
    redirect: "/notice/list",
    children: [
      {
        path: "list",
        name: "NoticeBoardList",
        component: NoticeBoardList,
      },
      {
        path: "create",
        name: "NoticeBoardCreate",
        component: NoticeBoardCreate,
      },
      {
        path: "detail",
        name: "NoticeBoardDetail",
        component: NoticeBoardDetail,
      },
      {
        path: "modify",
        name: "NoticeBoardModify",
        component: NoticeBoardModify,
      },
      {
        path: "delete",
        name: "NoticeBoardDelete",
        component: NoticeBoardDelete,
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
