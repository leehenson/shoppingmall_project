<template>
  <nav class="navbar navbar-expand-lg navbar-light" style="background-color: white;">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Kong shop</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link class="nav-link" to="/">HOME</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/detail">OUTER</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/create">TOP</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="#">BOTTOM</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="#">ACC</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="#">NOTICE</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="#">REVIEW</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="#">Q&A</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="#">LOGIN</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="#">CART</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="#">MYPAGE</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="#">SEARCH</router-link>
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
