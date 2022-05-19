import axios from "axios";

// axios 객체 생성

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    // 요청 보내기 전에 수행할 일

    try {
      let token = JSON.parse(localStorage.getItem("jwt")).accessToken;
      config.headers["Content-Type"] = "application/json; charset=utf-8";
      config.headers["token"] = token;
      console.log("req =>", localStorage.getItem("jwt"));

      return config;
    } catch (error) {
      return config;
    }
  },
  function (err) {
    // 오류 요청을 보내기 전에 수행할 일
    console.log("req err");
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  function (res) {
    // 응답데이터 가공
    // console.log("interceptor res", res);
    if (res.config.url == "/app/auth/refreshToken") {
      localStorage.setItem("jwt", JSON.stringify(res.data.result));
    }
    console.log("response =>", localStorage.getItem("jwt"));
    return res;
  },
  function (err) {
    // 오류 응답 처리
    console.log("err interceptor=>");
    let code = err.message.split(" ")[5];
    if (code == "401") {
      // 토큰 만료이므로 리프레시 요청
      console.log(401);
      axiosInstance
        .post("/app/auth/refreshToken", {
          refreshIdx: JSON.parse(localStorage.getItem("jwt")).refreshIdx,
        })
        .then(function (res) {
          let code = res.data.result.code;
          console.log(code);
          if (code == 445) {
            // 모든 토큰 만료이므로 다시 로그인하라고 로그인 요청
            alert("토큰이 만료되었습니다. 로그인이 필요합니다.");
            location.href = "/login";
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    } else if (code == "500") {
      console.log(500);
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
