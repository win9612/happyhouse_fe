<template>
  <div>
    <button class="btn btn-primary" @click="moveWrite()">글쓰기</button>

    <!-- 게시판 element 시작 -->
    <section class="board_container mb-5">
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
    </section>
    <!-- 게시판 element 끝 -->

    <!-- Page Navigation 시작 -->
    <div align="center" class="page_navigation row mb-5">
      <div
        class="page_element col-1"
        style="cursor: pointer"
        v-if="page - 1"
        @click="moveBeforePage()"
      >
        이전
      </div>
      <div class="page_element col-1" v-else></div>
      <div
        class="page_element col-1"
        v-for="(item, index) in pageNavigation"
        :key="index"
        v-html="item"
        @click="movePage(item)"
      ></div>
      <div
        class="page_element col-1"
        style="cursor: pointer"
        v-if="page !== totalPage"
        @click="moveAfterPage()"
      >
        다음
      </div>
      <div class="page_element col-1" v-else></div>
    </div>
    <!-- Page Navigation 끝 -->
  </div>
</template>

<script>
import http from "../../api/http-common";

export default {
  name: "QnaBoardList",
  data() {
    return {
      page: 1, // 현재 페이지 (초기 기본값 1)
      totalPage: 0,
      qnaBoard: [], // 게시글 목록
      pageNavigation: [], // 페이지 내비게이션 목록
    };
  },
  created() {
    this.getArticleList();
  },
  methods: {
    getArticleList() {
      http
        .get(`/qna-board/getList`, {
          params: {
            page: this.page,
          },
        })
        .then(({ data }) => {
          this.page = data.result.currentPage;
          this.qnaBoard = data.result.articleList;
          this.totalPage = data.result.totalPage;
          this.pageNavigation = [];
          for (let i = data.result.startPage; i <= data.result.endPage; i++) {
            if (this.page === i) {
              this.pageNavigation.push(
                "<strong class='bg-warning'>" + i + "</strong>"
              );
            } else {
              this.pageNavigation.push(i);
            }
          }
        });
    },
    moveDetail(bNo) {
      this.$router.push({ name: "QnaBoardDetail", query: { bno: bNo } });
    },
    moveWrite() {
      this.$router.push({ name: "QnaBoardCreate" });
    },
    pageNaviClickHandler() {
      console.log("page navigation");
    },
    moveBeforePage() {
      this.page -= 1;
      this.getArticleList();
    },
    moveAfterPage() {
      this.page += 1;
      this.getArticleList();
    },
    movePage(pg) {
      this.page = pg;
      this.getArticleList();
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
.page_element {
  border: 1px solid blue;
  color: blue;
}
</style>
