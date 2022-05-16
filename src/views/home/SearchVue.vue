<template>
  <section>
    <div class="search-container">
      <!-- <form action="#"> -->
      <i class="fa fa-solid fa-search"></i>
      <input
        class="main-search-input"
        type="text"
        name="search"
        id="search"
        v-model="search"
        v-on:keyup.enter="enter"
        placeholder="아파트 또는 지역명으로 검색"
      />

      <!-- </form> -->
    </div>
  </section>
</template>

<script>
export default {
  name: "SearchVue",
  data: () => {
    return {
      message: "hi",
      search: "",
      data: ["가나", "다라", "마바", "사아", "가나가나", "다라다라"],
    };
  },
  methods: {
    enter: function () {
      // let result = [];

      this.data.forEach(function (element) {
        console.log(element);
      });

      console.log(this.search);
    },
  },
};
</script>

<style>
.search-container {
  width: 720px;
  margin: 50px auto;
  position: relative;
}

input[name="search"] {
  box-sizing: border-box;
  padding: 20px 60px;
  width: 100%;
  border-radius: 40px;
  height: 60px;
  border: 2px solid #183153;
  color: #183153;
  font-weight: bold;
}

.fa-search {
  position: absolute;
  left: 20px;
  top: 23px;
  font-size: 20px;
}

.neighborhood {
  font-size: 40px;
  font-weight: bold;
  color: #183153;
}
</style>
