<template>
  <section class="section1">
    <div class="row">
      <div class="col title-text">
        <div class="text-start main-title fw-bold">
          실시간 부동산 거래 <br />
          정보 조회를 <br />
          쉽고 간편하게
        </div>
        <div class="sub-title text-start text-reset">
          여기는 부연설명을 적는데 두줄 정도 길게 꽉차게 적어야 이쁘게
          레이아웃이 잡힐거 같다 나중에 채우자
        </div>
        <div class="btn-box d-grid gap-2 text-start">
          <a href="./service" class="btn btn-primary">조회하기</a>
        </div>
      </div>

      <div class="col title-image-box">
        <img
          class="section1-image"
          :src="require(`@/assets/images/intro_main.png`)"
          alt="집이미지"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "IntroMain",
  data() {
    return {
      imgName: "intro_main",
    };
  },
};
</script>

<style>
.section1 {
  background-color: #fff;
  padding: 54px 0px 50px;
}

.section1-image {
  width: 500px;
  height: 580px;
}

.main-title {
  font-size: 70px;
}

.sub-title {
  padding-right: 100px;
  word-break: keep-all;
  font-size: 20px;
}

.btn-box {
  width: 250px;
  margin-top: 50px;
}

.btn-box a {
  padding: 10px 0;
  font-size: 26px;
  font-weight: bold;
}

@media only screen and (min-width: 993px) and (max-width: 1200px) {
  .main-title {
    font-size: 55px;
  }
  .section1-image {
    width: 400px;
    height: 470px;
  }
  .sub-title {
    padding-right: 10px;
    word-break: keep-all;
    font-size: 16px;
  }
}

@media only screen and (min-width: 769px) and (max-width: 992px) {
  .section1 {
    padding: 50px 50px 60px;
  }

  .main-title {
    font-size: 33px;
  }

  .section1-image {
    width: 300px;
    height: 380px;
  }
  .sub-title {
    padding-right: 10px;
    word-break: keep-all;
    font-size: 12px;
  }
}
@media only screen and (min-width: 576px) and (max-width: 768px) {
  .section1 {
    padding: 40px 0px 60px;
  }
  .row {
    display: block !important;
  }

  .title-text {
    padding-top: 120px;
    width: 480px !important;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }

  .main-title {
    font-size: 55px;
    line-height: 70px;
  }
  .section1-image {
    opacity: 0.3;
    width: 500px;

    margin-top: -550px;

    z-index: -200;
  }
  .sub-title {
    padding-right: 10px;
    word-break: keep-all;
    font-size: 20px;
  }
  .btn-box {
    width: 100%;
    margin-top: 80px;
  }
}

@media only screen and (max-width: 575px) {
  .row {
    display: block !important;
  }

  .title-text {
    padding-top: 40px;
    width: 80% !important;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }
  .main-title {
    font-size: calc(8vw);
    line-height: calc(13vw);
  }
  .section1-image {
    opacity: 0.4;
    width: 90%;
    height: calc(100vw);
    margin-top: calc(-95vw);
    z-index: -200;
  }
  .btn-box {
    width: 100%;
    margin-top: calc(20vw);
  }
  .btn-box a {
    /* height: calc(10vw); */
    font-size: calc(5vw);
  }
  .sub-title {
    display: none;
  }
}

/* @media only screen and (max-width:469px) {
 .row {
        display: block !important;
    }

    .title-text {      
        padding-top: 40px;  
        width: 80% !important;
        margin: 0 auto;
        position: relative;
        z-index: 2;   
    }
    .main-title {
        font-size: calc(8vw);
        line-height: 50px;
    }
    .section1-image {
        opacity: 0.4;
        width: 90%;
        height: calc(100vw);
        margin-top: -330px;
        z-index: -200;
    }
} */
</style>
