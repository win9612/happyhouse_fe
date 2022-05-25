<template>
  <section class="section2">
    <div class="intro-service-title">
      <a
        href="https://search.naver.com/search.naver?where=news&ie=utf8&sm=nws_hty&query=%EB%B6%80%EB%8F%99%EC%82%B0"
        target="_blank"
        >네이버 뉴스 더보기 <i class="fa-solid fa-angle-right"></i
      ></a>
    </div>

    <div v-if="news.length > 0">
      <carousel
        class="card-container row"
        :autoplay="true"
        :nav="true"
        :responsive="{
          0: {
            items: 1,
          },
          993: {
            items: 2,
          },
          1200: {
            item: 3,
          },
        }"
      >
        <div
          class="col service-card"
          v-for="(item, index) in news"
          :key="index"
        >
          <a class="news_box" :href="item.link" target="_blank">
            <div class="news_title mb-4" v-html="item.title"></div>
            <div class="news_description" v-html="item.description"></div
          ></a>
        </div>
      </carousel>
    </div>
  </section>
</template>

<script>
import http from "../../api/http-common";
import carousel from "vue-owl-carousel";
export default {
  name: "IntroService",
  components: {
    carousel,
  },
  data() {
    return {
      keyword: "부동산",
      news: [],
    };
  },
  created() {
    http
      .get(`/naver/news/${this.keyword}`)
      .then(({ data }) => {
        this.news = data.items;
        let d1 = Date.parse(this.news[0].pubDate);
        let d2 = new Date(d1);
        console.log(d2.getMonth());
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style>
.news_box {
  color: black;
  text-decoration: none;
}
.news_title {
  font-size: 24px;
  font-weight: bold;
  height: 108px;
}
.section2 {
  background-color: #fff;
  padding: 0;
}

.intro-service-title {
  /* display: inline-block; */
  font-size: 18px;
  font-weight: bold;
  color: #4c4c4c;
  text-align: right;
  padding-right: 20px;
  text-decoration: none;
  /* line-height: 50px;
  border-bottom: 3px solid #0d6efd; */
}

.service-card {
  background-color: rgba(2, 32, 71, 0.03);
  border-radius: 10px;
  height: 350px;
  margin: 1rem;
  padding: 3rem 1rem;
}

.service-card:nth-child(2) {
  margin: 0 30px;
}

@media only screen and (min-width: 993px) and (max-width: 1200px) {
  .intro-service-title {
  }
  .service-card {
    height: 280px;
    padding: 1rem 1rem;
  }
  .news_title {
    font-size: 22px;
    height: 90px;
    padding-top: 20px;
  }
}

@media only screen and (min-width: 769px) and (max-width: 992px) {
  .intro-service-title {
    font-size: 16px;
    margin-bottom: -30px;
    /* padding-right: 0; */
  }

  .card-container {
    display: block !important;
  }

  .service-card {
    padding-top: 1rem;
    height: 220px;
  }
  .service-card:nth-child(2) {
    margin: 30px 0;
  }
  .news_title {
    font-size: 22px;
    height: 70px;
    padding-top: 20px;
  }
}
@media only screen and (min-width: 576px) and (max-width: 768px) {
  .intro-service-title {
    font-size: 16px;
    margin-bottom: -20px;
    padding-right: 0;
  }
  .service-card {
    width: 100%;
    height: 300px;
    margin: 0 !important;
    padding-top: 0.5rem;
  }
  .service-card {
    height: 220px;
  }
  .service-card:nth-child(2) {
    margin: 30px 0;
  }
  .news_title {
    font-size: 18px;
    height: 50px;
    padding-top: 20px;
  }
  .news_description {
    padding: 20px;
  }
}

@media only screen and (max-width: 575px) {
  .section2 {
    margin-top: -50px;
  }

  .intro-service-title {
    font-size: calc(3vw);
    margin-bottom: calc(-8vw);
    display: none;
  }
  .service-card {
    height: calc(45vw);
    padding-top: calc(2vw);
  }
  .news_title {
    font-size: calc(4vw);
    height: calc(12vw);
    padding-top: 20px;
  }
  .news_description {
    font-size: calc(3vw);
  }
  .service-card:nth-child(2) {
    margin: 30px 0;
  }
}
</style>
