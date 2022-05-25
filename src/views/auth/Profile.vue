<template>
  <div class="container">
    <Header />
    <div class="profile-container">
      <div class="profile-title">MY HappyHouse</div>
      <div class="tab-menu">
        <div id="account" class="tab-btn">
          <router-link
            @click.native="tab($event)"
            id="account"
            class=""
            to="/profile/account"
          >
            내 정보</router-link
          >
        </div>
        <div id="recent" class="tab-btn">
          <router-link
            @click.native="tab($event)"
            id="recent"
            to="/profile/recent"
          >
            관심 목록</router-link
          >
        </div>
        <div id="qnaList" class="tab-btn">
          <router-link
            @click.native="tab($event)"
            id="qnaList"
            to="/profile/QnaList"
            >내 문의사항</router-link
          >
        </div>
      </div>

      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "../Header.vue";
export default {
  name: "Profile",
  components: {
    Header,
  },
  methods: {
    tab(e) {
      let btn = document.getElementById(`${e.target.id}`);
      console.log(btn);
      let activeBtn = document.getElementsByClassName("tab-btn-active")[0];
      activeBtn.classList.remove("tab-btn-active");
      btn.classList.add("tab-btn-active");

      // 텍스트 bold 처리
      document
        .getElementsByClassName("router-link-active")[0]
        .classList.remove("tab-text-active");
      e.target.classList.add("tab-text-active");
    },
  },
  mounted() {
    let active = document.getElementsByClassName("router-link-active")[0];
    active.classList.add("tab-text-active");
    console.log(active.parentElement.classList.add("tab-btn-active"));
  },
};
</script>

<style>
.profile-container {
  width: 100%;
  max-width: 700px;
  /* border: 1px solid; */
  text-align: center;
  margin: 100px auto 0;
}
.profile-title {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
}

.tab-menu {
  width: 100%;
  display: flex;
}
.tab-btn {
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #7a7a7a;
}
.tab-btn a,
.tab-btn a:hover {
  text-decoration: none;
  color: #7a7a7a;
}
.tab-text-active {
  color: #000 !important;
  font-weight: bold;
}
.tab-btn-active {
  border-bottom: 1.5px solid #000;
}
</style>
