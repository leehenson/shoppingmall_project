<template>
  <main class="mt-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-4">
          <div>
            <h5 class="pb-3 text-start">RETURNING CUSTOMERS</h5>
            <div class="form-floating mb-3">
              <input type="email" class="form-control" placeholder="ID">
              <label for="floatingInput">ID</label>
            </div>
            <div class="form-floating mb-3">
              <input type="password" class="form-control" placeholder="PASSWORD">
              <label for="floatingPassword">PASSWORD</label>
            </div>
            <div class="pt-2 float-start">
              <button type="button" class="btn btn-dark me-1">LOG IN</button>
              <button type="button" class="btn btn-dark me-3">JOIN US</button>                                             
              <img src="http://papaspick.com/web/upload/2019_web/icon/kakao_login.jpg" class="img-fluid rounded-2 cursor-pointer" style="width: 175px; height: 38px; cursor:pointer;" @click="kakaoLoin">
            </div>
          </div>
        </div>
        <ul class="nav justify-content-center mt-3  ">
          <li class="nav-item">
            <a class="nav-link  text-dark" href="#">✔ FORGOT ID</a>
          </li>
          <li class="nav-item">
            <a class="nav-link  text-dark" href="#">✔ FORGOT PASSWORD</a>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user;  // user 정보가 바뀔 때마다 자동으로 user() 갱신
    }
  },
  methods: {
    kakaoLoin() {
      window.Kakao.Auth.login({
        scope: 'profile_nickname, account_email, gender',
        success: this.getProfile
      });
    },
    getProfile(authObj) {
      console.log(authObj);
      window.Kakao.API.request({
        url: '/v2/user/me',
        success: res => {
          const kakao_account = res.kakao_account;
          console.log(kakao_account);
          this.login(kakao_account);
          this.$router.push({path:'/'});
          alert("로그인 성공!");
        }
      });
    },
    async login(kakao_account) {  // login겸 signup
      await this.$api("/api/login", {
        param: [
          {email:kakao_account.email, nickname:kakao_account.profile.nickname},
          {nickname:kakao_account.profile.nickname}
        ]
      });

      this.$store.commit("user", kakao_account);  // store에 user 정보를 갱신
    },
    kakaoLogout() {
      window.Kakao.Auth.logout((response) => {
        console.log(response);
        this.$store.commit("user", {});
        alert("로그아웃");

      });
    }
  }
}
</script>