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
    console.log("토큰있냐?", localStorage.getItem("jwt"));
    try {
      let token = JSON.parse(localStorage.getItem("jwt")).accessToken;
      config.headers["Content-Type"] = "application/json; charset=utf-8";
      config.headers["token"] = token;

      console.log("jwt담아서 일단보냄 =>", localStorage.getItem("jwt"));

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
    console.log("res 넘어왔음", res);
    if (res.config.url == "/app/auth/refreshToken") {
      console.log("토큰 발행 res라서 토큰 저장함");
      localStorage.setItem("jwt", JSON.stringify(res.data.result));
    }
    return res;
  },
  function (err) {
    // 오류 응답 처리
    let code = err.message.split(" ")[5];
    if (code == "401") {
      // jwt가 null 이면 로그인이 아예 안된거임
      if (localStorage.getItem("jwt") == null) {
        alert("로그인이 필요합니다.");
        location.href = "/login";
      } else {
        // 헤더에 jwt가 있는데 401이면 리프레시
        axiosInstance
          .post("/app/auth/refreshToken", {
            refreshIdx: JSON.parse(localStorage.getItem("jwt")).refreshIdx,
          })
          .then(function (res) {
            let code = res.data.result.code;
            if (code == 445) {
              // 모든 토큰 만료이므로 다시 로그인하라고 로그인 요청
              alert("토큰이 만료되었습니다. 로그인이 필요합니다.");
              localStorage.removeItem("jwt");
              // location.href = "/login";
            } else {
              // res
              console.log("리프레시 정상적으로 완료한 res는 이거", res);
              // localStorage.setItem("jwt", JSON.stringify(res.data.result));
            }
          })
          .catch(function (err) {
            console.log(err);
          });
      }
    } else if (code == "500") {
      console.log(500);
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
