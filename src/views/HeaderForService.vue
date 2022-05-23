<template>
  <div>
    <header class="pb-2 mb-3 border border-bottom bg-white">
      <nav class="navbar navbar-expand-lg navbar-fixed-top">
        <div class="container-fluid">
          <a
            href="/"
            class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
          >
            <i
              class="text-primary fa-solid fa-apartment"
              style="font-size: 30px"
            >
              <span style="font-size: 20px">happy house</span>
            </i>
          </a>

          <div class="collapse navbar-collapse me-2" id="navbarColor03">
            <ul class="navbar-nav me-auto">
              <li class="nav-item">
                <a class="nav-link active" href="#"
                  >공지 사항
                  <span class="visually-hidden">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#"></a>
              </li>
            </ul>
            <div id="login-banner">
              <a href="./login" class="btn btn-primary me-2" type="submit"
                >로그인</a
              >
              <a href="./regist" class="btn btn-outline-primary" type="submit"
                >회원가입</a
              >
            </div>

            <div id="logout-banner" style="display: none">
              <a href="" class="btn btn-primary" id="logout" type="submit"
                >로그아웃</a
              >
              <a href="./userinfo.html" class="btn btn-secondary" type="submit"
                >회원정보</a
              >
            </div>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
import http from "../api/http-common";

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

    http.get(`/app/account/profile`).then(({ data }) => {
      this.userName = data.name;
    });
  },
};
</script>

<style>
.navbar-collapse {
  flex-grow: 0 !important;
}
</style>
