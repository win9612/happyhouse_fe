<template>
  <div id="app">
    <div class="input_form mt-5">
      <input
        type="text"
        class="mb-3 w-100"
        v-model="article.bWriterEmail"
        placeholder="이메일"
      /><br />
      <input
        type="text"
        class="mb-3 w-100"
        v-model="article.bWriterName"
        placeholder="이름"
      /><br />
      <input
        type="text"
        class="mb-3 w-100"
        v-model="article.bTitle"
        placeholder="제목"
      /><br />
      <textarea
        cols="152"
        rows="12"
        class="mb-3"
        v-model="article.bContent"
        placeholder="내용"
        required
      /><br />
    </div>
    <button class="btn btn-warning" @click="modifyArticle">수정</button>
    <button class="btn btn-primary" @click="moveList">목록</button>
  </div>
</template>

<script>
import http from "../../api/http-common";
export default {
  data() {
    return {
      article: {},
    };
  },
  created() {
    let boardNo = this.$route.query.bno;
    http
      .get(`/qna-board/getOne`, {
        params: {
          bNo: boardNo,
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
    modifyArticle() {
      http
        .put(`/qna-board/modify`, this.article)
        .then(() => {
          alert("성공적으로 수정되었습니다.");
          this.$router.push({ name: "QnaBoardList" });
        })
        .catch((resp) => {
          alert("수정에 실패했습니다. \n에러 메시지 => " + resp);
          this.$router.push({ name: "QnaBoardList" });
        });
    },
  },
};
</script>

<style></style>
