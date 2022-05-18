<template>
  <div>
    <button class="btn btn-primary" @click="moveWrite()">글쓰기</button>

    <!-- 게시판 element 시작 -->
    <div
      class="notice-post"
      :id="item.bno"
      v-for="(item, index) in qnaBoard"
      :key="index"
      @click="moveDetail(item.bNo)"
    >
      <div class="notice-title">{{ item.bTitle }}</div>
      <div class="notice-date">{{ item.bWriteDate }}</div>
      <div class="notice-writer">작성자 : {{ item.bWriterName }}</div>
    </div>
    <!-- 게시판 element 끝 -->
  </div>
</template>

<script>
import http from "../util/http-common.js";

export default {
  name: "QnaBoardList",
  data() {
    return {
      // 더미 데이터 (axios해서 받아올 것!)
      qnaBoard: [],
    };
  },
  created() {
    // QnaBoard를 axios로 받아옴
    http
      .get(`/qna-board/getList`)
      .then(({ data }) => {
        this.qnaBoard = data;
      })
      .then(() => {
        // 게시글을 bNo 역순으로 정렬
        this.qnaBoard.sort((a, b) => {
          return b.bNo - a.bNo;
        });
      });
  },
  methods: {
    moveDetail(bNo) {
      this.$router.push({ name: "QnaBoardDetail", query: { bno: bNo } });
    },
    moveWrite() {
      this.$router.push({ name: "QnaBoardCreate" });
    },
  },
};
</script>

<style>
.notice-post {
  box-sizing: border-box;
  padding: 20px 0;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
}
.notice-title {
  font-weight: bold;
  font-size: 18px;
}
.notice-date,
.notice-writer {
  font-size: 14px;
  font-weight: bold;
  color: #848484;
}
</style>
