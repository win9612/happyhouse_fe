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
    };
  },
  methods: {
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(36.2942802, 127.339534),
        level: 5,
      };
      this.map = new kakao.maps.Map(container, options);

      this.mapcoder = new kakao.maps.services.Geocoder();
      let coord = new kakao.maps.LatLng(this.lat, this.lng);

      let callback = function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          console.log(result);
        }
      };
      this.mapcoder.coord2Address(coord.getLng(), coord.getLat(), callback);
    },
    geofind() {
      if (!("geolocation" in navigator)) {
        this.textContent = "Geolocation is not available";
        return;
      }
      this.textContent = "Locating...";

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.lat = pos.coords.latitude;
          this.lng = pos.coords.longitude;
          this.textContent =
            "Your location data is " + this.lat + ", " + this.lng;
          console.log(this.textContent);
        },
        (err) => {
          this.textContent = err.message;
        }
      );
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
