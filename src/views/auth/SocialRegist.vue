<template>
  <div class="container">
    <div class="login-wrapper">
      <div class="login-form-logo text-center">
        <a href="/">HAPPY HOUSE</a>
      </div>
      <div class="form-container text-start">
        <div class="text-center alert alert-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
            viewBox="0 0 16 16"
            role="img"
            aria-label="Warning:"
          >
            <path
              d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
            />
          </svg>
          추가정보를 입력해주세요
        </div>
        <div class="input-title">이메일</div>
        <input
          class="form-control"
          v-model="email"
          type="text"
          placeholder="이메일 입력"
        />
        <div class="input-title">닉네임</div>
        <input
          class="form-control"
          v-model="name"
          type="text"
          placeholder="닉네임 입력"
        />
        <input
          class="form-control"
          v-model="password"
          type="hidden"
          placeholder="닉네임 입력"
        />
        <div class="d-grid gap-2 mb-4">
          <button class="btn btn-primary btn-lg" @click="regist()">
            회원가입
          </button>
          <div class="text-end sub-menu"></div>
        </div>
        <!-- <hr /> -->
      </div>
    </div>
  </div>
</template>

<script>
import http from "../../api/http-common";

export default {
  name: "SocialRegist",
  data() {
    return {
      email: "",
      name: "",
      password: "",
    };
  },
  methods: {
    regist: function () {
      if (this.email.trim() == "" || this.name.trim() == "") {
        alert("정보를 모두 입력해주세요");
      } else {
        http.post("/app/account/regist", this.setParams).then(function (res) {
          console.log(res);
          alert("회원가입이 완료되었습니다.\n 다시 로그인해주세요");
          location.href = "/login";
        });
      }
    },
  },
  computed: {
    setParams() {
      let form = {
        email: this.email,
        name: this.name,
        password: this.password,
      };
      return form;
    },
  },
  created() {
    this.email = this.$route.params.email;
    this.password = this.$route.params.password;
  },
};
</script>

<style>
.alert {
  padding: 7px 1rem;
}
</style>
