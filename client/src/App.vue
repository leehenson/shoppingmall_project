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
