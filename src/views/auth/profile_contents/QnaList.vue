<template>
  <!-- 게시판 element 시작 -->
  <div class="qnaList-contents-container">
    <div
      class="profile-notice-post"
      :id="item.bno"
      v-for="(item, index) in qnaBoard"
      :key="index"
      @click="moveDetail(item.bNo)"
    >
      <div class="profile-notice-title">{{ item.bTitle }}</div>
      <div class="profile-notice-date">{{ item.bWriteDate }}</div>
    </div>
  </div>
  <!-- 게시판 element 끝 -->
</template>

<script>
import http from "../../../api/http-common";

export default {
  name: "QnaList",
  data() {
    return {
      qnaBoard: [], // 게시글 목록
      email: "",
    };
  },
  created() {
    this.getArticleList();
  },
  methods: {
    getArticleList() {
      let _this = this;
      http
        .get(`/app/account/profile`)
        .then(({ data }) => {
          _this.email = data.email;
        })
        .then(() => {
          http
            .get(`/qna-board/search-email`, {
              params: {
                email: _this.email,
              },
            })
            .then(({ data }) => {
              _this.qnaBoard = data.result.articleList;
            });
        });
    },
    moveDetail(bNo) {
      this.$router.push({ name: "QnaBoardDetail", query: { bno: bNo } });
    },
  },
};
</script>

<style>
.qnaList-contents-container {
  margin-top: 30px;
}
.profile-notice-post {
  text-align: left;
  box-sizing: border-box;
  padding: 20px 30px;
  border: 1px solid #e0e0e0;
  border-radius: 7px;
  cursor: pointer;
}
.profile-notice-title {
  font-weight: bold;
  font-size: 18px;
}
.profile-notice-date {
  font-size: 14px;
  font-weight: bold;
  color: #848484;
}
</style>
