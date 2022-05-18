/* eslint-disable prettier/prettier */
<template>
  <div id="map" style="width: 100%; min-width: 1200px; height: 100%"></div>
</template>

<script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
<script>
import axios from "axios";

export default {
  name: "Map",
  data() {
    return {
      map: null,
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
        center: new kakao.maps.LatLng(37.4898434, 127.0438136),
        level: 5,
      };
      this.map = new kakao.maps.Map(container, options);

      var _this = this;

      this.mapcoder = new kakao.maps.services.Geocoder();
      let coord = new kakao.maps.LatLng(37.4898434, 127.0438136);

      let callback = function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          _this.currentDong = result[0].address.region_3depth_name;
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
        console.log(res);
      });
    },
  },
  mounted() {
    const script = document.createElement("script");
    script.onload = () => kakao.maps.load(this.initMap);
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=30041c6cf346d6570de69946bbbbae60&libraries=services";
    document.head.appendChild(script);
    this.geofind();
  },
};
</script>
