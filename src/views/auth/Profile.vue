<template>
  <div class="container">
    <Header />
    프로필
    <div>
      {{ profile }}
    </div>
  </div>
</template>

<script>
import http from "../../api/http-common";
import Header from "../Header.vue";
export default {
  name: "Profile",
  data() {
    return {
      profile: [],
    };
  },
  components: {
    Header,
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
