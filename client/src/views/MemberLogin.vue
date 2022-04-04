<template>
  <main class="mt-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-4">
          <div>
            <h5 class="pb-3 text-start">RETURNING CUSTOMERS</h5>
            <div class="form-floating mb-3">
              <input type="email" class="form-control" placeholder="EMAIL ADDRESS" v-model="t_user.email">
              <label for="floatingInput">EMAIL ADDRESS</label>
            </div>
            <div class="form-floating mb-3">
              <input type="password" class="form-control" placeholder="PASSWORD" v-model="t_user.password">
              <label for="floatingPassword">PASSWORD</label>
            </div>
            <div class="pt-2 float-start">
              <button type="button" class="btn btn-dark me-1" @click="submitLogin">LOG IN</button>
              <a class="btn btn-dark me-3" href="/join" role="button">JOIN US</a>
              <img src="http://papaspick.com/web/upload/2019_web/icon/kakao_login.jpg" class="img-fluid rounded-2 cursor-pointer" style="width: 175px; height: 38px; cursor:pointer;" @click="kakaoLogin">
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
  data() {
    return {
      t_user: {
        email: "",
        password: ""
      }
    };
  },
  computed: {
    user() {
      return this.$store.state.user;  // user 정보가 바뀔 때마다 자동으로 user() 갱신
    }
  },
  methods: {
    submitLogin() {
      const t_user = {};
      t_user.email = this.t_user.email;
      t_user.password = this.t_user.password;
       this.login(t_user);
      console.log(t_user);
    },
    async login(t_user) {
      await this.$api("/api/login", {
        email:t_user.email,
        password:t_user.password
      })
      .then(() => {
        alert('로그인 성공!');
        this.$router.push({path:'/'});
      }, (err) => {
        alert(err);
      })
      .catch((err) => {
        alert(err);
      });
      this.$store.commit("user", t_user);  // vuex를 이용하여 상태관리하도록 store에 user 정보를 갱신
    },
    kakaoLogin() {
      window.Kakao.Auth.login({
        scope: 'profile_nickname, account_email, gender', // 카카오계정에서 받아올 정보
        success: this.getProfile  // 로그인 성공시 getProfile() 호출
      });
    },
    getProfile(authObj) { // authObj라는 이름으로 파라미터 받아오기
      console.log(authObj);
      window.Kakao.API.request({  // 로그인한 유저의 정보 가져오기
        url: '/v2/user/me',
        success: res => { // 성공시 콜백함수
          const kakao_account = res.kakao_account;  // 로그인한 유저의 계정 정보를 받아오기
          console.log(kakao_account);
          this.kakao_login(kakao_account);
          this.$router.push({path:'/'});
          alert("로그인 성공!");
        }
      });
    },
    async kakao_login(kakao_account) {  // login겸 signup
      await this.$api("/api/kakaoLogin", {
        param: [
          {email:kakao_account.email, name:kakao_account.profile.nickname},
          {name:kakao_account.profile.nickname}
        ]
      });

      this.$store.commit("user", kakao_account);  // vuex를 이용하여 상태관리하도록 store에 user 정보를 갱신
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