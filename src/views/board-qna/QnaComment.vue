<template>
  <div>
    <h3>답변</h3>
    <hr />
    <div id="write_form" class="row" v-if="ableWrite">
      <textarea
        id="c-content-form"
        class="form-control col"
        v-model="cContent"
        cols="20"
        rows="10"
      ></textarea>
      <button class="col-1 btn btn-primary" @click="addCommentList">
        작성
      </button>
    </div>
    <div class="comment-list mb-5">
      <div
        class="comment-item"
        v-for="(item, index) in createCommentList"
        :key="index"
      >
        답변자 : <strong>{{ item.cWriterName }}</strong>
        <span> &nbsp;|&nbsp; </span>
        <span style="color: gray">{{ item.cWriteDate }}</span>
        <!-- 로그인 정보 불러와서 "현재로그인이메일 == cWriterEmail" 인지 v-if로 확인해야함-->
        <span> &nbsp;|&nbsp; </span>
        <span
          :id="item.cNo"
          style="color: red; cursor: pointer"
          v-if="cWriterEmail === item.cWriterEmail"
          @click="deleteComment($event.target.id)"
          >삭제</span
        >
        <div v-text="item.cContent" class="mb-3"></div>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import http from "../../api/http-common";

export default {
  name: "QnaComment",
  data() {
    return {
      commentList: [],
      bNo: this.bno,
      cContent: "",
      cWriterName: "",
      cWriterEmail: "",
      ableWrite: false,
      browsingUserEmail: "",
    };
  },
  created() {
    this.checkLoginInfo();
  },
  props: {
    bno: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    checkLoginInfo: function () {
      http
        .get(`/app/account/profile`)
        .then(({ data }) => {
          this.ableWrite = true;
          this.cWriterName = data.name;
          this.cWriterEmail = data.email;
        })
        .catch((resp) => {
          console.log(resp); // ISSUE
        });
    },
    getCommentList: function () {
      http
        .get(`/qna-comment/getList`, {
          params: {
            bNo: this.bno,
          },
        })
        .then(({ data }) => {
          this.commentList = data;
          console.log(data);
        })
        .then(() => {
          this.commentList.sort((a, b) => {
            return b.cNo - a.cNo;
          });
        })
        .catch(() => {
          alert("댓글 목록을 불러오는 데 실패했습니다.");
          return;
        });
    },
    addCommentList: function () {
      if (this.cWriterEmail == null || this.cWriterEmail.length < 1) {
        alert("로그인 후 이용해주세요.");
        return;
      } else if (this.cContent.length < 1) {
        alert("내용을 작성해주세요.");
        return;
      }

      http
        .post(`/qna-comment/add`, this.setParams)
        .then(() => {
          this.getCommentList();
          alert("성공적으로 등록되었습니다.");
          this.$router.go();
        })
        .catch((resp) => {
          alert("등록에 실패했습니다. \n에러메시지: " + resp);
          return;
        });
    },
    deleteComment: function (cNo) {
      if (!confirm("정말로 댓글을 삭제하시겠습니까?")) {
        return;
      }

      http
        .delete(`/qna-comment/delete/?cNo=${cNo}`)
        .then(() => {
          alert("삭제되었습니다.");
          this.$router.go();
        })
        .catch((resp) => {
          alert("댓글 삭제에 실패했습니다. \n" + resp);
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
