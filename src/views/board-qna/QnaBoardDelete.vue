<template>
  <div></div>
</template>

<script>
import http from "../../api/http-common";
export default {
  data() {
    return {
      bNo: "",
      browsingUserEmail: "",
    };
  },
  created: async function () {
    this.bNo = this.$route.query.bno;
    this.browsingUserEmail = this.$route.query.browsingUserEmail;
    await this.checkLoginInfo();
  },
  methods: {
    checkLoginInfo() {
      http
        .get(`/qna-board/getOne`, {
          params: {
            bNo: this.bNo,
          },
        })
        .then(({ data }) => {
          console.log("a : " + this.browsingUserEmail);
          console.log("b : " + data.bWriterEmail);
          if (this.browsingUserEmail !== data.bWriterEmail) {
            alert("비정상적인 접근입니다.");
            this.$router.push({ name: "QnaBoardList" });
            return;
          }
          this.deleteArticle();
        })
        .catch(() => {
          alert("비정상적인 접근입니다.");
          this.$router.push({ name: "QnaBoardList" });
        });
    },
    deleteArticle() {
      http
        .delete(`/qna-board/delete?bNo=${this.bNo}`)
        .then(() => {
          alert("삭제에 성공했습니다.");
          this.$router.push({ name: "QnaBoardList" });
        })
        .catch((resp) => {
          alert("삭제에 실패했습니다. \n에러 메시지 => " + resp);
          this.$router.push({ name: "QnaBoardList" });
        });
    },
  },
};
</script>

<style></style>
