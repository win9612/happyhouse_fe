<template>
  <section class="section2">
    <div class="intro-service-title">부동산 뉴스</div>

    <div v-if="news.length > 0">
      <carousel
        class="card-container row bg-light"
        :autoplay="true"
        :nav="true"
      >
        <div
          class="col service-card m-3 p-3"
          v-for="(item, index) in news"
          :key="index"
        >
          <a class="news_box" :href="item.link" target="_blank">
            <h2 class="news_title mb-4" v-html="item.title"></h2>
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
  font-weight: bold;
}
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
