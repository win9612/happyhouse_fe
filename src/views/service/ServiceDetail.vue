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
            class="fa-regular fa-heart fa-3x text-danger"
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
          <div class="col-sm-5 border-right" align="center">
            <h2 align="center">상권정보</h2>
            <div
              class="btn btn-primary w-50 mt-3"
              v-if="placeList.length > 0 && !placeListShow"
              @click="placeListShow = !placeListShow"
            >
              펼쳐보기
            </div>
            <div
              class="btn btn-primary w-50 mt-3"
              v-if="placeListShow"
              @click="placeListShow = !placeListShow"
            >
              접기
            </div>
            <div class="p_list_container" v-if="placeListShow">
              <div
                class="p_list_element mt-3 border-top border-bottom row"
                align="center"
                v-for="(place, index) in placeList"
                :key="index"
              >
                <div class="col-sm-4 mt-1 mb-1" align="right"><b>이름</b></div>
                <div class="col-sm-8 mt-1 mb-1" align="left">
                  {{ place.place_name }}
                </div>
                <div class="col-sm-4 mt-1 mb-1" align="right"><b>주소</b></div>
                <div class="col-sm-8 mt-1 mb-1" align="left">
                  {{ place.road_address_name }}
                </div>
                <div class="col-sm-4 mt-1 mb-1" align="right">
                  <b>카테고리</b>
                </div>
                <div class="col-sm-8 mt-1 mb-1" align="left">
                  {{ place.category_group_name }}
                </div>
                <div class="col-sm-4 mt-1 mb-1" align="right">
                  <b>매물에서의 거리</b>
                </div>
                <div class="col-sm-8 mt-1 mb-1" align="left">
                  {{ place.distance }} m
                </div>
                <div class="col-sm-4 mt-1 mb-1" align="right"></div>
                <div class="col-sm-8 mt-1 mb-1" align="left">
                  <b
                    ><a :href="place.place_url" target="_blank"
                      >자세히 보기</a
                    ></b
                  >
                </div>
              </div>
            </div>
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
              <input
                class="input_form"
                type="text"
                v-model.trim.lazy="placeKeyword"
                @keyup.enter="searchPlaces"
              />
              <input
                type="submit"
                class="input_button btn btn-success"
                value="검색"
                @click="searchPlaces"
              />
            </div>
            <div
              id="place_msg"
              class="mb-1"
              v-html="placeMsgHtml"
              align="center"
            ></div>
            <div id="kakao_map_container" class="mt-1" align="top">
              <div
                id="map"
                class="round"
                style="width: 100%; height: 100%; opacity: 0.9"
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
      placeListShow: false,
      placeKeyword: "",
      map: "", // 카카오맵
      placeMarkers: [],
      placeList: [],
      placeMsgHtml: `<strong>이 매물의 <span class="text-primary">주변 상권</span>을검색해보세요!</strong>`,
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
          alert("매물 정보를 불러오는 중 문제가 발생했습니다.");
          this.$router.push({ name: "Service" });
        });
    },
    getHouseDeal() {
      http
        .get("/houseinfo/deal/" + this.aptCode)
        .then(({ data }) => {
          this.deals = data;
        })
        .catch(() => {
          this.$router.push({ name: "Service" });
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
            document
              .querySelector("#interest-heart")
              .classList.remove("fa-regular");
            document.querySelector("#interest-heart").classList.add("fa-solid");
          }
        });
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
            this.isInterest = false;
            document
              .querySelector("#interest-heart")
              .classList.remove("fa-solid");
            document
              .querySelector("#interest-heart")
              .classList.add("fa-regular");
          });
      } else {
        http
          .post(`/interest/add`, { no: this.userNo, aptCode: this.aptCode })
          .then(() => {
            console.log("add success");
            this.isInterest = true;
            document
              .querySelector("#interest-heart")
              .classList.remove("fa-regular");
            document.querySelector("#interest-heart").classList.add("fa-solid");
          });
      }
      // this.$router.go(0);
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
      if (keyword === null || keyword.length < 1) {
        this.placeMsgHtml = `<strong class="text-danger">검색어를 입력해주세요!</strong>`;
        return;
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
      })
        .then(({ data }) => {
          this.placeList = data.documents;
          this.makePlaceMarkers(this.placeList, keyword);
        })
        .then(() => {
          this.makePlaceMsg(this.placeList, keyword);
        });
    },
    async makePlaceMarkers(places, keyword) {
      const len = places.length;
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
      for (let i = 0; i < len; i++) {
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

        await this.placeMarkers.push(marker);
        await marker.setMap(this.map);
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
    makePlaceMsg(place, keyword) {
      let len = place.length;
      let score = 0;
      let result = [
        `<strong class="text-primary">좋음</strong>`,
        `<strong class="text-success">보통</strong>`,
        `<strong class="text-danger">나쁨</strong>`,
      ];

      // score 계산 로직
      for (let i = 0; i < len; i++) {
        score += 500; // 존재하는 place 하나 당 500점
        score -= place[i].distance; // 거리만큼 차감
      }

      // 접근성 결정
      let r = 0;
      if (score >= 3000) {
        r = 0;
      } else if (score >= 650) {
        r = 1;
      } else {
        r = 2;
      }

      if (len === 0)
        this.placeMsgHtml = `<strong class="text-danger">매물 근처에 ${keyword} 존재하지 않습니다.</strong>`;
      else
        this.placeMsgHtml = `<strong>${keyword}</strong>에 대한 분포는 ${result[r]} 입니다.`;
    },
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
.input_form {
  width: 250px;
  margin-right: 10px;
}
.input_button {
  width: 100px;
}
.p_list_container {
  height: 500px;
  overflow-y: scroll;
}
</style>
