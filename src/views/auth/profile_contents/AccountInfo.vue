<template>
  <div class="mt-4">
    <div class="profile-contents-container">
      <div class="profile-row text-left">
        <div class="profile-attr">이메일</div>
        <div class="d-flex">
          <input name="name" type="text" v-model="email" disabled />
        </div>
      </div>
      <div class="profile-row text-left">
        <div class="profile-attr">닉네임</div>
        <div class="d-flex">
          <input name="email" type="text" v-model="name" disabled />
          <button
            id="mod_email"
            @click="modify('email')"
            class="btn btn-outline-primary"
          >
            수정
          </button>
          <button
            id="submit_email"
            @click="modify('email_submit')"
            class="btn btn-primary d-none"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "../../../api/http-common";

export default {
  name: "AccountInfo",
  data() {
    return {
      profile: [],
      email: "",
      name: "",
    };
  },
  methods: {
    modify: function (data) {
      if (data === "email") {
        console.log("이메일 수정");
        let email_input = document.querySelector("input[name=email]");
        email_input.disabled = false;

        let mod_btn = document.querySelector("#mod_email");
        let submit_btn = document.querySelector("#submit_email");
        mod_btn.classList.add("d-none");
        submit_btn.classList.remove("d-none");
      } else if (data === "email_submit") {
        console.log("이메일 서브밋");
        let email_input = document.querySelector("input[name=email]");
        email_input.disabled = true;

        let mod_btn = document.querySelector("#mod_email");
        let submit_btn = document.querySelector("#submit_email");
        mod_btn.classList.remove("d-none");
        submit_btn.classList.add("d-none");
      } else if (data === "name") {
        console.log("닉네임 수정");
      }
    },
  },
  mounted() {
    let _this = this;
    // QnaBoard를 axios로 받아옴
    http
      .get(`/app/account/profile`)
      .then(({ data }) => {
        _this.profile = data;
        _this.name = data.name;
        _this.email = data.email;
      })
      .then(() => {});
  },
};
</script>

<style>
.profile-contents-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}
.profile-row input {
  width: 100%;
}
.profile-row button {
  width: 70px;
  margin-left: 5px;
}
</style>
