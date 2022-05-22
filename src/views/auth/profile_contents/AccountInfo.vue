<template>
  <div>{{ profile }}</div>
</template>

<script>
import http from "../../../api/http-common";

export default {
  name: "AccountInfo",
  data() {
    return {
      profile: [],
    };
  },
  mounted() {
    let _this = this;
    // QnaBoard를 axios로 받아옴
    http
      .get(`/app/account/profile`)
      .then(({ data }) => {
        _this.profile = data;
      })
      .then(() => {});
  },
};
</script>
