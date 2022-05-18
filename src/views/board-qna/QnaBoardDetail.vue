<template>
  <div>
    <div class="article mt-5">
      <div class="article_title mb-3 pb-3 border-bottom">
        <h3>{{ article.bTitle }}</h3>
        <span>작성자 : {{ article.bWriterName }}</span> |
        <span>{{ article.bWriteDate }}</span>
      </div>
      <div
        class="article_content mb-3 pt-3 pb-3 border"
        v-html="article.bContent"
      ></div>
    </div>
    <div align="center" class="menu_bar mb-1 row">
      <div class="d col-4">
        <button class="btn btn-primary" @click="moveList">목록</button>
      </div>
      <div class="d col-4">
        <button class="btn btn-info" @click="moveModify">글 수정</button>
      </div>
      <div class="d col-4">
        <button class="btn btn-danger" @click="deleteArticle">글 삭제</button>
      </div>
    </div>
    <QnaCommentVue />
  </div>
</template>

<script>
import http from "../util/http-common.js";
import QnaCommentVue from "./QnaComment.vue";
export default {
  data() {
    return {
      bNo: "", // query로부터 받아올 게시글 번호
      article: {},
    };
  },
  created() {
    this.bNo = this.$route.query.bno; // 현재 게시글 번호 받기
    http
      .get(`/qna-board/getOne`, {
        params: {
          bNo: this.bNo,
        },
      })
      .then(({ data }) => {
        this.article = data;
      });
  },
  methods: {
    moveList() {
      this.$router.push({ name: "QnaBoardList" });
    },
    moveModify() {
      this.$router.replace({
        name: "QnaBoardModify",
        query: { bno: this.bNo },
      });
    },
    deleteArticle() {
      if (confirm("정말로 삭제하시겠습니까?")) {
        this.$router.replace({
          name: "QnaBoardDelete",
          query: { bno: this.bNo },
        });
      }
    },
  },
  components: {
    QnaCommentVue,
  },
};
</script>

<style></style>
