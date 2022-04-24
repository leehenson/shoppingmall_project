<template>
  <main class="mt-5">
    <div class="container">
      <div class="row">
          <h5 class="m-4">장바구니가 비어있습니다.</h5>
      </div>
      <table class="table table-bordered">
            <thead>
                <tr>
                    <th>
                      <div>
                        <input class="form-check-input" type="checkbox" id="checkboxNoLabel">
                      </div>
                    </th>
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
                  <td><input class="form-check-input" type="checkbox" id="checkboxNoLabel"></td>
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
                      {{getCurrencyFormat(product.product_price * product.quantity)}}원
                    </div>
                  </td>
                  <td>
                    <div>
                      <button type="button" class="btn btn-outline-danger" @click="deleteCart(product.cart_id);">삭제</button>
                    </div>
                  </td>
                </tr>
            </tbody>
        </table>
      <div class="col-12 mt-5">
          <button type="button" class="btn btn btn-dark me-1">전체상품주문</button>
          <button type="button" class="btn btn-outline-dark">선택상품주문</button>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {  // 받아온 data를 template 코드에 쓸 수 있게 data 정의
    return {
      cartList: {},
      totalPrice: 0,
      cartId:""
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
      this.cartList = await this.$api("/api/cartList",{param:[this.cartId]});  // url를 따라 app.js의 /api/:alias를 타고 sql cartList의 data 호출
      console.log(this.cartList); // 데이터를 잘 받아오는지 확인
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