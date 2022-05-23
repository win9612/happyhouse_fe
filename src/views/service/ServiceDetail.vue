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
              <button class="m-2 btn btn-primary">
                <i class="fa-solid fa-store"></i> 편의점
              </button>
              <button class="m-2 btn btn-primary">
                <i class="fa-regular fa-mug"></i> 카페
              </button>
              <button class="m-2 btn btn-primary">
                <i class="fa-brands fa-shopify"></i> 다이소
              </button>
              <button class="m-2 btn btn-primary">
                <i class="fa-solid fa-shop"></i> 마트
              </button>
            </div>
            <div id="keyword_container" align="center">
              <input type="text" v-model="facilityKeyword" />
              <button class="btn btn-success">검색</button>
            </div>
            <div id="kakao_map" class="bg-warning">kakao map area</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import HeaderVue from "../Header.vue";
import http from "../../api/http-common";
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
      deals: [],
      isDealListShow: false,
      isInterest: false,
      facilityKeyword: "",
    };
  },
  created: async function () {
    this.aptCode = this.$route.query.aptCode;
    await this.getHouseInfo();
    await this.getHouseDeal();
    await this.getInterestInfo();
  },
  methods: {
    getHouseInfo() {
      http
        .get("/houseinfo/list/" + this.aptCode)
        .then(({ data }) => {
          this.title = data.apartmentName;
          this.sidoName = data.sidoName;
          this.gugunName = data.gugunName;
          this.dongName = data.dong;
          this.jibun = data.jibun;
          this.buildYear = data.buildYear;
        })
        .catch(() => {
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
          console.log(data);
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
        console.log(this.userNo);
        console.log(this.aptCode);
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
  },
};
</script>

<style scoped>
main {
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
</style>
