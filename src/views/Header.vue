<template>
  <header class="">
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">HAPPY HOUSE</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor03"
          aria-controls="navbarColor03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarColor03">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link" href="/notice">공지사항 </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/qna-board">QnA </a>
            </li>
            <li class="nav-item float-end">
              <a class="nav-link" href="/service">매물조회</a>
            </li>
            <li v-if="isLogin" class="nav-item float-end">
              <a class="nav-link" href="/profile">내 정보</a>
            </li>
          </ul>
          <div class="d-flex ms-4">
            <span v-if="isLogin">
              <button
                @click="logout"
                class="btn btn-outline-primary me-3"
                type="submit"
              >
                로그아웃
              </button>
            </span>
            <span v-else>
              <a
                href="/login"
                class="btn btn-outline-primary me-3"
                type="submit"
                >로그인 &nbsp; | &nbsp; 회원가입</a
              >
            </span>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
  data: function () {
    return {
      isLogin: false,
      userName: "",
    };
  },
  methods: {
    logout: function () {
      localStorage.removeItem("jwt");
      this.isLogin = false;
      location.href = "/";
    },
  },
  created: function () {
    // 스토리지에 jwt가 있는지에 따라 로그인 여부 판단
    const token = localStorage.getItem("jwt");
    if (token) {
      this.isLogin = true;
    }
  },
};
</script>

<style>
.navbar-collapse {
  flex-grow: 0 !important;
}
</style>
