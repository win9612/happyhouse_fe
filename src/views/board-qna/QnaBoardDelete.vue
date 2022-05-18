<template>
  <div></div>
</template>

<script>
import http from "../util/http-common.js";
export default {
  created() {
    let bNo = this.$route.query.bno;
    http
      .delete(`/qna-board/delete?bNo=${bNo}`)
      .then(() => {
        alert("삭제에 성공했습니다.");
        this.$router.push({ name: "QnaBoardList" });
      })
      .catch((resp) => {
        alert("삭제에 실패했습니다. \n에러 메시지 => " + resp);
        this.$router.push({ name: "QnaBoardList" });
      });
  },
};
</script>

<style></style>
