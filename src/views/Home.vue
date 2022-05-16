<template>
  <div class="container text-center">
    <Header />
    <IntroMain />
    <IntroService />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "./Header.vue";
import IntroMain from "./home/IntroMain.vue";
import IntroService from "./home/IntroService.vue";

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
