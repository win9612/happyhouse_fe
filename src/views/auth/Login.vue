<template>
  <div class="login-wrapper text-center">
    <div class="login-form-logo">
      <a href="/">HAPPY HOUSE</a>
    </div>
    <div class="form-container">
      <input
        class="form-control"
        type="text"
        name="email"
        id="email"
        placeholder="이메일"
        v-model="email"
        @keyup.enter="login"
      />
      <input
        class="form-control"
        type="password"
        name="password"
        id="password"
        placeholder="비밀번호"
        v-model="password"
        @keyup.enter="login"
      />
      <div class="d-grid gap-2">
        <button class="btn btn-primary btn-lg" @click="login">로그인</button>
        <div class="text-end sub-menu">
          <a href="./regist" class="">회원가입</a> |
          <a href="./findpw" class="">비밀번호 찾기</a>
        </div>
      </div>
      <hr />
    </div>

    <div class="social-container">
      <img
        class="social-btn kakao"
        :src="require(`@/assets/images/kakao.png`)"
        alt="집이미지"
        @click="kakaoLogin()"
      />
      <img
        class="social-btn naver"
        :src="require(`@/assets/images/naver.png`)"
        alt="집이미지"
      />
    </div>
  </div>
</template>

<script>
import http from "../../api/http-common";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login: function () {
      if (this.email == "" || this.password == "") {
        alert("아이디 또는 비밀번호를 입력해주세요");
        return;
      }

      http
        .post("/app/auth/login", {
          email: this.email,
          password: this.password,
        })
        .then(function (res) {
          localStorage.setItem("jwt", JSON.stringify(res.data.result));
          location.href = "/";
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    kakaoLogin: function () {
      console.log("kakao 회원가입");

      const params = {
        redirectUri: "http://localhost:3000/regist",
        scope: "account_email",
        success: this.getMe,
      };

      window.Kakao.Auth.authorize(params);
    },
    getMe(authObj) {
      console.log(authObj);
    },
  },
};
</script>

<style>
.login-wrapper {
  position: relative;
  width: 100%;
  max-width: 560px;
  height: 600px;
  border: 1px solid #e0e0e0;
  margin: 100px auto;
}

.form-control {
  height: 60px;
  font-size: 20px !important;
  margin-bottom: 20px;
  font-weight: bold !important;
}

.form-container .btn {
  font-weight: bold;
}

.form-container {
  position: relative;
  width: 80%;
  margin: 40px auto;
}

.login-form-logo {
  margin: 70px 0;
  font-size: 36px;
  font-weight: bold;
}
.login-form-logo a:hover {
  color: black;
}

.fa {
  font-size: 40px;
}

.sub-menu {
  margin-bottom: 20px;
}

.sub-menu a,
.login-form-logo a {
  text-decoration: none !important;
  color: black !important;
  font-weight: bold !important;
}

.social-btn {
  width: 50px;
  margin: 0px 10px;
  cursor: pointer;
}
</style>
