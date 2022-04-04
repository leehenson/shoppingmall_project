<template>
  <nav class="navbar navbar-expand-lg navbar-light" style="background-color: white;">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">Kong shop</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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
              <li class="nav-item">
                <router-link class="nav-link" to="#">Q&A</router-link>
              </li>
              <li v-if="user.email!==undefined" class="nav-item">
                <router-link class="nav-link" to="/sales">PRODUCT RESISTRATION</router-link>
              </li>
            </ul>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">                      
              <li v-if="user.email==undefined" class="nav-item">
                <router-link class="nav-link" to="/login">LOGIN</router-link>
              </li>
              <li v-else class="nav-item">
                <router-link class="nav-link" to="" @click="kakaoLogout">LOGOUT</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="#">CART</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="#">MYPAGE</router-link>
              </li>
            </ul>                   
          </div>
        </div>
      </nav>
  <router-view/>
  <footer class="container py-5 mt-5">
        <div class="row">
          <div class="col-12 col-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="d-block mb-2" role="img" viewBox="0 0 24 24"><title>Product</title><circle cx="12" cy="12" r="10"></circle><path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94"></path></svg>
            <small class="d-block mb-3 text-muted">© 2017–2021</small>
          </div>
          <div class="col-6 col-md">
            <h5>Features</h5>
            <ul class="list-unstyled text-small">
              <li><a class="link-secondary" href="#">Cool stuff</a></li>
              <li><a class="link-secondary" href="#">Random feature</a></li>
              <li><a class="link-secondary" href="#">Team feature</a></li>
              <li><a class="link-secondary" href="#">Stuff for developers</a></li>
              <li><a class="link-secondary" href="#">Another one</a></li>
              <li><a class="link-secondary" href="#">Last time</a></li>
            </ul>
          </div>
          <div class="col-6 col-md">
            <h5>Resources</h5>
            <ul class="list-unstyled text-small">
              <li><a class="link-secondary" href="#">Resource name</a></li>
              <li><a class="link-secondary" href="#">Resource</a></li>
              <li><a class="link-secondary" href="#">Another resource</a></li>
              <li><a class="link-secondary" href="#">Final resource</a></li>
            </ul>
          </div>
          <div class="col-6 col-md">
            <h5>Resources</h5>
            <ul class="list-unstyled text-small">
              <li><a class="link-secondary" href="#">Business</a></li>
              <li><a class="link-secondary" href="#">Education</a></li>
              <li><a class="link-secondary" href="#">Government</a></li>
              <li><a class="link-secondary" href="#">Gaming</a></li>
            </ul>
          </div>
          <div class="col-6 col-md">
            <h5>About</h5>
            <ul class="list-unstyled text-small">
              <li><a class="link-secondary" href="#">Team</a></li>
              <li><a class="link-secondary" href="#">Locations</a></li>
              <li><a class="link-secondary" href="#">Privacy</a></li>
              <li><a class="link-secondary" href="#">Terms</a></li>
            </ul>
          </div>
        </div>
      </footer>
</template>

<script>
export default {
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
      this.$store.commit("user", t_user.email);  // vuex를 이용하여 상태관리하도록 store에 user 정보를 갱신
    },
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
          alert("로그인 성공!");
        }
      });
    },
    async kakao_login(kakao_account) {  // login겸 signup
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
