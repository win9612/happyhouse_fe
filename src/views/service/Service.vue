<template>
  <div class="service-container">
    <HeaderVue />
    <main>
      <div class="d-flex h-100">
        <aside class="search-box">
          <div class="search-input-container">
            <input
              id="search-input"
              type="text"
              placeholder="동 또는 아파트 이름으로 검색"
              class="form-control shadow-none"
              @input="search($event)"
            />
            <i class="fa-solid fa-search"></i>
          </div>
          <div v-if="checkDongList" class="itemList-title">지역</div>
          <div class="dongList-container">
            <div class="dongList">
              <div
                class="item"
                v-for="(item, index) in checkDongList"
                :key="index"
              >
                {{ item.dongname }}
              </div>
            </div>
          </div>
          <div v-if="checkAptList" class="itemList-title">아파트</div>
          <div class="aptList-container">
            <div class="aptList">
              <div
                class="item"
                v-for="(item, index) in checkAptList"
                :key="index"
              >
                {{ item.apartmentName }} <br />
                {{ item.dong }}
              </div>
            </div>
          </div>
        </aside>
        <div class="map-box bg-light h-100 w-100 min-width:1200px">
          <Map />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import Map from "./Map.vue";
import HeaderVue from "../Header.vue";

export default {
  name: "Service",
  components: {
    Map,
    HeaderVue,
  },
  data() {
    return {
      aptList: this.$store.state.house.aptList,
      dongList: this.$store.state.house.dongList,
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
          console.log("search =>", res);
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
          console.log("search =>", res);

          _this.$store.state.house.aptList = res.data;
        });
      }
      axios({
        url: "http://127.0.0.1:8080/apt-search/dong?keyword=" + e.target.value,
        method: "get",
      })
        .then(function (res) {
          console.log("search dongList=>", res);
          _this.$store.state.house.dongList = res.data;
        })
        .catch(function () {
          _this.$store.state.house.dongList = "";
        });
    },
  },
  // vuex 값이 변경되면 aptList 갱신
  computed: {
    checkAptList() {
      return this.$store.state.house.aptList;
    },
    checkDongList() {
      return this.$store.state.house.dongList;
    },
  },
  watch: {
    checkAptList(val) {
      this.aptList = val;
    },
    checkDongList(val) {
      this.dongList = val;
    },
  },
  mounted() {
    this.$store.state.house.aptList = "";
    this.$store.state.house.dongList = "";
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

.aptList-container,
.dongList-container {
  max-height: 400px;
  overflow-y: scroll;
  width: 100%;
  background-color: #fff;
}
.itemList-title {
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
  border-top: 1px solid #e0e0e0;
  padding: 10px;
  font-weight: bold;
}

main {
  position: relative;
  height: calc(100% - 56px);
}
.search-box {
  top: 12px;
  left: 12px;
  z-index: 30;
  width: 100%;
  max-width: 400px;
  position: absolute;
  border: 1px solid #e0e0e0;
}

.search-input-container {
  position: relative;
}

.search-input-container input {
  font-size: 16px !important;
  padding-left: 50px;
  margin-bottom: 0;
  border-radius: 0;
  border: none;
}
.search-input-container input:focus {
}
.search-input-container i {
  position: absolute;
  top: 20px;
  left: 10px;
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
  /* border-bottom: 1px solid #e0e0e0; */
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
