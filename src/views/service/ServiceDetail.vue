<template>
  <div>
    <!-- 헤더 영역-->
    <HeaderVue class="fix_top" />
    <!-- 본문 영역-->

    <section class="container detail_section">
      <!-- <div align="center" id="tmp">서비스 디테일 영역입니다.</div> -->
      <div id="img_container"></div>
      <div id="title_container" class="border-bottom">
        <h1 class="font-weight-bold display-3 pt-2" align="center">
          {{ title }}
        </h1>
        <div align="center">
          <i
            id="interest-heart"
            class="fa-heart fa-3x text-danger"
            :class="{
              'fa-regular': !isInterest,
              'fa-solid': isInterest,
            }"
            @click="clickInterestHandler"
          ></i>
        </div>
      </div>
      <div id="inform_container" class="">
        <div class="inform_block row">
          <div class="col-sm-5 border-right">
            <h2 align="center">상세정보</h2>
          </div>
          <div class="col-sm-7 row informs" align="center">
            <div class="row-sm-4 row">
              <div class="col-sm-4"><strong>주소</strong></div>
              <div class="col-sm-8" align="left">
                <span>{{ sidoName }} </span><span>{{ gugunName }} </span
                ><span>{{ dongName }} </span><span>{{ jibun }}</span>
              </div>
            </div>
            <div class="row-sm-4 row">
              <div class="col-sm-4"><strong>매물 형태</strong></div>
              <div class="col-sm-8" align="left">매매</div>
            </div>
            <div class="row-sm-4 row">
              <div class="col-sm-4"><strong>건축년도</strong></div>
              <div class="col-sm-8" align="left">{{ buildYear }}</div>
            </div>
            <div class="row-sm-4 row">
              <div class="col-sm-4"><strong>매물 형태</strong></div>
              <div class="col-sm-8" align="left">매매</div>
            </div>
          </div>
        </div>
        <div class="inform_block row">
          <div class="col-sm-5 border-right">
            <h2 align="center">거래정보</h2>
          </div>
          <div class="col-sm-7 row informs" align="center">
            <button
              class="btn btn-info text-light mb-3"
              type="button"
              v-if="!isDealListShow"
              @click="isDealListShow = !isDealListShow"
            >
              거래정보 열기 ▼
            </button>
            <button
              class="btn btn-info text-light mb-3"
              type="button"
              v-if="isDealListShow"
              @click="isDealListShow = !isDealListShow"
            >
              거래정보 닫기 ▲
            </button>
            <div id="deal_list" v-if="isDealListShow">
              <div
                class="mt-1 mb-3 ml-3 mr-3 pt-3 pb-3 rounded bg-light"
                v-for="(vo, index) in deals"
                :key="index"
              >
                <div>{{ index + 1 }}</div>
                <div>
                  거래 날짜 : {{ vo.dealYear }}년 {{ vo.dealMonth }}월
                  {{ vo.dealDay }}일
                </div>
                <div>거래 금액 : {{ vo.dealAmount }}만원</div>
                <div>면적 : {{ vo.area }}㎡</div>
                <div>층 : {{ vo.floor }}층</div>
              </div>
            </div>
          </div>
        </div>
        <div class="inform_block row">
          <div class="col-sm-5 border-right">
            <h2 align="center">상권정보</h2>
          </div>
          <div class="col-sm-7 row informs" align="center">
            <div id="select_buttons_container" align="center">
              <!-- 이 부분에 fontAwesome을 사용하면 좋을거같다. -->
              <button
                class="m-2 btn btn-primary"
                value="편의점"
                @click="searchPlaces"
              >
                <i class="fa-solid fa-store"></i> 편의점
              </button>
              <button
                class="m-2 btn btn-primary"
                value="카페"
                @click="searchPlaces"
              >
                <i class="fa-regular fa-mug"></i> 카페
              </button>
              <button
                class="m-2 btn btn-primary"
                value="다이소"
                @click="searchPlaces"
              >
                <i class="fa-brands fa-shopify"></i> 다이소
              </button>
              <button
                class="m-2 btn btn-primary"
                value="마트"
                @click="searchPlaces"
              >
                <i class="fa-solid fa-shop"></i> 마트
              </button>
              <button
                class="m-2 btn btn-primary"
                value="음식점"
                @click="searchPlaces"
              >
                <i class="fa-solid fa-shop"></i> 음식점
              </button>
            </div>
            <div id="keyword_container" align="center">
              <input type="text" v-model.trim.lazy="placeKeyword" />
              <input
                type="text"
                class="btn btn-success"
                value="검색"
                @click="searchPlaces"
              />
            </div>
            <div id="kakao_map_container" class="">
              kakao map area
              <div
                id="map"
                class=""
                style="width: 100%; height: 100%; opacity: 0.7"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import http from "../../api/http-common";
import HeaderVue from "../Header.vue";

export default {
  name: "ServiceDetail",
  components: {
    HeaderVue,
  },
  data() {
    return {
      userNo: 0, // 쿼리문에서 받아올 유저 코드
      aptCode: 0, // 쿼리문에서 받아올 아파트 코드
      imgPaths: [],
      title: "",
      sidoName: "",
      gugunName: "",
      dongName: "",
      jibun: "",
      buildYear: "",
      aptLocation: [],
      deals: [], // 거래 내역
      isDealListShow: false,
      isInterest: false,
      placeKeyword: "",
      map: "", // 카카오맵
      placeMarkers: [],
    };
  },
  created: async function () {
    this.aptCode = this.$route.query.aptCode;
    await this.getHouseInfo();
    await this.getHouseDeal();
    await this.getInterestInfo();
  },
  mounted() {
    let _this = this;
    window.kakao.maps.load(function () {
      _this.initMap();
    });
  },
  methods: {
    getHouseInfo() {
      let _this = this;
      http
        .get("/houseinfo/list/" + this.aptCode)
        .then(({ data }) => {
          _this.title = data.apartmentName;
          _this.sidoName = data.sidoName;
          _this.gugunName = data.gugunName;
          _this.dongName = data.dong;
          _this.jibun = data.jibun;
          _this.buildYear = data.buildYear;
          _this.aptLocation.push(data.lat);
          _this.aptLocation.push(data.lng);
        })
        .catch((error) => {
          console.log(error);
          console.log(window.kakao.maps);
          alert("매물 정보를 불러오는 중 문제가 발생했습니다.");
        });
    },
    getHouseDeal() {
      http
        .get("/houseinfo/deal/" + this.aptCode)
        .then(({ data }) => {
          this.deals = data;
        })
        .catch(() => {
          alert("거래 정보를 불러오는 중 문제가 발생했습니다.");
        });
    },
    getInterestInfo() {
      http
        .get("/app/account/profile")
        .then(({ data }) => {
          this.userNo = data.idx;
        })
        .then(() => {
          this.checkInterest();
        })
        .catch((resp) => {
          console.log(resp);
        });
    },
    checkInterest() {
      http
        .get("/interest/check", {
          params: {
            no: this.userNo,
            aptCode: this.aptCode,
          },
        })
        .then(({ data }) => {
          if (data === 0) {
            this.isInterest = false;
          } else {
            this.isInterest = true;
          }
        });
    },
    setParams() {
      let form = {
        no: this.userNo,
        aptCode: this.aptCode,
      };
      return form;
    },
    clickInterestHandler() {
      if (this.isInterest) {
        http
          .delete(`/interest/delete`, {
            data: {
              no: this.userNo,
              aptCode: this.aptCode,
            },
          })
          .then(() => {
            console.log("delete success");
          });
      } else {
        http
          .post(`/interest/add`, { no: this.userNo, aptCode: this.aptCode })
          .then(() => {
            console.log("add success");
          });
      }
      this.$router.go(0);
    },

    /* 카카오맵 함수 시작 */
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(
          this.aptLocation[0],
          this.aptLocation[1]
        ),
        level: 3,
      };
      this.map = new window.kakao.maps.Map(container, options);
      this.map.removeOverlayMapTypeId(window.kakao.maps.MapTypeId.TRAFFIC);

      // 마커 생성
      const aptMarker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(
          this.aptLocation[0],
          this.aptLocation[1]
        ),
      });

      let markerTitle = `<div class="p-3">${this.title}</div>`;
      let infowindow = new window.kakao.maps.InfoWindow({
        content: markerTitle,
      });

      aptMarker.setMap(this.map);

      // 마커에 마우스오버 이벤트를 등록합니다
      window.kakao.maps.event.addListener(aptMarker, "mouseover", function () {
        infowindow.open(this.map, aptMarker);
      });
      // 마커에 마우스아웃 이벤트를 등록합니다
      window.kakao.maps.event.addListener(aptMarker, "mouseout", function () {
        infowindow.close();
      });
    },
    searchPlaces(e) {
      //this.map.removeOverlayMapTypeId(window.kakao.maps.MapTypeId.TRAFFIC);
      let keyword = e.target.value;
      if (e.target.value === "검색") {
        keyword = this.placeKeyword;
      }
      axios({
        method: "get",
        url: "https://dapi.kakao.com/v2/local/search/keyword.json",
        headers: { Authorization: "KakaoAK 2e414d00258950c90c63a87c2b7d04a1" },
        params: {
          query: keyword,
          x: this.aptLocation[1],
          y: this.aptLocation[0],
          radius: 500, // radius 미터 (범위)
          page: 1,
          size: 15,
          sort: "distance",
        },
      }).then(({ data }) => {
        const places = data.documents;
        this.makePlaceMarkers(places, keyword);
      });
    },
    makePlaceMarkers(places, keyword) {
      // 기존 장소 마커들 전부 삭제
      for (let i = 0; i < this.placeMarkers.length; i++) {
        this.placeMarkers[i].setMap(null);
      }
      this.placeMarkers = [];

      // 마커 이미지 설정
      const specific = [
        "foo bar",
        "편의점",
        "카페",
        "다이소",
        "마트",
        "음식점",
      ];
      let imageSrc = require(`@/assets/marker_logos/basic.png`);
      if (specific.includes(keyword)) {
        let imgName = specific[specific.indexOf(keyword)];
        imageSrc = require(`@/assets/marker_logos/${imgName}.png`);
      }
      let imageSize = new window.kakao.maps.Size(32, 36);
      let imageOption = { offset: new window.kakao.maps.Point(16, 40) };
      let markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );

      // 마커 위치 설정 및 마커 생성
      for (let i = 0; i < places.length; i++) {
        // 마커 위치
        let markerPosition = new window.kakao.maps.LatLng(
          places[i].y,
          places[i].x
        );

        // 마커 객체
        let marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });

        this.placeMarkers.push(marker);
        marker.setMap(this.map);
        //this.placeMarkers[i].setMap(this.map);

        let markerTitle = `<div class="p-1"><strong>${places[i].place_name}</strong></div>`;
        let infowindow = new window.kakao.maps.InfoWindow({
          content: markerTitle,
        });
        let m = this.map; // this.map 임시저장 변수
        window.kakao.maps.event.addListener(marker, "mouseover", function () {
          infowindow.open(m, marker);
        });
        window.kakao.maps.event.addListener(marker, "mouseout", function () {
          infowindow.close();
        });
      }
    },
    /* 카카오맵 함수 끝 */
  },
};
</script>

<style scoped>
ain {
  position: relative;
  height: calc(100% - 56px);
}
.service-container {
  position: fixed;
  width: 100%;
  min-width: 1280px;
}
.detail_section {
  padding-top: 50px;
}
#title_container {
  padding-top: 30px;
  padding-bottom: 30px;
}
.inform_block {
  padding-top: 30px;
  padding-bottom: 30px;
  margin-bottom: 50px;
}
.informs > div {
  margin-bottom: 10px;
}
#kakao_map_container {
  width: 100%;
  height: 600px;
}
</style>
