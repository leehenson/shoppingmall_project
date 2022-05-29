<template>
  <div class="container">
    <nav
      class="navbar navbar-expand-lg navbar-light"
      style="background-color: white"
    >
      <div class="container-fluid">
        <a class="navbar-brand" href="/">Kong shop</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/">HOME</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/outer">OUTER</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/top">TOP</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/bottom">BOTTOM</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/acc">ACC</router-link>
            </li>
            <!-- <li class="nav-item">
                <router-link class="nav-link" to="#">Q&A</router-link>
              </li> -->
            <li v-if="user.email === 'seller'" class="nav-item">
              <router-link class="nav-link" to="/management"
                >MANAGEMENT</router-link
              >
            </li>
          </ul>
        </div>
        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li v-if="user.email == undefined" class="nav-item">
              <router-link class="nav-link" to="/login">LOGIN</router-link>
            </li>
            <li v-else class="nav-item">
              <router-link class="nav-link" to="" @click="kakaoLogout"
                >LOGOUT</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/cart">CART</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/mypage">MYPAGE</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  <router-view />
  <footer class="container py-5 mt-5">
    <div class="row">
      <div class="col-md-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          class="d-block mb-2"
          role="img"
          viewBox="0 0 24 24"
        >
          <title>Product</title>
          <circle cx="12" cy="12" r="10"></circle>
          <path
            d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94"
          ></path>
        </svg>
        <small class="d-block mb-3 text-muted">© 2022-2022</small>
      </div>
      <div class="col-md-2">
        <ul class="list-unstyled text-small">
          <li><a class="link-secondary" href="#">ABOUT US</a></li>
          <li><a class="link-secondary" href="#">AGREEMENT</a></li>
          <li><a class="link-secondary" href="#">GUIDE</a></li>
          <li><a class="link-secondary" href="#">PRIVACY POLICY</a></li>
        </ul>
      </div>
      <div class="col-md-3">
        <ul class="list-unstyled text-small">
          <li>070-0000-0000</li>
          <li>(KAKAO TALK @콩샵)</li>
          <li>MON - FRI (13 - 17시)</li>
          <li>농협 301-0000-0000-11</li>
          <li>예금주 : 홍길동(콩샵)</li>
          <li>CONTACT.kongshop@gmail.com</li>
        </ul>
      </div>
      <div class="col-md-5">
        <ul class="list-unstyled text-small text-start">
          <li>COMPANY. kong shop (콩샵)</li>
          <li>OWNER.홍길동 BUSINESS NUMBER.0000000000</li>
          <li>MAIL-ORDER LICENSE.제2022-서울서초-0000호</li>
          <li>ADDRESS.10000 서울특별시 서초구 ○○로 000-0 (○○동) 2층 콩샵</li>
          <li>Copyright ©kong shop All rights reserved.</li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user; // user 정보가 바뀔 때마다 자동으로 user() 갱신
    },
  },
  methods: {
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
          this.login(kakao_account); // 계정 정보를 kakao_login으로 보냄
          alert("로그인 성공!"); // 해당 alert 호출
        },
      });
    },
    async kakao_login(kakao_account) {
      // login겸 signup
      await this.$api("/api/login", {
        // 게정 정보를 kakaoLogin sql 파라미터로 보냄
        param: [
          {
            email: kakao_account.email,
            nickname: kakao_account.profile.nickname,
          },
          { nickname: kakao_account.profile.nickname },
        ],
      });

      this.$store.commit("user", kakao_account); // vuex를 이용하여 상태관리하도록 store에 user 정보를 갱신
    },
    kakaoLogout() {
      window.Kakao.Auth.logout((response) => {
        console.log(response);
        this.$store.commit("user", {}); // store에 user 정보의 data를 빈값으로 만듬
        alert("로그아웃");
      });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
