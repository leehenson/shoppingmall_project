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
                </tr>
            </thead>
            <tbody>
                <tr :key="i" v-for="(product, i) in cartList">
                  <td><input class="form-check-input" type="checkbox" id="checkboxNoLabel"></td>
                  <td><img :src="`/download/${product.id}/${product.path}`" style="height:50px; width:auto;" /></td>
                  <td>{{product.product_name}}</td>
                  <td>{{product.product_price}}</td>
                  <td>
                    <div class="row no-gutters">
                      <div class="col-auto">
                        <div class="input-group">
                          <span class="input-group-text" style="cursor:pointer;" @click="calculatePrice(-1);">-</span>
                          <input type="text" class="form-control" style="width:40px;" v-model="product.quantity">
                          <span class="input-group-text" style="cursor:pointer;" @click="calculatePrice(1);">+</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="col-6" style="text-align: right;">
                      {{getCurrencyFormat(totalPrice)}}원
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
      cartList: [],
      totalPrice: 0
    };
  },
  created() {     // data가 정상적으로 들어오는지 확인
    this.getCartList();
  },
  methods: {      // 메소드 호출
    calculatePrice(cnt) {
      let total = this.cartList.quantity + cnt;
      if(total < 0) total = 0;
      this.total = total;
      this.totalPrice = this.cartList.product_price * this.total;
      console.log(this.cartList.quantity);
    },
    getCurrencyFormat(value) {  // $currencyFormat 호출
      return this.$currencyFormat(value);
    },
    async getCartList() {    // getCartList 메소드 호출
      this.cartList = await this.$api("/api/cartList",{});  // url를 따라 app.js의 /api/:alias를 타고 sql productList2의 data 호출
      console.log(this.cartList); // 데이터를 잘 받아오는지 확인
    }
  }
}
</script>