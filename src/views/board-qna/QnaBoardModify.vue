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
      emailForCheck: "",
      article: {},
    };
  },
  created: async function () {
    // 로그인 정보 확인
    await this.checkLoginInfo();
    // 현재 글 정보 불러오기
    await this.getCurrentBoardInfo();
  },
  methods: {
    checkLoginInfo() {
      http
        .get(`/app/account/profile`)
        .then(({ data }) => {
          if (data.email === null || data.email.length < 1) {
            alert("로그인 후 글 수정이 가능합니다.");
            this.$router.push({ name: "QnaBoardList" });
          }
          this.emailForCheck = data.email;
        })
        .catch(() => {
          alert("비정상적인 접근입니다.");
          this.$router.push({ name: "QnaBoardList" });
        });
    },
    getCurrentBoardInfo() {
      http
        .get(`/qna-board/getOne`, {
          params: {
            bNo: this.$route.query.bno,
          },
        })
        .then(({ data }) => {
          if (this.emailForCheck !== data.bWriterEmail) {
            alert("글의 작성자만 수정할 수 있습니다.");
            this.$router.push({ name: "QnaBoardList" });
          }
          this.article = data;
        });
    },
    moveList() {
      this.$router.push({ name: "QnaBoardList" });
    },
    modifyArticle() {
      if (
        this.article.bWriterEmail == null ||
        this.article.bWriterEmail.length < 1
      ) {
        alert("이메일을 입력해주세요");
        return;
      } else if (
        this.article.bWriterName == null ||
        this.article.bWriterName.length < 1
      ) {
        alert("이름을 입력해주세요");
        return;
      } else if (
        this.article.bTitle == null ||
        this.article.bTitle.length < 1
      ) {
        alert("제목을 입력해주세요.");
        return;
      } else if (
        this.article.bContent == null ||
        this.article.bContent.length < 1
      ) {
        alert("내용을 입력해주세요.");
        return;
      }
      this.article.bContent = this.article.bContent.replace(
        /(\n|\r\n)/g,
        "<br>"
      );

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
