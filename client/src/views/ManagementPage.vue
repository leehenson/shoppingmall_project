<template>
  <main class="mt-5">
    <div class="container">
      <div class="row justify-content-center">
        <div
          class="col-sm-3 border m-3 p-4"
          @click="goToProductManagement()"
          style="cursor: pointer"
        >
          <h5 class="text-start p-2">✔ Product Management</h5>
          <div class="text-start p-2">제품을 관리하는 공간입니다.</div>
        </div>
        <div
          class="col-sm-3 border m-3 p-4"
          @click="goToUserManagement()"
          style="cursor: pointer"
        >
          <h5 class="text-start p-2">✔ User Management</h5>
          <div class="text-start p-2">회원들을 관리하는 공간입니다.</div>
        </div>
        <div
          class="col-sm-3 border m-3 p-4"
          @click="goToOrderManagement()"
          style="cursor: pointer"
        >
          <h5 class="text-start p-2">✔ Order Management</h5>
          <div class="text-start p-2">주문을 관리하는 공간입니다.</div>
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
  methods: {
    // 메소드 호출
    goToProductManagement() {
      // 해당 div 클릭시 제품 관리페이지로 router되도록 설정
      this.$router.push({ path: "/sales" });
    },
    goToUserManagement() {
      // 해당 div 클릭시 회원 관리페이지로 router되도록 설정
      this.$router.push({ path: "/user_management" });
    },
    goToOrderManagement() {
      // 해당 div 클릭시 회원 관리페이지로 router되도록 설정
      this.$router.push({ path: "/order_management" });
    },
  },
};
</script>