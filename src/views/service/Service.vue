<template>
  <div class="service-container">
    <header>
      <nav class="navbar navbar-expand-lg">
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

    <main>
      <div class="d-flex h-100">
        <aside class="side-menu">
          <div class="search-bar d-flex">
            <div class="input-box">
              <input
                id="search-text"
                type="text"
                placeholder="동 또는 아파트 이름으로 검색"
                class="form-control"
                @input="search($event)"
              />
              <!-- <div class="search-result">123123</div> -->
            </div>
          </div>
          <div class="title fw-bold fs-5 pt-2 pb-2">
            검색 이전 히든처리 여긴 필터들어갈자리
          </div>
          <div class="item-list">
            <div class="item" v-for="(item, index) in aptList" :key="index">
              <div class="item-title">{{ item.aptName }}</div>
              <div>{{ item }}</div>
            </div>
            {{ aptList }}
          </div>
        </aside>
        <div class="map-box bg-light h-100 w-100 min-width:1200px">
          <Map />
          <div class="control-box">
            <div class="custom_typecontrol radius_border d-flex">
              <div
                id="btnRoadmap"
                class="btn btn-sm btn-light"
                onclick="setMapType('roadmap')"
              >
                지도
              </div>
              <div
                id="btnSkyview"
                class="btn btn-sm btn-primary"
                onclick="setMapType('skyview')"
              >
                스카이뷰
              </div>
            </div>
            <!-- 지도 확대, 축소 컨트롤 div 입니다 -->
            <div class="custom_zoomcontrol radius_border">
              <span onclick="zoomIn()"><i class="fa-solid fa-plus"></i></span>
              <span onclick="zoomOut()"><i class="fa-solid fa-minus"></i></span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import Map from "./Map.vue";

export default {
  name: "Service",
  components: {
    Map,
  },
  data() {
    return {
      aptList: this.$store.state.house.aptList,
    };
  },
  methods: {
    search: function (e) {
      let str = e.target.value;

      let last = str.charAt(str.length - 1);

      let _this = this;

      // 동으로 아파트 목록 검색
      if (last == "동" || last == "가") {
        axios({
          url: "http://127.0.0.1:8080/apt-search/apt?keyword=" + e.target.value,
          method: "get",
        }).then(function (res) {
          console.log(res);
          _this.$store.state.house.aptList = res.data;
        });

        // 동인경우 지도 위치도 이동시키자
        // 여기다가 나중에 함수호출해서 기능 추가 예정
      } else {
        // 동이 아닌 아파트 이름으로 아파트 검색
        // 이건 지도 이동 안하고 여러지역의 동일한 키워드를
        // 포함한 아파트 목록 표시해주기
        axios({
          url:
            "http://127.0.0.1:8080/apt-search/aptName?keyword=" +
            e.target.value,
          method: "get",
        }).then(function (res) {
          _this.$store.state.house.aptList = res.data;
        });
      }
    },
  },
  // vuex 값이 변경되면 aptList 갱신
  computed: {
    checkAptList() {
      return this.$store.state.house.aptList;
    },
  },
  watch: {
    checkAptList(val) {
      this.aptList = val;
    },
  },
};
</script>

<style>
body,
html {
  height: 100%;
}

.service-container {
  height: 100%;
  width: 100%;
  min-width: 1280px;
}

main {
  position: relative;
  height: calc(100% - 56px);
}

.side-menu {
  min-width: 400px;
  width: 400px;
  height: 100%;
  border-right: 1px solid #e0e0e0;
}

.search-bar {
  box-sizing: border-box;
  /* border-bottom: 1px solid #e0e0e0; */
  /* border-top: 1px solid #e0e0e0; */
}

.input-box {
  width: 90%;
  min-width: 400px;
  display: flex;
}

#search-text {
  margin-bottom: 0;
  border-radius: 0;
}

.search-result {
  border: 2px solid red;
  position: absolute;
  width: 400px;
  height: 200px;
  margin-top: 60px;
}

.title {
  border-bottom: 1px solid #e0e0e0;
  padding-left: 10px;
}

.item-list {
  height: calc(100% - 117px);
  overflow-y: scroll;
  /* overflow: hidden; */
  /* 선택자::-webkit-scrollbar */
}

.item {
  cursor: pointer;
  border-bottom: 1px solid #e0e0e0;
  padding-left: 10px;
  padding: 10px 0 10px 10px;
}

.item:hover {
  background-color: #f8f8f8;
}

.item .item-name {
  font-weight: bold;
  font-size: 18px;
}

.item .date {
  color: rgb(141, 141, 141);
}

.select-box {
  margin-left: -10px;
}

.select-box select {
  width: 150px;
}

select[name="sido"],
select[name="gugun"] {
  margin-right: 10px;
}

.map-box {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 350px;
}
.radius_border {
  /* border: 1px solid #919191; */
  border-radius: 5px;
}
.custom_typecontrol {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 100;
  border: 1px solid #8d8d8d;
}

.custom_typecontrol #btnRoadmap {
  margin-right: 0px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: none;
}

.custom_typecontrol #btnSkyview {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border: none;
}

.custom_zoomcontrol {
  position: absolute;
  top: 50px;
  right: 10px;
  width: 36px;
  height: 80px;
  overflow: hidden;
  z-index: 1;
  background-color: #f5f5f5;
  border: 1px solid #8d8d8d;
}
.custom_zoomcontrol span {
  display: block;
  width: 36px;
  height: 40px;
  text-align: center;
  cursor: pointer;
  padding-top: 8px;
}
.custom_zoomcontrol span img {
  width: 15px;
  height: 15px;
  padding: 12px 0;
  border: none;
}
.custom_zoomcontrol span:first-child {
  border-bottom: 1px solid #bfbfbf;
}
</style>
