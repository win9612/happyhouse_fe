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
  methods: {},
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
