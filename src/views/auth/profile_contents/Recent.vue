<template>
  <div class="likeList-contents-container">
    <div
      class="like-post"
      v-for="(item, index) in likeList"
      :key="index"
      @click="moveDetail(item.aptCode)"
    >
      <!-- {{ item }} -->
      <div class="notice-title">{{ item.apartmentName }}</div>
      <div class="notice-dong">{{ item.dong }}</div>
    </div>
  </div>
</template>

<script>
import http from "../../../api/http-common";
export default {
  name: "Recent",
  data() {
    return {
      likeList: "",
    };
  },
  mounted() {
    let _this = this;
    http.get("/interest/list").then(function (res) {
      console.log(res);
      _this.likeList = res.data;
    });
  },
  methods: {
    moveDetail(code) {
      location.href = "/service/detail/?aptCode=" + code;
    },
  },
};
</script>

<style>
.likeList-contents-container {
  margin-top: 40px;
}
.like-post {
  cursor: pointer;
  display: inline-block;
  width: 200px;
  height: 100px;
  border: 1px solid #e0e0e0;
  border-radius: 7px;
  box-sizing: border-box;
  padding: 10px;
  margin: 10px;
}
</style>
