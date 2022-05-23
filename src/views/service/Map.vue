/* eslint-disable prettier/prettier */
<template>
  <div
    id="map"
    style="width: 100%; min-width: 1200px; height: 100%; opacity: 0.7"
  ></div>
</template>

<script>
import axios from "axios";
import http from "../../api/http-common";

export default {
  name: "Map",
  data() {
    return {
      map: null,
      level: "",
      overlays: [],
      lat: "",
      lng: "",
      textContent: "",
      mapcoder: "",
      currentDong: "",
    };
  },
  methods: {
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(36.4976537, 128.00067951),
        level: 12,
      };
      this.map = new window.kakao.maps.Map(container, options);
      this.map.removeOverlayMapTypeId(window.kakao.maps.MapTypeId.TRAFFIC);

      var _this = this;

      this.mapcoder = new window.kakao.maps.services.Geocoder();
      // mapcoder에서 좌표 값 받아와서 넣야아함 임시로 고정값 넣어둠
      let coord = new window.kakao.maps.LatLng(37.4976537, 127.0467951);

      // 좌표값으로 주소 구해서 반환받으면실행도리 콜백함수
      let callback = function (result, status) {
        if (status === window.kakao.maps.services.Status.OK) {
          _this.currentDong = result[0].address.region_3depth_name;
          // 콜백받은거 결과 ok이면 그 동 주소로 아파트 목록 조회
          _this.getAptList();
        }
      };
      this.mapcoder.coord2Address(coord.getLng(), coord.getLat(), callback);
    },
    geofind() {
      if (!("geolocation" in navigator)) {
        this.textContent = "지오로케이션 못불러온는중";
        return;
      }
      this.textContent = "위치 구하는중 이게 뜨면 비동기 잘못짠거다";

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.lat = pos.coords.latitude;
          this.lng = pos.coords.longitude;
          this.textContent = "위치정보 : " + this.lat + ", " + this.lng;
        },
        (err) => {
          this.textContent = err.message;
        }
      );
    },
    getAptList() {
      var dong = this.currentDong;
      var _this = this;
      axios({
        url: "http://127.0.0.1:8080/apt-search/apt?keyword=" + dong,
        method: "get",
      }).then(function (res) {
        // 아파트 목록 받아왔으면 vuex에 저장
        _this.$store.dispatch("house/setAptList", { newList: res.data });
      });
    },
    getZoomLevelAndCreateMarker(zoomLevel) {
      // console.log("마커함수 줌레벨", zoomLevel);
      let _this = this;
      let southWest = _this.map.getBounds().getSouthWest();
      let northEast = _this.map.getBounds().getNorthEast();
      // console.log("남서", _this.map.getBounds().getSouthWest());
      // console.log("북동", _this.map.getBounds().getNorthEast());
      // 12~9  광역시도
      // 8~7  시군구
      // 6~4  동
      // 3~   아파트
      if (zoomLevel >= 9) {
        http.get("/overlay/sidoList").then(function (res) {
          _this.createMarker(res);
        });
      } else if (zoomLevel >= 7) {
        http.get("/overlay/gugunList").then(function (res) {
          _this.createMarker(res);
        });
      } else if (zoomLevel >= 5) {
        http
          .get("/overlay/dongList", {
            params: {
              startLat: southWest.Ma,
              startLng: southWest.La,
              endLat: northEast.Ma,
              endLng: northEast.La,
            },
          })
          .then(function (res) {
            _this.createMarker(res);
          });
      } else if (zoomLevel < 5) {
        http
          .get("/overlay/aptList", {
            params: {
              startLat: southWest.Ma,
              startLng: southWest.La,
              endLat: northEast.Ma,
              endLng: northEast.La,
            },
          })
          .then(function (res) {
            _this.createMarker(res);
          });
      }
    },
    createMarker(res) {
      let positions = [];
      let _this = this;
      let nowLevel = _this.map.getLevel();

      if (nowLevel >= 9) {
        nowLevel = 7;
      } else if (nowLevel >= 7) {
        nowLevel = 5;
      } else if (nowLevel > 4) {
        nowLevel = 3;
      }

      // console.log(res);
      for (let i = 0; i < res.data.length; i++) {
        let obj = new window.kakao.maps.LatLng(
          res.data[i].lat,
          res.data[i].lng
        );
        positions.push({
          position: obj,
          content: `<div id="overlay" level="${nowLevel}" code="${res.data[i].code}" lat="${res.data[i].lat}" lng="${res.data[i].lng}" class ="location-label">${res.data[i].name}</div>`,
        });
      }
      for (let i = 0; i < this.overlays.length; i++) {
        this.overlays[i].setMap(null);
      }
      this.overlays = [];
      for (let i = 0; i < positions.length; i++) {
        var cusmtomOverlay = new window.kakao.maps.CustomOverlay(positions[i]);
        this.overlays.push(cusmtomOverlay);
        cusmtomOverlay.setMap(this.map);
      }
      // 커스텀오버레이 클릭이벤트
      let overlays = document.querySelectorAll("#overlay");
      overlays.forEach(function (overlay) {
        overlay.addEventListener("click", function (e) {
          if (_this.map.getLevel() >= 5) {
            var moveLatLon = new window.kakao.maps.LatLng(
              e.target.getAttribute("lat"),
              e.target.getAttribute("lng")
            );
            _this.map.setLevel(e.target.getAttribute("level"));
            _this.map.setCenter(moveLatLon);
          } else {
            window.open(
              "/service/detail/?aptCode=" + e.target.getAttribute("code"),
              "_blank"
            );
          }

          // _this.getZoomLevelAndCreateMarker(_this.map.getLevel());
        });
      });
    },
    markerClick() {
      alert("hello");
    },
  },
  mounted() {
    // window.kakao.maps.event.addListener(this.map, "zoom_changed", function () {
    //   console.log("이벤트", this.getLvel());
    // });

    let _this = this;
    window.kakao.maps.load(function () {
      _this.initMap();
      _this.getZoomLevelAndCreateMarker(12);

      // window.kakao.maps.event.addListener(
      //   _this.map,
      //   "zoom_changed",
      //   function () {
      //     _this.getZoomLevelAndCreateMarker(_this.map.getLevel());
      //   }
      // );
      // window.kakao.maps.event.addListener(_this.map, "dragend", function () {
      //   _this.getZoomLevelAndCreateMarker(_this.map.getLevel());
      // });
      // window.kakao.maps.event.addListener(
      //   _this.map,
      //   "center_changed",
      //   function () {
      //     _this.getZoomLevelAndCreateMarker(_this.map.getLevel());
      //   }
      // );
      window.kakao.maps.event.addListener(
        _this.map,
        "tilesloaded",
        function () {
          _this.getZoomLevelAndCreateMarker(_this.map.getLevel());
        }
      );
    });
    // this.geofind(); 현재위지 찾는 함수
  },
};
</script>

<style>
.location-label {
  background-color: rgb(0, 0, 255);
  color: white;
  border-radius: 10px;
  font-size: 14px;
  padding: 5px 10px;
}
</style>
