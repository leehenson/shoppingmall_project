<template>
  <main class="mt-5">
      <div class="container">
          <div class="row justify-content-center">
            <div class="col-sm-4 border m-3 p-4" @click="goToOrder(user_email);" style="cursor:pointer;">
                <h5 class="text-start p-2">✔ ORDER</h5>
                <div class="text-start p-2">고객님께서 주문하신 상품의 주문내역을 확인하실 수 있습니다.</div>
            </div>
            <div class="col-sm-4 border m-3 p-4" @click="goToProfile(user_email);" style="cursor:pointer;">
                <h5 class="text-start p-2">✔ PROFILE</h5>
                <div class="text-start p-2">회원이신 고객님의 개인정보를 관리하는 공간입니다. <br> 개인정보를 최신 정보로 유지하시면 보다 간편히 쇼핑을 즐기실 수 있습니다.</div>
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
    goToOrder(user_email) {  // 제품 이미지 클릭시 제품 상세페이지로 router되도록 설정
      this.$router.push({path:'/mypage_order', query:{user_email:user_email}}); // path중 /detail이 들어가면 product_id를 파라미터로 받아 라우터 시킴
    },
    goToProfile(user_email) {  // 제품 이미지 클릭시 제품 상세페이지로 router되도록 설정
      this.$router.push({path:'/mypage_profile', query:{user_email:user_email}}); // path중 /detail이 들어가면 product_id를 파라미터로 받아 라우터 시킴
    }
  }
}
</script>