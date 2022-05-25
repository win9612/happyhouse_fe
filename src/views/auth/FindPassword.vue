<template>
  <div class="login-wrapper text-center">
    <div class="login-form-logo">
      <a href="/">HAPPY HOUSE</a>
    </div>
    <strong class="alert-danger"
      >비밀번호를 찾기 위해 이메일과 이름을 입력해주세요.</strong
    >
    <div class="form-container">
      <input
        class="form-control"
        type="text"
        name="email"
        id="email"
        placeholder="이메일"
        v-model.trim="email"
        @keyup.enter="find"
      />
      <input
        class="form-control"
        type="text"
        name="name"
        id="name"
        placeholder="이름"
        v-model.trim="name"
        @keyup.enter="find"
      />
      <div id="result_msg" class="mb-3" v-html="resultMsg"></div>
      <div class="d-grid gap-2">
        <button class="btn btn-primary btn-lg" @click="find">
          비밀번호 찾기
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import http from "../../api/http-common";
export default {
  data() {
    return {
      email: "", // form에 입력되는 이메일
      name: "", // form에 입력되는 이름
      resultMsg: "", // 화면에 표시할 메시지
      receiveUsers: [], // 이메일을 보낼 유저 리스트
      newPassword: "", // 새 패스워드 (not 해싱)
    };
  },
  methods: {
    setParam() {
      let form = {
        receiveUsers: this.receiveUsers, // 메일 수신자 목록
        newPassword: "",
      };
      return form;
    },
    find() {
      let _this = this;
      if (_this.email === null || _this.email.length < 1) {
        _this.resultMsg = `<strong class="text-danger">이메일을 입력해주세요.</strong>`;
        return;
      } else if (_this.name === null || _this.name.length < 1) {
        _this.resultMsg = `<strong class="text-danger">이름을 입력해주세요.</strong>`;
        return;
      }
      // 이메일과 이름이 일치하는지 확인
      http
        .get(`app/account/is-exist`, {
          params: {
            email: this.email,
            name: this.name,
          },
        })
        .then(({ data }) => {
          if (data > 0) {
            _this.makeNewPassword();
          } else {
            _this.newPassword = -1;
            _this.resultMsg = `<strong class="text-danger">일치하는 계정이 없습니다.</strong>`;
          }
        });
    },
    makeNewPassword() {
      let _this = this;
      http
        .get(`app/account/make-pw`)
        .then(({ data }) => {
          _this.newPassword = data; // 3r24rfdfv23
        })
        .then(() => {
          http
            .put(`app/account/modify-pw`, {
              email: _this.email,
              password: _this.newPassword,
            })
            .then(() => {
              console.log("modify success");
            });
        })
        .then(() => {
          _this.sendEmail(_this.newPassword);
          _this.resultMsg = `<strong>해당 이메일로 비밀번호를 전송했습니다.</strong>`;
        })
        .catch((error) => {
          console.log("에러가 발생했습니다.");
          console.log(error);
        });
    },
    sendEmail(newPassword) {
      // 이메일 발송
      let _this = this;
      console.log("sendEmail => " + newPassword);
      _this.receiveUsers.push(_this.email);
      http
        .post(`/mail/send/naver`, {
          receiveUsers: _this.receiveUsers,
          newPassword: _this.newPassword,
        })
        .then(() => {
          alert(
            "해당 이메일로 재설정된 비밀번호가 발송되었습니다.\n메일함을 확인해주세요."
          );
          this.$router.push({ name: "Login" });
        })
        .catch((error) => {
          alert("에러가 발생했습니다.\n" + error);
        });
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
