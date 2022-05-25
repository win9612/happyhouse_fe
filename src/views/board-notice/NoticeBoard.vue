<template>
  <div class="container">
    <HeaderVue />
    <div class="notice-container">
      <a href="./"><h1 class="notice-head-title fw-bold">공지사항</h1></a>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import HeaderVue from "../Header.vue";
export default {
  name: "NoticeBoard",
  components: {
    HeaderVue,
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
</style>
