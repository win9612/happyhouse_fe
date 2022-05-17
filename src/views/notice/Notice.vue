<template>
  <div class="container">
    <HeaderVue />
    <div class="notice-container">
      <a href="./"><h1 class="notice-head-title fw-bold">공지사항</h1></a>
      <router-view><NoticeListVue /></router-view>
    </div>
  </div>
</template>

<script>
import HeaderVue from "../Header.vue";
import NoticeListVue from "./NoticeList.vue";

export default {
  name: "Notice",
  data() {
    return {
      id: 0,
    };
  },
  created() {
    this.id = this.$route.params.id;
  },
  components: {
    HeaderVue,
    NoticeListVue,
  },
};
</script>

<style>
.notice-container {
  margin-top: 120px;
  padding: 0 15px;
}
.notice-container a,
.notice-container a:hover {
  color: black;
  text-decoration: none !important;
}
.notice-head-title {
}
</style>
