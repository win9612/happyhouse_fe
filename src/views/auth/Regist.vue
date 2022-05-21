<template>
  <div class="login-wrapper">
    <div class="login-form-logo">
      <a href="/">HAPPY HOUSE</a>
    </div>
    <div class="form-container text-start">
      <div class="input-title">이메일</div>
      <input
        class="form-control"
        type="email"
        name="email"
        id="email"
        placeholder="이메일 주소 입력"
        v-model="email"
      />
      <div class="input-title">닉네임</div>
      <input
        class="form-control"
        type="text"
        name="name"
        id="name"
        placeholder="닉네임 입력"
        v-model="name"
      />
      <div class="input-title">비밀번호</div>
      <input
        class="form-control"
        type="password"
        name="password"
        id="password"
        placeholder="비밀번호 입력"
        v-model="password"
      />
      <input
        class="form-control"
        type="password"
        name="passwordConfirm"
        id="passwordConfirm"
        placeholder="비밀번호 확인"
        v-model="passwordConfirm"
      />
      <div class="d-grid gap-2">
        <button class="btn btn-primary btn-lg" @click="regist">회원가입</button>
        <div class="text-end sub-menu"></div>
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
import axios from "axios";
import http from "../../api/http-common";

export default {
  name: "Regist",
  data() {
    return {
      email: "",
      password: "",
      name: "",
      passwordConfirm: "",
    };
  },
  methods: {
    regist: function () {
      if (
        this.email.trim() == "" ||
        this.password.trim() == "" ||
        this.name.trim() == ""
      ) {
        alert("정보를 모두 입력해주세요");
      } else {
        http.post("/app/account/regist", this.setParams).then(function (res) {
          console.log(res);
          location.href = "/";
        });
      }
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
  computed: {
    setParams() {
      let form = {
        email: this.email,
        password: this.password,
        name: this.name,
      };
      return form;
    },
  },
  mounted() {
    let _this = this;
    const kakaoHeader = {
      // admin 키
      Authorization: "db59f06cfe1c6aaa2e89fc7e26b0113d",
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    };
    const urlParams = new URL(location.href).searchParams;
    const code = urlParams.get("code");
    try {
      const data = {
        grant_type: "authorization_code",
        client_id: "2e414d00258950c90c63a87c2b7d04a1",
        redirect_uri: "http://localhost:3000/regist",
        code: code,
      };
      const queryString = Object.keys(data)
        .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
        .join("&");
      // 로그인해서 받은 code로 토큰 받아오기
      axios
        .post("https://kauth.kakao.com/oauth/token", queryString, {
          headers: kakaoHeader,
        })
        .then(function (res) {
          //프로필 조회
          window.Kakao.Auth.setAccessToken(res.data.access_token);
          window.Kakao.API.request({
            url: "/v2/user/me",
            success: function (response) {
              console.log("프로필 조회 성공", response);
              axios({
                url: "http://127.0.0.1:8080/social/login/kakao",
                method: "post",
                data: {
                  id: `${response.id}`,
                  email: response.kakao_account.email,
                },
              }).then(function (resp) {
                console.log("스프링에 넘겼다가 받아오기");
                console.log(resp.data);
                // 회원가입 안되어있음
                if (resp.data.code == "404") {
                  _this.$router.push({
                    name: "SocialRegist",
                    params: {
                      email: resp.data.result.email,
                      password: resp.data.result.id,
                    },
                  });
                } else if (resp.data.result.accessToken) {
                  localStorage.setItem("jwt", JSON.stringify(resp.data.result));
                  location.href = "/";
                }
                // resp에서 이미 존재하는지 안하는지 판별해서 반환받아서
                // 있다면 로그인 요청하고
                // 없다면 추가정보 입력하는 폼으로 이동
              });
            },
            fail: function (error) {
              console.log(error);
            },
          });
        });
    } catch (error) {
      return error;
    }

    // 사용자 프로필 조회
  },
};
</script>

<style>
.login-wrapper {
  position: relative;
  width: 100%;
  max-width: 560px;
  height: fit-content;
  border: 1px solid #e0e0e0;
  margin: 60px auto;
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
  margin: 20px auto 0;
}

.input-title {
  font-weight: bold;
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

.social-container {
  margin: 20px 0;
}
</style>
