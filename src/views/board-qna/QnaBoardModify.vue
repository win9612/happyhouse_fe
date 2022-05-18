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
// import http from "../util/http-common.js";
// export default {
//   data() {
//     return {
//       bWriterEmail: "",
//       bWriterName: "",
//       bTitle: "",
//       bContent: "",
//     };
//   },
// };
</script>

<style></style>
