<template>
  <div class="qnaList-contents-container">
    <div class="profile-notice-post">
      <div class="profile-notice-title">제목입니다</div>
      <div class="profile-notice-date">2022.05.06</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QnaList",
};
</script>

<style>
.qnaList-contents-container {
  margin-top: 30px;
}
.profile-notice-post {
  text-align: left;
  box-sizing: border-box;
  padding: 20px 30px;
  border: 1px solid #e0e0e0;
  border-radius: 7px;
  cursor: pointer;
}
.profile-notice-title {
  font-weight: bold;
  font-size: 18px;
}
.profile-notice-date {
  font-size: 14px;
  font-weight: bold;
  color: #848484;
}
</style>
