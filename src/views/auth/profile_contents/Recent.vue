<template>
  <div class="likeList-contents-container">
    <div class="like-post">
      <div class="notice-title">은마아파트</div>
      <div class="notice-dong">대치동</div>
    </div>
    <div class="like-post">
      <div class="notice-title">은마아파트</div>
      <div class="notice-dong">대치동</div>
    </div>
    <div class="like-post">
      <div class="notice-title">은마아파트</div>
      <div class="notice-dong">대치동</div>
    </div>
    <div class="like-post">
      <div class="notice-title">은마아파트</div>
      <div class="notice-dong">대치동</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recent",
};
</script>

<style>
.likeList-contents-container {
  margin-top: 40px;
}
.like-post {
  display: inline-block;
  width: 200px;
  height: 200px;
  border: 1px solid #e0e0e0;
  border-radius: 7px;
  box-sizing: border-box;
  padding: 10px;
  margin: 10px;
}
</style>
