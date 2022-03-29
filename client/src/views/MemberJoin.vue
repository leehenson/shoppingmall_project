<template>
  <main class="mt-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
            <h5 class="mb-5 text-start">BASIC INFOMATION</h5>
            <form class="text-start">
            <div class="form-group mb-5">
                <label class="mb-2">EMAIL ADDRESS</label>
                <input type="text" class="form-control">
            </div>
            <div class="form-group mb-5">
                <label class="mb-2">PASSWORD</label>
                <input type="text" class="form-control">
            </div>
            <div class="form-group mb-5">
                <label class="mb-2">PASSWORD CONFIRM</label>
                <input type="text" class="form-control">
            </div>
            <div class="form-group mb-5">
                <label class="mb-2">NAME</label>
                <input type="text" class="form-control">
            </div>
            <div class="form-group mb-5">
                <label class="mb-2">ADDRESS</label>
                <input type="text" class="form-control">
            </div>
            <div class="form-group mb-5">
                <label class="mb-2">TEL</label>
                <input type="text" class="form-control">
            </div>
            <div class="form-group mb-5">
                <label class="mb-2">MOBILE</label>
                <input type="text" class="form-control">
            </div>
            </form>
        </div>
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