<template>
  <main class="mt-5">
    <div class="container">
      <div>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>E-mail</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone number</th>
              <th>Account holder</th>
              <th>Bank name</th>
              <th>Bank account number</th>
            </tr>
          </thead>
          <tbody>
            <tr :key="i" v-for="(user, i) in userInfo">
              <td class="align-middle">{{user.email}}</td>
              <td class="align-middle"><img :src="`/download/${product.id}/${product.path}`" style="height:auto; width:80px;" /></td>
              <td class="align-middle">{{product.product_name}}</td>
              <td class="align-middle">{{getCurrencyFormat(product.product_price)}}</td>
              <td class="align-middle">
                <div>
                  {{product.quantity}}개
                </div>
              </td>
              <td class="align-middle">
                <div>
                  {{getCurrencyFormat(product.totalPrice)}}원
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {  // 받아온 data를 template 코드에 쓸 수 있게 data 정의
    return {
      userInfo: {}
    };
  },
  created() {     // data가 정상적으로 들어오는지 확인
    this.user_email = this.$store.state.user.email;
    this.getUserInfo();
  },
  methods: {      // 메소드 호출
    async getUserInfo() {    // getCartList 메소드 호출
      let userInfo = await this.$api("/api/userManagement");  // url를 따라 app.js의 /api/:alias를 타고 sql cartList의 data 호출
      this.userInfo = userInfo
      console.log(this.userInfo); // 데이터를 잘 받아오는지 확인
    },
    goToOrder() {
        this.$router.push({path:'/order'});
    },
    // async goToCancle() {
    //   this.$swal.fire({
    //     title: '취소를 하시겠습니까?',
    //     showCancelButton: true,
    //     confirmButtonText: 'YES',
    //     cancelButtonText: 'CANCEL'
    //   }).then(async (result) => {
    //     if (result.isConfirmed) {
    //       await this.$api("/api/orderCancle",{param:[cart_id]});
    //       this.$swal.fire('Saved.', '', 'success');
    //       this.$router.go();
    //     }
    //   });
    // }
  }
}
</script>