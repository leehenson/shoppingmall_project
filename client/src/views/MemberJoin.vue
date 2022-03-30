<template>
  <main class="mt-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
            <h5 class="mb-5 text-start">BASIC INFOMATION</h5>
            <form class="text-start">
            <div class="form-group mb-5">
                <label class="mb-2">EMAIL ADDRESS</label>
                <input type="text" class="form-control" placeholder="(영문소문자/숫자, 4~16자)@example.com">
            </div>
            <div class="form-group mb-5">
                <label class="mb-2">PASSWORD</label>
                <input type="text" class="form-control" placeholder="(영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10자~16자)">
            </div>
            <div class="form-group mb-5">
                <label class="mb-2">PASSWORD CONFIRM</label>
                <input type="text" class="form-control" placeholder="(영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10자~16자)">
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
                <label class="mb-2">MOBILE</label>
                <input type="text" class="form-control">
            </div>
            <div class="form-group mb-2">
                <label>REFUND ACCOUNT INFOMATION</label>
            </div>
            <div class="input-group mb-2">
                <div class="input-group-prepend">
                    <span class="input-group-text">예금주</span>
                </div>
                <input type="text" class="form-control">
            </div>
            <div class="input-group mb-2">
                <label class="input-group-text">은행명</label>
                <select class="form-select">
                    <option selected>- 은행 선택 -</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
            </div>
            <div class="input-group mb-2">
                <div class="input-group-prepend">
                    <span class="input-group-text">계좌번호</span>
                </div>
                <input type="text" class="form-control" placeholder="('-'와 숫자만 입력해주세요.)">
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
    kakaoLogin() {
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