<template>
  <div>
    <button class="btn btn-primary" v-if="ableWrite" @click="moveWrite()">
      글쓰기
    </button>

    <!-- 게시판 element 시작 -->
    <section class="board_container mb-5">
      <div
        class="notice-post"
        :id="item.bno"
        v-for="(item, index) in noticeBoard"
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
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item" v-if="page - 1" @click="moveBeforePage()">
          <a class="page-link" href="#">이전</a>
        </li>
        <li
          class="page-item"
          v-for="(item, index) in pageNavigation"
          :key="index"
        >
          <a
            class="page-link"
            href="#"
            v-html="item"
            @click="movePage(item)"
          ></a>
        </li>
        <li
          class="page-item"
          v-if="page !== totalPage"
          @click="moveAfterPage()"
        >
          <a class="page-link" href="#">다음</a>
        </li>
      </ul>
    </nav>
    <!-- Page Navigation 끝 -->
  </div>
</template>

<script>
import http from "../../api/http-common";

export default {
  name: "NoticeBoardList",
  data() {
    return {
      page: 1, // 현재 페이지 (초기 기본값 1)
      totalPage: 1,
      noticeBoard: [], // 게시글 목록
      pageNavigation: [], // 페이지 내비게이션 목록
      ableWrite: false, // 글쓰기 사용가능 여부
    };
  },
  created() {
    this.getLoginInfo();
    this.getArticleList();
  },
  methods: {
    getLoginInfo() {
      http.get(`/app/account/profile`).then(({ data }) => {
        if (data.role === "ADMIN") {
          this.ableWrite = true;
        }
      });
    },
    getArticleList() {
      http
        .get(`/notice-board/getList`, {
          params: {
            page: this.page,
          },
        })
        .then(({ data }) => {
          this.page = data.result.currentPage;
          this.noticeBoard = data.result.articleList;
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
      this.$router.push({ name: "NoticeBoardDetail", query: { bno: bNo } });
    },
    moveWrite() {
      this.$router.push({ name: "NoticeBoardCreate" });
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
