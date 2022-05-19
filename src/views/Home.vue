<template>
  <div class="container text-center">
    <Header />
    <h1>{{ textContent }}</h1>
    <IntroMain />
    <IntroService />
  </div>
</template>

<script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
<script>
// @ is an alias to /src
import Header from "./Header.vue";
import IntroMain from "./home/IntroMain.vue";
import IntroService from "./home/IntroService.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    Header,
    IntroService,
    IntroMain,
  },
};
</script>

<style></style>
