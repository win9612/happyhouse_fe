<template>
  <div>
    <div class="article mt-5">
      <div class="article_title mb-3 pb-3 border-bottom">
        <h3>{{ article.bTitle }}</h3>
        <span>{{ article.bWriterName }}</span>
        &nbsp;|&nbsp;
        <span style="color: gray">{{ article.bWriteDate }}</span>
      </div>
      <div
        class="article_content mb-3 pt-3 pb-3"
        v-html="article.bContent"
      ></div>
    </div>
    <div align="right" class="menu_bar mb-1">
      <button class="btn btn-primary" @click="moveList">목록</button>
      <button
        class="btn btn-outline-primary"
        v-if="ableModify"
        @click="moveModify"
      >
        글 수정
      </button>
      <button class="btn btn-danger" v-if="ableDelete" @click="deleteArticle">
        글 삭제
      </button>
    </div>
  </div>
</template>

<script>
import http from "../../api/http-common";
export default {
  data() {
    return {
      bNo: "", // query로부터 받아올 게시글 번호
      article: {}, // 게시글 정보
      browsingUserEmail: "",
      ableModify: false,
      ableDelete: false,
    };
  },
  created: async function () {
    this.bNo = this.$route.query.bno; // 현재 게시글 번호 받기
    await this.getArticleData();
    await this.checkLoginInfo();
  },
  methods: {
    getArticleData() {
      http
        .get(`/notice-board/getOne`, {
          params: {
            bNo: this.bNo,
          },
        })
        .then(({ data }) => {
          this.article = data;
        });
    },
    checkLoginInfo() {
      http
        .get(`/app/account/profile`)
        .then(({ data }) => {
          if (data.role === "ADMIN") {
            this.ableModify = true;
            this.ableDelete = true;
          }
          this.browsingUserEmail = data.email;
        })
        .catch((resp) => {
          console.log(resp); // ISSUE
        });
    },
    moveList() {
      this.$router.push({ name: "NoticeBoardList" });
    },
    moveModify() {
      this.$router.replace({
        name: "NoticeBoardModify",
        query: { bno: this.bNo },
      });
    },
    deleteArticle() {
      if (confirm("정말로 삭제하시겠습니까?")) {
        this.$router.replace({
          name: "NoticeBoardDelete",
          query: { bno: this.bNo, browsingUserEmail: this.browsingUserEmail },
        });
      }
    },
  },
};
</script>

<style>
.menu_bar button {
  margin-left: 10px;
}
</style>
