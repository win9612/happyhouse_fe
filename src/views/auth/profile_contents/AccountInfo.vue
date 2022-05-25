<template>
  <div class="mt-4">
    <div class="profile-contents-container">
      <div class="profile-row text-left mb-3">
        <div class="profile-attr">이메일</div>
        <div class="d-flex">
          <input name="name" type="text" v-model="email" disabled />
        </div>
      </div>
      <div class="profile-row text-left mb-3">
        <div class="profile-attr">닉네임</div>
        <div class="d-flex">
          <input name="email" type="text" v-model.trim="name" disabled />
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
        <div id="name_result_msg" v-html="nameResultMsg"></div>
      </div>
      <div class="profile-row text-left">
        <div class="profile-attr">비밀번호 변경</div>
        <div class="d-flex">
          <input
            name="password"
            type="password"
            v-model.trim="password"
            disabled
          />
          <button
            id="mod_password"
            @click="modify('password')"
            class="btn btn-outline-primary"
          >
            변경
          </button>
          <button
            id="submit_password"
            @click="modify('password_submit')"
            class="btn btn-primary d-none"
          >
            확인
          </button>
        </div>
        <input
          class="mt-2"
          name="new-password1"
          type="password"
          placeholder="새 비밀번호"
          v-model.trim="newPassword1"
          v-if="enabledPass"
        />
        <input
          class="mt-2 mb-2"
          name="new-password2"
          type="password"
          placeholder="새 비밀번호 확인"
          v-model.trim="newPassword2"
          v-if="enabledPass"
        />
      </div>
      <div id="password_result_msg" v-html="passwordResultMsg"></div>
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
      currentName: "", // 이름 비교 시 사용될 현재 이름
      name: "", // 입력하는 이름
      currnetPassword: "", // 비밀번호 비교 시 사용될 현재 비밀번호
      password: "", // 입력하는 비밀번호
      newPassword1: "", // 새 비밀번호
      newPassword2: "", // 새 비밀번호 확인
      enabledPass: false,
      nameResultMsg: "",
      passwordResultMsg: "",
    };
  },
  methods: {
    modify: async function (data) {
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
        this.mdName();
        let email_input = document.querySelector("input[name=email]");
        email_input.disabled = true;

        let mod_btn = document.querySelector("#mod_email");
        let submit_btn = document.querySelector("#submit_email");
        mod_btn.classList.remove("d-none");
        submit_btn.classList.add("d-none");
      } else if (data === "name") {
        console.log("닉네임 수정");
      } else if (data === "password") {
        let password_input = document.querySelector("input[name=password]");
        password_input.disabled = false;
        password_input.placeholder = "현재 비밀번호";
        this.enabledPass = true;

        let mod_btn = document.querySelector("#mod_password");
        let submit_btn = document.querySelector("#submit_password");
        mod_btn.classList.add("d-none");
        submit_btn.classList.remove("d-none");
      } else if (data === "password_submit") {
        let success = await this.mdPassword();
        if (!success) {
          return;
        }
        let password_input = document.querySelector("input[name=password]");
        password_input.disabled = true;
        password_input.placeholder = "";
        this.enabledPass = false;

        let mod_btn = document.querySelector("#mod_password");
        let submit_btn = document.querySelector("#submit_password");
        mod_btn.classList.remove("d-none");
        submit_btn.classList.add("d-none");
      }
    },
    mdName: function () {
      let _this = this;
      if (_this.name.length < 1) {
        _this.nameResultMsg = `<strong class="text-danger">이름을 1글자 이상 입력해주세요.</strong>`;
        _this.name = _this.currentName;
        return;
      }

      http
        .put(`app/account/modify-name`, {
          email: _this.email,
          name: _this.name,
        })
        .then(() => {
          alert("닉네임이 성공적으로 변경되었습니다.");
          _this.nameResultMsg = ``;
        })
        .catch(() => {
          alert("닉네임 변경 중 문제가 발생했습니다.");
        });
    },
    mdPassword: async function () {
      let _this = this;
      //console.log(_this.email);
      //console.log(_this.password);
      let jogun1 = _this.password.length < 1; // 패스워드 1글자 이상
      let jogun2 = true; // 패스워드 일치
      let jogun3 =
        _this.newPassword1.length < 6 || _this.newPassword1.length > 15; // 새 비밀번호 6글자 이상 15글자 이하
      let jogun4 = _this.newPassword1 !== _this.newPassword2; // 새 비밀번호1 새 비밀번호2 일치 여부

      http
        .get(`app/account/check-same-pw`, {
          params: {
            email: _this.email,
            password: _this.password,
          },
        })
        .then(({ data }) => {
          if (data > 0) jogun2 = false;
          else jogun2 = true;
        })
        .then(() => {
          if (jogun1) {
            _this.passwordResultMsg = `<strong class="text-danger">현재 비밀번호를 1글자 이상 입력하세요.</strong>`;
            return false;
          } else if (jogun2) {
            _this.passwordResultMsg = `<strong class="text-danger">현재 비밀번호가 일치하지 않습니다.</strong>`;
            return false;
          } else if (jogun3) {
            _this.passwordResultMsg = `<strong class="text-danger">새 비밀번호는 6글자 이상 15글자 이하여야 합니다.</strong>`;
            return false;
          } else if (jogun4) {
            _this.passwordResultMsg = `<strong class="text-danger">새 비밀번호가 일치하지 않습니다.</strong>`;
            return false;
          }
          http
            .put(`app/account/modify-pw`, {
              email: _this.email,
              password: _this.newPassword1,
            })
            .then(() => {
              alert("비밀번호가 성공적으로 변경되었습니다.");
              _this.passwordResultMsg = "";
              _this.$router.go();
              return true;
            })
            .catch(() => {
              alert("비밀번호 변경 중 문제가 발생했습니다.");
            });
        })
        .catch(() => {
          console.log("에러 발생");
        });
    },
  },
  mounted() {
    let _this = this;
    // QnaBoard를 axios로 받아옴
    http.get(`/app/account/profile`).then(({ data }) => {
      _this.profile = data;
      _this.currentName = data.name;
      _this.name = data.name;
      _this.email = data.email;
      _this.currentPassword = data.password;
    });
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
.profile-attr {
  text-align: left;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 5px;
}
input[name="new-password1"],
input[name="new-password2"] {
  height: 35px;
}
</style>
