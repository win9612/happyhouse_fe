<template>
  <div id="app">
    <div class="input_form mt-5">
      <input
        type="text"
        class="mb-3 w-100"
        v-model="bWriterEmail"
        placeholder="이메일"
      /><br />
      <input
        type="text"
        class="mb-3 w-100"
        v-model="bWriterName"
        placeholder="이름"
      /><br />
      <input
        type="text"
        class="mb-3 w-100"
        v-model="bTitle"
        placeholder="제목"
      /><br />
      <textarea
        cols="152"
        rows="12"
        class="mb-3"
        v-model="bContent"
        placeholder="내용"
        required
      /><br />
    </div>
    <button class="btn btn-success" @click="addArticle">등록</button>
    <button class="btn btn-primary" @click="moveList">목록</button>
  </div>
</template>

<script>
import http from "../util/http-common.js";
export default {
  data() {
    return {
      bWriterEmail: "",
      bWriterName: "",
      bTitle: "",
      bContent: "",
    };
  },
  computed: {
    setParams() {
      let form = {
        bWriterEmail: this.bWriterEmail,
        bWriterName: this.bWriterName,
        bTitle: this.bTitle,
        bContent: this.bContent,
      };
      return form;
    },
  },
  methods: {
    moveList() {
      this.$router.push({ name: "QnaBoardList" });
    },
    addArticle() {
      if (this.bWriterEmail == null || this.bWriterEmail.length < 1) {
        alert("이메일을 입력해주세요");
        return;
      } else if (this.bWriterName == null || this.bWriterName.length < 1) {
        alert("이름을 입력해주세요");
        return;
      } else if (this.bTitle == null || this.bTitle.length < 1) {
        alert("제목을 입력해주세요.");
        return;
      } else if (this.bContent == null || this.bContent.length < 1) {
        alert("내용을 입력해주세요.");
        return;
      }

      this.bContent = this.bContent.replace(/(\n|\r\n)/g, "<br>");

      http
        .post(`/qna-board/add`, this.setParams)
        .then((resp) => {
          console.log(resp);
          alert("성공적으로 등록되었습니다.");
          this.$router.push({ name: "QnaBoardList" });
        })
        .catch((resp) => {
          alert("등록에 실패했습니다. \n에러메시지: " + resp);
          return;
        });
    },
  },
};
</script>

<style></style>
