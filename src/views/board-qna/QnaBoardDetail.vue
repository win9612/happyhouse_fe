<template>
  <div>
    <div class="article mt-5">
      <div class="article_title mb-3 pb-3 border-bottom">
        <h3>{{ article.bTitle }}</h3>
        <span>작성자 : {{ article.bWriterName }}</span> |
        <span>{{ article.bWriteDate }}</span>
      </div>
      <div class="article_content mb-3 pt-3 pb-3 border">
        {{ article.bContent }}
      </div>
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
  </div>
</template>

<script>
import http from "../util/http-common.js";
export default {
  data() {
    return {
      bNo: "", // query로부터 받아올 게시글 번호
      article: {
        bNo: 3,
        bWriterEmail: "hong123@naver.com",
        bWriterName: "강호동",
        bTitle: "세 번째 글의 제목 ><<<<",
        bContent: "내용입니다. 내용",
        bHits: 333,
        bWriteDate: "2022-05-19 14:50:20",
      },
    };
  },
  created() {
    this.bNo = this.$route.query.bno; // 현재 게시글 번호 받기
    http.get(`/map/sido`).then(({ data }) => {
      console.log(data);
      //this.artlcle = data;
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
};
</script>

<style></style>
