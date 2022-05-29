<template>
  <main class="mt-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-4">
          <div>
            <h5 class="pb-3 text-start">RETURNING CUSTOMERS</h5>
            <div class="form-floating mb-3">
              <input
                type="email"
                class="form-control"
                placeholder="EMAIL ADDRESS"
                v-model="t_user.email"
              />
              <label for="floatingInput">EMAIL ADDRESS</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="password"
                class="form-control"
                placeholder="PASSWORD"
                v-model="t_user.password"
              />
              <label for="floatingPassword">PASSWORD</label>
            </div>
            <div class="pt-2 float-start">
              <button type="button" class="btn btn-dark me-1" @click="login">
                LOG IN
              </button>
              <a class="btn btn-dark me-3" href="/join" role="button"
                >JOIN US</a
              >
              <img
                src="http://papaspick.com/web/upload/2019_web/icon/kakao_login.jpg"
                class="img-fluid rounded-2 cursor-pointer"
                style="width: 175px; height: 38px; cursor: pointer"
                @click="kakaoLogin"
              />
            </div>
          </div>
        </div>
        <!-- <ul class="nav justify-content-center mt-3  ">
          <li class="nav-item">
            <a class="nav-link  text-dark" href="#">✔ FORGOT ID</a>
          </li>
          <li class="nav-item"> 
            <a class="nav-link  text-dark" href="#">✔ FORGOT PASSWORD</a>
          </li>
        </ul> -->
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      t_user: {
        email: "",
        password: "",
      },
    };
  },
  computed: {
    user() {
      return this.$store.state.user; // user 정보가 바뀔 때마다 자동으로 user() 갱신
    },
  },
  methods: {
    async login() {
      await this.$api("/api/login", { user: this.t_user }) // t_user 데이터를 login sql를 통해 확인
        .then(() => {
          alert("로그인 성공!"); // api가 정상적으로 작동할 시 해당 alert를 띄움
          this.$router.push({ path: "/" }); // 메인페이지로 라우팅
          this.$store.commit("user", this.t_user); // vuex를 이용하여 상태관리하도록 store에 user 정보를 갱신
        })
        .catch(() => {
          // api 오류 발생 시 해당 alert 띄움
          alert("계정 정보를 확인해주세요.");
        });
    },
    kakaoLogin() {
      window.Kakao.Auth.login({
        scope: "profile_nickname, account_email, gender", // 카카오계정에서 받아올 정보
        success: this.getProfile, // 로그인 성공시 getProfile() 호출
      });
    },
    getProfile(authObj) {
      // authObj라는 이름으로 파라미터 받아오기
      console.log(authObj);
      window.Kakao.API.request({
        // 로그인한 유저의 정보 가져오기
        url: "/v2/user/me",
        success: (res) => {
          // 성공시 콜백함수
          const kakao_account = res.kakao_account; // 로그인한 유저의 계정 정보를 받아오기
          console.log(kakao_account); // 계정 정보 확인
          this.kakao_login(kakao_account); // 계정 정보를 kakao_login으로 보냄
          this.$router.push({ path: "/" }); // 메인페이지로 라우팅
          alert("로그인 성공!"); // 해당 alert 호출
        },
      });
    },
    async kakao_login(kakao_account) {
      // login겸 signup
      await this.$api("/api/kakaoLogin", {
        // 게정 정보를 kakaoLogin sql 파라미터로 보냄
        param: [
          { email: kakao_account.email, name: kakao_account.profile.nickname },
          { name: kakao_account.profile.nickname },
        ],
      });

      this.$store.commit("user", kakao_account); // vuex를 이용하여 상태관리하도록 store에 user 정보를 갱신
    },
    kakaoLogout() {
      window.Kakao.Auth.logout((response) => {
        console.log(response);
        this.$store.commit("user", {}); // store에 user 정보의 data를 빈값으로 만듬
        // this.$router.go();
        alert("로그아웃");
      });
    },
  },
};
</script> 