<template>
  <div>
    <h3>답변</h3>
    <hr />
    <div class="row">
      <textarea
        class="form-control col"
        v-model="cContent"
        cols="20"
        rows="10"
      ></textarea>
      <button class="col-1 btn btn-primary" @click="addCommentList">
        작성
      </button>
    </div>
    <div class="comment-list">
      <div
        class="comment-item"
        v-for="(item, index) in createCommentList"
        :key="index"
      >
        답변자 : {{ item.cWriterName }}
        <div v-html="item.cContent"></div>

        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import http from "../util/http-common.js";

export default {
  name: "QnaComment",
  data() {
    return {
      commentList: [],
      bNo: 1,
      cContent: "",
      cWriterName: "상햄",
      cWriterEmail: "mon2210@naver.com",
    };
  },
  methods: {
    getCommentList: function () {
      http
        .get(`/qna-comment/getList`, {
          params: {
            bNo: this.bNo,
          },
        })
        .then(({ data }) => {
          console.log(data);
          this.commentList = data;
        });
    },
    addCommentList: function () {
      http
        .post(`/qna-comment/add`, this.setParams)
        .then((resp) => {
          console.log(resp);
          this.getCommentList();
          alert("성공적으로 등록되었습니다.");
        })
        .catch((resp) => {
          alert("등록에 실패했습니다. \n에러메시지: " + resp);
          return;
        });
    },
  },
  mounted: function () {
    this.getCommentList();
  },
  computed: {
    createCommentList: function () {
      return this.commentList;
    },
    setParams() {
      let form = {
        cWriterEmail: this.cWriterEmail,
        cWriterName: this.cWriterName,
        bNo: this.bNo,
        cContent: this.cContent,
      };
      return form;
    },
  },
};
</script>

<style>
.comment-list {
  padding-top: 30px;
}
</style>
