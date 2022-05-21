<template>
  <div class="container">
    <div class="login-wrapper">
      <input
        class="form-control"
        v-model="email"
        type="text"
        placeholder="이메일 입력"
      />
      <input
        class="form-control"
        v-model="name"
        type="text"
        placeholder="닉네임 입력"
      />
      <input
        class="form-control"
        v-model="password"
        type="text"
        placeholder="닉네임 입력"
      />
      <button class="btn btn-primary" @click="regist()">작성</button>
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
