<template>
  <div>게시물 번호 param : {{ id }}</div>
</template>

<script>
export default {
  name: "NoticeDetail",
  data() {
    return {
      id: 0,
    };
  },
  watch: {
    $route() {
      this.id = this.$route.params.id;
    },
  },
  created() {
    this.id = this.$route.params.id;
  },
};
</script>
