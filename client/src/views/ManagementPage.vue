<template>
  <main class="mt-5">
      <div class="container">
          <div class="row justify-content-center">
            <div class="col-sm-3 border m-3 p-4" @click="goToProductManagement();" style="cursor:pointer;">
                <h5 class="text-start p-2">✔ Product Management</h5>
                <div class="text-start p-2">제품을 관리하는 공간입니다.</div>
            </div>
            <div class="col-sm-3 border m-3 p-4" @click="goToUserManagement();" style="cursor:pointer;">
                <h5 class="text-start p-2">✔ User Management</h5>
                <div class="text-start p-2">회원들을 관리하는 공간입니다.</div>
            </div>
            <div class="col-sm-3 border m-3 p-4" @click="goToOrderManagement();" style="cursor:pointer;">
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
      return this.$store.state.user;  // user 정보가 바뀔 때마다 자동으로 user() 갱신
    }
  },
  mounted() {
    if(this.user.email == undefined) {  // user email이 없으면 초기화면으로 돌아가게 함
      alert("로그인을 해야 이용할 수 있습니다.");
      this.$router.push({path:'/'});
    }
  },
  created() {     // data가 정상적으로 들어오는지 확인
    this.user_email = this.$store.state.user.email;
  },
  methods: {      // 메소드 호출
    goToProductManagement() {  // 제품 이미지 클릭시 제품 상세페이지로 router되도록 설정
      this.$router.push({path:'/sales'}); // path중 /detail이 들어가면 product_id를 파라미터로 받아 라우터 시킴
    },
    goToUserManagement() {  // 제품 이미지 클릭시 제품 상세페이지로 router되도록 설정
      this.$router.push({path:'/user_management'}); // path중 /detail이 들어가면 product_id를 파라미터로 받아 라우터 시킴
    },
    goToOrderManagement() {  // 제품 이미지 클릭시 제품 상세페이지로 router되도록 설정
      this.$router.push({path:'/order_management'}); // path중 /detail이 들어가면 product_id를 파라미터로 받아 라우터 시킴
    }
  }
}
</script>