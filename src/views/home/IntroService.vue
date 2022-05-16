<template>
  <section class="section2">
    <div class="intro-service-title">추천 매물 들어갈 예정</div>

    <div class="card-container row">
      <div class="col service-card">카드1</div>
      <div class="col service-card">카드2</div>
      <div class="col service-card">카드3</div>
    </div>
  </section>
</template>

<script>
export default {
  name: "IntroService",
};
</script>

<style>
.section2 {
  background-color: #fff;
  padding: 94px 0px 100px;
}

.intro-service-title {
  font-size: 70px;
  font-weight: bold;
}

.service-card {
  background-color: #f1f7ff;
  height: 350px;
}

.service-card:nth-child(2) {
  margin: 0 30px;
}

@media only screen and (min-width: 993px) and (max-width: 1200px) {
  .intro-service-title {
    font-size: 52px;
  }
  .service-card {
    height: 280px;
  }
}

@media only screen and (min-width: 769px) and (max-width: 992px) {
  .intro-service-title {
    font-size: 38px;
  }

  .card-container {
    display: block !important;
  }

  .service-card {
    height: 220px;
  }
  .service-card:nth-child(2) {
    margin: 30px 0;
  }
}
@media only screen and (min-width: 576px) and (max-width: 768px) {
  .intro-service-title {
    font-size: 38px;
  }
  .service-card {
    width: 100%;
    height: 300px;
  }
  .service-card {
    height: 220px;
  }
  .service-card:nth-child(2) {
    margin: 30px 0;
  }
}

@media only screen and (max-width: 575px) {
  .intro-service-title {
    font-size: calc(7vw);
  }
  .service-card {
    height: calc(35vw);
  }
  .service-card:nth-child(2) {
    margin: 30px 0;
  }
}
</style>
