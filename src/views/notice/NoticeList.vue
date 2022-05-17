<template>
  <div class="notice-list">
    <div id="1" class="notice-post" @click="moveDetail">
      <div class="notice-title">개인정보 이용약관 변경 안내</div>
      <div class="notice-date">2022. 05. 17</div>
    </div>
    <div id="2" class="notice-post" @click="moveDetail">
      <div class="notice-title">개인정보 이용약관 변경 안내</div>
      <div class="notice-date">2022. 05. 17</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoticeList",
  data() {},
  methods: {
    moveDetail() {
      console.log("공지 클릭시 디테일 이동");
      location.href = "/notice/1";
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
.notice-date {
  font-size: 14px;
  font-weight: bold;
  color: #848484;
}
</style>
