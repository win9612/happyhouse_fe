<template>
  <div id="map" style="width: 100%; min-width: 1200px; height: 100%"></div>
</template>

<script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
<script>
export default {
  name: "Map",
  data() {
    return {
      map: null,
    };
  },
  methods: {
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(37.5407943, 126.9835695, 16),
        level: 7,
      };
      this.map = new kakao.maps.Map(container, options);
    },
  },
  mounted() {
    const script = document.createElement("script");
    script.onload = () => kakao.maps.load(this.initMap);
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=30041c6cf346d6570de69946bbbbae60";
    document.head.appendChild(script);
  },
};
</script>
