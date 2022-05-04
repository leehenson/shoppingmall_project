<template>
  <main class="mt-5">
    <div class="container">
      <div v-if="cartList == 0" class="row">
          <h5 class="m-4">장바구니가 비어있습니다.</h5>
      </div>
      <div v-else>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>이미지</th>
              <th>상품정보</th>
              <th>판매가</th>
              <th>수량</th>
              <th>합계</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr :key="i" v-for="(product, i) in cartList">
              <td><img :src="`/download/${product.id}/${product.path}`" style="height:50px; width:auto;" /></td>
              <td>{{product.product_name}}</td>
              <td>{{getCurrencyFormat(product.product_price)}}</td>
              <td>
                <div>
                  {{product.quantity}}개
                </div>
              </td>
              <td>
                <div>
                  {{getCurrencyFormat(product.totalPrice)}}원
                </div>
              </td>
              <td>
                <div>
                  <button type="button" class="btn btn-outline-danger" @click="deleteCart(product.cart_id);">삭제</button>
                </div>
              </td>
            </tr>
            <tr>
              <th colspan="6" style="text-align: right; font-size: large;">총 상품금액 {{getCurrencyFormat(total)}}원 + 배송비 {{getCurrencyFormat(deliveryPrice)}}원 = 총 결제금액 {{getCurrencyFormat(paymentAmount)}}원</th>
            </tr>
          </tbody>
        </table>
        <div class="col-12 mt-5">
            <button type="button" class="btn btn btn-dark me-1" @click="goToOrder">상품주문</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {  // 받아온 data를 template 코드에 쓸 수 있게 data 정의
    return {
      cartList: {},
      cartId:"",
      total: 0,
      cartItem: 0,
      deliveryPrice: 0,
      paymentAmount: 0
    };
  },
  created() {     // data가 정상적으로 들어오는지 확인
    this.cartId = this.$store.state.user.email;
    this.getCartList();
  },
  methods: {      // 메소드 호출
    getCurrencyFormat(value) {  // $currencyFormat 호출
      return this.$currencyFormat(value);
    },
    async getCartList() {    // getCartList 메소드 호출
      let cartList = await this.$api("/api/cartList",{param:[this.cartId]});  // url를 따라 app.js의 /api/:alias를 타고 sql cartList의 data 호출
      this.cartList = cartList
      console.log(this.cartList); // 데이터를 잘 받아오는지 확인

      let total = 0;
      cartList.forEach(item => {
        total += item.totalPrice;
      });
      this.total = total;

      let deliveryPrice = 0;
      if (total >= 100000) {
        deliveryPrice = 0;
      }
      else {
        deliveryPrice = 3000;
      }
      this.deliveryPrice = deliveryPrice

      let paymentAmount = total + deliveryPrice;
      this.paymentAmount = paymentAmount;
    },
    goToOrder() {
        this.$router.push({path:'/order'});
    },
    deleteCart(cart_id) {
      this.$swal.fire({
        title: '정말 삭제하시겠습니까?',
        showCancelButton: true,
        confirmButtonText: 'DELETE',
        cancelButtonText: 'CANCEL'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.$api("/api/cartDelete",{param:[cart_id]});
          this.getCartList();
          this.$swal.fire('Deleted.', '', 'success')
        }
      });
    }   
  }
}
</script>