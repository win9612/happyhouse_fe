<template>
  <div>
    <!-- 헤더 영역-->
    <HeaderVue class="fix_top" />
    <!-- 본문 영역-->

    <section class="container detail_section">
      <!-- <div align="center" id="tmp">서비스 디테일 영역입니다.</div> -->
      <div id="img_container"></div>
      <div id="title_container" class="border-bottom">
        <h1 class="font-weight-bold display-3 pt-2">
          {{ title }}
        </h1>
        <div class="">
          <i
            id="interest-heart"
            class="fa-regular fa-heart text-danger fa-2x"
            @click="clickInterestHandler"
          ></i>
        </div>
      </div>
      <div id="inform_container" class="">
        <section class="section-flex">
          <div class="inform_block">
            <div class="border-right">
              <div class="inform-title">주택 정보</div>
            </div>
            <div class="informs">
              <div class="informs-row">
                <div class="informs-subtitle">주소</div>
                <div class="c">
                  <span>{{ sidoName }} </span><span>{{ gugunName }} </span
                  ><span>{{ dongName }} </span><span>{{ jibun }}</span>
                </div>
              </div>
              <div class="informs-row">
                <div class="informs-subtitle">매물 형태</div>
                <div class="">매매</div>
              </div>
              <div class="informs-row">
                <div class="informs-subtitle">건축년도</div>
                <div class="">{{ buildYear }}</div>
              </div>
            </div>
          </div>
          <div class="inform_block">
            <div class="">
              <div class="inform-title">환경 정보</div>
            </div>
            <div class="informs-subtitle">
              오늘 {{ dongName }}의 미세먼지 농도는
              <span v-html="dustStatusMsg"></span> 입니다.
            </div>
            <!-- <img :src="nowDustImg" alt="미세먼지 현황 이미지" width="200" /> -->
            <div class="informs-subtitle">주간 미세먼지 농도</div>
            <table class="table">
              <thead>
                <tr>
                  <th
                    scope="col"
                    class="dust-item"
                    v-for="(item, index) in dustInfo.slice().reverse()"
                    :key="`o-${index}`"
                  >
                    {{ item.dataTime | formatDate }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    class="dust-item"
                    v-for="(item, index) in dustStatus.slice().reverse()"
                    :key="index"
                    :inner-html.prop="item | dustColor"
                  >
                    {{ item | dustColor }}
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="section-flex">
              <div class="dust-date"></div>
              <div class="dust-data"></div>
            </div>
          </div>
        </section>
        <div class="section-flex">
          <div class="inform_block">
            <div class="border-right">
              <div class="inform-title">거래정보</div>
            </div>
            <div class="informs d-flex">
              <div id="deal_list">
                <div
                  class="deal-item"
                  v-for="(vo, index) in deals.slice().reverse()"
                  :key="index"
                >
                  <!-- <div>{{ index + 1 }}</div> -->
                  <div>
                    <span class="deal-item-title fw-bold">거래 날짜</span>
                    {{ vo.dealYear }}년 {{ vo.dealMonth }}월 {{ vo.dealDay }}일
                  </div>
                  <div>
                    <span class="deal-item-title fw-bold">거래 금액</span>
                    {{ vo.dealAmount }}만원
                  </div>
                  <div>
                    <span class="deal-item-title fw-bold">면적</span>
                    {{ vo.area }}㎡
                  </div>
                  <div>
                    <span class="deal-item-title fw-bold">층</span>
                    {{ vo.floor }}층
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="inform_block">
            <div class="inform-title">연도별 거래평균</div>
            <div class="chart-container">
              <LineChartGenerator
                :chart-options="chartOptions"
                :chart-data="chartData"
              />
            </div>
          </div>
        </div>
        <div class="section-flex map-section">
          <div class="inform_block">
            <div class="inform-title">상권 검색</div>
            <div class="col-sm-7 row informs">
              <div id="select_buttons_container">
                <!-- 이 부분에 fontAwesome을 사용하면 좋을거같다. -->
                <button
                  class="btn btn-primary"
                  value="편의점"
                  @click="searchPlaces"
                >
                  <i class="fa-solid fa-store"></i> 편의점
                </button>
                <button
                  class="btn btn-primary"
                  value="카페"
                  @click="searchPlaces"
                >
                  <i class="fa-regular fa-mug"></i> 카페
                </button>
                <button
                  class="btn btn-primary"
                  value="다이소"
                  @click="searchPlaces"
                >
                  <!-- <i class="fa-brands fa-shopify"></i> 다이소
                </button>
                <button
                  class="btn btn-primary"
                  value="마트"
                  @click="searchPlaces"
                > -->
                  <i class="fa-solid fa-shop"></i> 마트
                </button>
                <button
                  class="btn btn-primary"
                  value="음식점"
                  @click="searchPlaces"
                >
                  <i class="fa-solid fa-shop"></i> 음식점
                </button>
              </div>
              <div id="keyword_container" class="d-flex">
                <input
                  class="form-control keyword-input"
                  type="text"
                  placeholder="가게 이름 혹은 업종을 입력하세요"
                  v-model.trim.lazy="placeKeyword"
                  @keyup.enter="searchPlaces"
                />
                <input
                  type="submit"
                  class="btn btn-outline-primary keyword-submit"
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
          <div class="sang-list">
            <div class="">
              <div class="inform-title">상권 목록</div>
              <div class="p_list_container">
                <div class="text-center fw-bold mt-3" v-if="sangFlag">
                  검색 내역이 없습니다.
                </div>
                <div
                  class="p_list_element mt-3 row"
                  v-for="(place, index) in placeList"
                  :key="index"
                >
                  <div class="col-sm-4 mt-1 mb-1" align="right">
                    <b>이름</b>
                  </div>
                  <div class="col-sm-8 mt-1 mb-1" align="left">
                    {{ place.place_name }}
                  </div>
                  <div class="col-sm-4 mt-1 mb-1" align="right">
                    <b>주소</b>
                  </div>
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
                    <b>거리</b>
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
import { Line as LineChartGenerator } from "vue-chartjs/legacy";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
);

export default {
  name: "ServiceDetail",
  components: {
    HeaderVue,
    LineChartGenerator,
  },
  data() {
    return {
      userNo: 0, // 쿼리문에서 받아올 유저 코드
      aptCode: 0, // 쿼리문에서 받아올 아파트 코드
      sangFlag: true,
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
      chartData: {
        labels: ["January", "February", "March"],
        datasets: [
          {
            label: "연도별 거래 평균가",
            backgroundColor: "#f87979",
            data: [40, 20, 12],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        scales: {
          display: true,
          xAxes: [
            {
              display: false,
            },
          ],
        },
      },
      // 미세먼지 관련 변수
      dustInfo: [], // 최근 7일 미세먼지 발표 (index: index일 전)
      dustStatus: [], //  ** 차트용 데이터 ** 최근 7일 미세먼지 상태 (0일전, 1일전 ... 6일 전)
      dustStatusMsg: "", // 화면에 표시할 오늘자 미세먼지 현황
      nowDustImg: "", // 현재 미세먼지 이미지 주소
      dustDateTime: "", // 현재 미세먼지 발표시간
      minusDays: 0,
    };
  },
  created: async function () {
    this.aptCode = this.$route.query.aptCode;
    await this.getHouseInfo();
    await this.getHouseDeal();
    await this.getInterestInfo();
  },
  async mounted() {
    let _this = this;
    window.kakao.maps.load(function () {
      _this.initMap();
    });

    await http
      .get("/houseinfo/getChartData/" + this.aptCode)
      .then(function (res) {
        console.log("chart", res);
        let years = [];
        let mounts = [];
        for (let i = 0; i < res.data.length; i++) {
          years.push(res.data[i].dealYear);
          mounts.push(res.data[i].amount);
        }
        _this.chartData.datasets[0].data = mounts;
        _this.chartData.labels = years;
      });

    // 오늘자 미세농도 데이터 불러오기
    await http
      .get(`/airkorea/dust`, {
        params: {
          d: _this.getDate(),
        },
      })
      .then(({ data }) => {
        let items = JSON.parse(data.result).response.body.items;
        _this.dustInfo.push(items[0]);

        // 현재 미세먼지 농도 이미지
        _this.nowDustImg = items[0].imageUrl1;

        // 각 지역 별 미세먼지 현황 파싱
        return _this.parseDustGradeList(0);
      })
      .then((gradeObjectList) => {
        _this.getLocalDustGrade(gradeObjectList);
      })
      .then(() => {
        // 미세먼지 안내 html 생성
        if (_this.dustStatus[0] === "좋음") {
          _this.dustStatusMsg = `<strong class="text-primary">좋음</strong>`;
        } else if (_this.dustStatus[0] === "보통") {
          _this.dustStatusMsg = `<strong class="text-success">보통</strong>`;
        } else if (_this.dustStatus[0] === "나쁨") {
          _this.dustStatusMsg = `<strong class="text-warning">나쁨</strong>`;
        } else if (_this.dustStatus[0] === "매우나쁨") {
          _this.dustStatusMsg = `<strong class="text-danger">매우나쁨</strong>`;
        }
      });

    // 1일전 ~ 6일전 미세농도 데이터 불러오기
    for (let i = 1; i <= 6; i++) {
      let ago = _this.getDate();
      await http
        .get(`/airkorea/dust`, {
          params: {
            d: ago,
          },
        })
        .then(({ data }) => {
          let items = JSON.parse(data.result).response.body.items;
          _this.dustInfo.push(items[0]);
          return _this.parseDustGradeList(_this.minusDays - 1);
        })
        .then((gradeObjectList) => {
          _this.getLocalDustGrade(gradeObjectList);
        });
    }
  },
  methods: {
    /* 미세먼지 관련 함수 시작 */
    getDate() {
      let date = new Date();
      date.setDate(date.getDate() - this.minusDays++);

      let year = date.getFullYear(); // 년도
      let month = date.getMonth() + 1; // 월
      let day = date.getDate(); // 날짜

      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;
      return year + "-" + month + "-" + day;
    },
    parseDustGradeList(daysAgo) {
      let _this = this;
      let gradeList = _this.dustInfo[daysAgo].informGrade.split(",");
      let gradeObjectList = []; // 파싱된 지역별 미세먼지 현황 오브젝트

      for (let i = 0; i < gradeList.length; i++) {
        if (i == 14 || i == 16) continue; // 영동과 경기남부 제외
        let tmpList = gradeList[i].split(" : ");
        let tmpObj = {};
        tmpObj.name = tmpList[0].substr(0, 2);
        tmpObj.status = tmpList[1];
        gradeObjectList.push(tmpObj);
      }
      return gradeObjectList;
    },
    getLocalDustGrade(gradeObjectList) {
      let _this = this;
      // 시도 이름 변환
      let sido = _this.sidoName;
      let exceptionDo = [
        "전라남도",
        "전라북도",
        "경상남도",
        "경상북도",
        "충청남도",
        "충청북도",
      ];
      if (exceptionDo.includes(sido)) {
        sido = sido.charAt(0) + sido.charAt(2);
      } else if (sido === "강원도") {
        sido = "영서";
      } else {
        sido = sido.substr(0, 2);
      }

      // 현재 시도 이름과 일치하는 미세먼지 정보 반환
      for (let i = 0; i < gradeObjectList.length; i++) {
        if (gradeObjectList[i].name === sido) {
          _this.dustStatus.push(gradeObjectList[i].status);
          break;
        }
      }
    },
    /* 미세먼지 관련 함수 끝*/

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
          // this.$router.push({ name: "Service" });
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
      let _this = this;
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
          .post(`/interest/add`, { no: _this.userNo, aptCode: _this.aptCode })
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
      if (keyword === null || keyword === "" || keyword.length < 1) {
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
      this.sangFlag = false;
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

      if (len === 0) {
        this.placeMsgHtml = `<strong class="text-danger">매물 근처에 ${keyword} 존재하지 않습니다.</strong>`;
        this.sangFlag = true;
      } else
        this.placeMsgHtml = `<strong>${keyword}</strong>에 대한 분포는 ${result[r]} 입니다.`;
    },
  },
  filters: {
    formatDate(data) {
      let date = data.split(" ")[0];
      let month = date.split("-")[1];
      let day = date.split("-")[2];
      return month + "-" + day;
    },
    dustColor(data) {
      if (data === "좋음") {
        return "<span class='text-primary fw-bold'>좋음</span>";
      } else if (data === "보통") {
        return "<span class='text-success fw-bold'>보통</span>";
      } else if (data === "나쁨") {
        return "<span class='text-danger fw-bold'>나쁨</span>";
      }
    },
  },
};
</script>

<style scoped>
ain {
  position: relative;
  height: calc(100% - 56px);
}
.section-flex {
  display: flex;
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
#inform_container,
#title_container {
  width: 80%;
  margin: 0 auto;
}
#title_container {
  text-align: center;
}
.inform_block {
  padding: 30px 10px;
  margin-bottom: 50px;
  width: 100%;
}
.inform-title {
  font-weight: bold;
  font-size: 20px;
  border-bottom: 2px solid;
}
.informs {
  width: 100%;
}
.informs-subtitle {
  font-weight: bold;
  margin-top: 20px;
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

#deal_list {
  height: 500px;
  width: 100%;
  overflow-y: scroll;
}
.chart-container {
  width: 100%;
  max-width: 500px;
}
.dust-date {
  font-weight: bold;
  padding: 20px 10px;
}
.dust-data {
  padding: 20px 10px;
}
.dust-item {
  padding: 2px;
  border-bottom: 1px solid;
}
.deal-item {
  /* background-color: rgba(2, 32, 71, 0.03); */
  border-bottom: 1px solid #e0e0e0;
  margin: 10px 0;
  padding-bottom: 10px;
}
.deal-item-title {
  display: inline-block;
  width: 65px;
  text-align: right;
  margin-right: 5px;
}
.sang-list {
  position: relative;
  width: 100%;
  max-width: 380px;
  padding: 30px 10px;
}
.keyword-input {
  font-size: 16px !important;
  font-weight: normal !important;
  height: 40px;
}
.keyword-submit {
  height: 40px;
  margin-left: 10px;
}
.p_list_container {
  height: 800px;
}
.p_list_element {
  border-bottom: 1px solid #e0e0e0;
}
#select_buttons_container {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
#select_buttons_container button {
  margin-right: 10px;
  margin-bottom: 5px;
  width: 95px;
  word-break: keep-all;
}

@media only screen and (min-width: 769px) and (max-width: 992px) {
  .section-flex {
    /* flex-wrap: wrap; */
  }
  #inform_container,
  #title_container {
    width: 100%;
  }
  .chart-container {
    max-width: 370px;
  }
  #deal_list {
    height: 370px;
  }
  #kakao_map_container {
    height: 350px;
  }
  #select_buttons_container {
    display: flex;
    flex-wrap: wrap;
  }
}

@media only screen and (min-width: 647px) and (max-width: 768px) {
  .container {
    width: 100% !important;
    max-width: 100%;
  }
  #inform_container,
  #title_container {
    width: 100%;
  }
  .map-section {
    flex-wrap: wrap;
  }
  .map-section .inform_block {
    margin-bottom: 0;
  }
  .sang-list {
    max-width: 100%;
    padding-top: 0;
  }
  #deal_list {
    height: 340px;
    min-width: 220px;
  }
  .chart-container {
    min-width: 0;
  }
}
@media only screen and (max-width: 647px) {
  .section-flex {
    flex-wrap: wrap;
  }
  .inform_block {
    padding: 0;
    padding-top: 20px;
    margin-bottom: 0;
  }
  #deal_list {
    height: 240px;
  }
  #kakao_map_container {
    height: 350px;
  }
}
</style>
