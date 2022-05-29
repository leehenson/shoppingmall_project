<template>
  <main class="mt-5">
    <div class="container">
      <div class="row justify-content-center">
        <div
          class="col-sm-4 border m-3 p-4"
          @click="goToOrder(user_email)"
          style="cursor: pointer"
        >
          <h5 class="text-start p-2">✔ ORDER</h5>
          <div class="text-start p-2">
            고객님께서 주문하신 상품의 주문내역을 확인하실 수 있습니다.
          </div>
        </div>
        <div
          class="col-sm-4 border m-3 p-4"
          @click="goToProfile(user_email)"
          style="cursor: pointer"
        >
          <h5 class="text-start p-2">✔ PROFILE</h5>
          <div class="text-start p-2">
            회원이신 고객님의 개인정보를 관리하는 공간입니다. <br />
            개인정보를 최신 정보로 유지하시면 보다 간편히 쇼핑을 즐기실 수
            있습니다.
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user; // user 정보가 바뀔 때마다 자동으로 user() 갱신
    },
  },
  mounted() {
    if (this.user.email == undefined) {
      // user email이 없으면 초기화면으로 돌아가게 함
      alert("로그인을 해야 이용할 수 있습니다.");
      this.$router.push({ path: "/" });
    }
  },
  created() {
    this.user_email = this.$store.state.user.email; // 상태관리 되어있는 email를 user_email로 선언
  },
  methods: {
    // 메소드 호출
    goToOrder(user_email) {
      this.$router.push({
        path: "/mypage_order",
        query: { user_email: user_email },
      }); // 해당 user_email를 path 주소에 넣어 해당 회원의 주문 페이지로 라우팅
    },
    goToProfile(user_email) {
      this.$router.push({
        path: "/mypage_profile",
        query: { user_email: user_email },
      }); // 해당 user_email를 path 주소에 넣어 해당 회원의 회원 정보페이지로 라우팅
    },
  },
};
</script>